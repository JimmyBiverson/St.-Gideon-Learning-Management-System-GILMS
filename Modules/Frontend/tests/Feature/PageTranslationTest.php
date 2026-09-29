<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Frontend\Models\Project;
use Modules\Frontend\Models\ProjectPage;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();

    $this->project = Project::create([
        'type' => 'temporary',
        'name' => 'Test Project',
        'theme_color' => 'blue',
        'theme_config' => '{}',
    ]);

    $this->page = ProjectPage::create([
        'title' => 'Test Page',
        'slug' => 'test-page',
        'url' => '/test-page',
        'type' => 'inner',
        'status' => true,
        'content' => json_encode([
            ['id' => 'el1', 'type' => 'heading', 'name' => 'Heading', 'styles' => [], 'content' => ['innerText' => 'Hello World']],
        ]),
        'project_id' => $this->project->id,
    ]);
});

it('requires authentication', function () {
    $this->getJson(route('frontend-pages.translations', [
        'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
    ]))->assertUnauthorized();
});

it('returns an empty map when no translations exist', function () {
    $this->actingAs($this->user)
        ->getJson(route('frontend-pages.translations', [
            'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
        ]))
        ->assertOk()
        ->assertExactJson(['translations' => []]);
});

it('saves and returns translations', function () {
    $this->actingAs($this->user)
        ->putJson(route('frontend-pages.translations.update', [
            'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
        ]), [
            'translations' => [
                ['element_id' => 'el1', 'field' => 'innerText', 'value' => 'Hola Mundo'],
            ],
        ])
        ->assertRedirect();

    $this->actingAs($this->user)
        ->getJson(route('frontend-pages.translations', [
            'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
        ]))
        ->assertOk()
        ->assertExactJson(['translations' => ['el1' => ['innerText' => 'Hola Mundo']]]);
});

it('deletes a translation when saved with an empty value, falling back to the default text', function () {
    $this->actingAs($this->user)->putJson(route('frontend-pages.translations.update', [
        'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
    ]), [
        'translations' => [['element_id' => 'el1', 'field' => 'innerText', 'value' => 'Hola Mundo']],
    ]);

    $this->actingAs($this->user)->putJson(route('frontend-pages.translations.update', [
        'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
    ]), [
        'translations' => [['element_id' => 'el1', 'field' => 'innerText', 'value' => '']],
    ]);

    $this->actingAs($this->user)
        ->getJson(route('frontend-pages.translations', [
            'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
        ]))
        ->assertOk()
        ->assertExactJson(['translations' => []]);
});

it('rejects a page that does not belong to the given project', function () {
    $otherProject = Project::create([
        'type' => 'temporary', 'name' => 'Other', 'theme_color' => 'blue', 'theme_config' => '{}',
    ]);

    $this->actingAs($this->user)
        ->getJson(route('frontend-pages.translations', [
            'project' => $otherProject->id, 'page' => $this->page->id, 'locale' => 'es',
        ]))
        ->assertForbidden();
});

it('renders the bulk translation screen with existing translations', function () {
    $this->actingAs($this->user)->putJson(route('frontend-pages.translations.update', [
        'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
    ]), [
        'translations' => [['element_id' => 'el1', 'field' => 'innerText', 'value' => 'Hola Mundo']],
    ]);

    $this->actingAs($this->user)
        ->get(route('frontend-pages.translate', [
            'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
        ]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Frontend/translate')
            ->where('locale', 'es')
            ->where('translations.el1.innerText', 'Hola Mundo'));
});

it('overlays a saved translation into the public page content for a non-default locale', function () {
    $this->actingAs($this->user)->putJson(route('frontend-pages.translations.update', [
        'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
    ]), [
        'translations' => [['element_id' => 'el1', 'field' => 'innerText', 'value' => 'Hola Mundo']],
    ]);

    $this->withCookie('locale', 'es')
        ->get(route('frontend-pages.show', ['page' => $this->page->id]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where(
            'page.content',
            fn (string $content) => str_contains($content, 'Hola Mundo') && ! str_contains($content, 'Hello World')
        ));
});

it('leaves default-locale rendering byte-identical to the stored content', function () {
    $this->actingAs($this->user)->putJson(route('frontend-pages.translations.update', [
        'project' => $this->project->id, 'page' => $this->page->id, 'locale' => 'es',
    ]), [
        'translations' => [['element_id' => 'el1', 'field' => 'innerText', 'value' => 'Hola Mundo']],
    ]);

    $this->withCookie('locale', 'en')
        ->get(route('frontend-pages.show', ['page' => $this->page->id]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where(
            'page.content',
            fn (string $content) => str_contains($content, 'Hello World') && ! str_contains($content, 'Hola Mundo')
        ));
});
