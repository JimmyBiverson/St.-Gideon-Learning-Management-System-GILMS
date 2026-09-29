<?php

namespace Database\Seeders;

use App\Models\FooterItem;
use App\Models\NavbarItem;
use App\Models\Setting;
use App\Services\SiteTranslationService;
use Illuminate\Database\Seeder;

class SiteTranslationSeeder extends Seeder
{
    /**
     * Spanish translations for the default navbar and footer items,
     * matched by slug (stable across installs) rather than id. Skips any
     * slug that doesn't exist on this install instead of failing.
     */
    private const NAVBAR_TITLES = [
        'courses' => 'Cursos',
        'exams' => 'Exámenes',
        'store' => 'Tienda',
        'about-us' => 'Sobre Nosotros',
        'our-team' => 'Nuestro Equipo',
        'careers' => 'Carreras',
        'blogs' => 'Blogs',
        'search' => 'Buscar',
        'theme' => 'Tema',
        'notification' => 'Notificaciones',
        'cart' => 'Carrito',
        'language' => 'Idioma',
        'profile' => 'Perfil',
    ];

    private const FOOTER_TITLES = [
        'company' => 'Compañía',
        'legal_policies' => 'Legal y Políticas',
        'address' => 'Dirección',
        'payment_methods' => 'Aceptamos múltiples pasarelas de pago.',
        'copyright' => '© Copyright 2025 UI Lib, Todos los derechos reservados.',
    ];

    /**
     * Sub-item titles keyed by parent footer slug => english title => spanish title.
     *
     * @var array<string, array<string, string>>
     */
    private const FOOTER_SUB_ITEM_TITLES = [
        'company' => [
            'About Us' => 'Sobre Nosotros',
            'Our Team' => 'Nuestro Equipo',
            'Careers' => 'Carreras',
            'Contact Us' => 'Contáctanos',
        ],
        'legal_policies' => [
            'Cookie Policy' => 'Política de Cookies',
            'Terms & Conditions' => 'Términos y Condiciones',
            'Privacy Policy' => 'Política de Privacidad',
            'Refund Policy' => 'Política de Reembolsos',
        ],
        'address' => [
            'Email: uilib@gmail.com' => 'Correo electrónico: uilib@gmail.com',
            'Phone: +880 1123 456 780' => 'Teléfono: +880 1123 456 780',
        ],
    ];

    /**
     * Matched by the current English value rather than a fixed key, so it
     * only applies if the install still has the default seeded content —
     * skips silently otherwise instead of overwriting a customer's own copy.
     */
    private const SYSTEM_SETTING_TRANSLATIONS = [
        'name' => [
            'Mentor Learning Management System' => 'Mentor - Sistema de Gestión de Aprendizaje',
        ],
        'title' => [
            'Mentor Learning Management System' => 'Mentor - Sistema de Gestión de Aprendizaje',
        ],
        'keywords' => [
            'LMS, Learning Management System, Courses, Mentor, LMS' => 'LMS, Sistema de Gestión de Aprendizaje, Cursos, Mentor, LMS',
        ],
        'description' => [
            'Transform your learning journey with Mentor LMS - a comprehensive online learning platform connecting expert instructors with passionate learners. Discover courses, build skills, and achieve your goals.' => 'Transforma tu viaje de aprendizaje con Mentor LMS: una plataforma de aprendizaje en línea integral que conecta a instructores expertos con estudiantes apasionados. Descubre cursos, desarrolla habilidades y alcanza tus metas.',
        ],
        'slogan' => [
            'A course based video CMS' => 'Un CMS de video basado en cursos',
        ],
    ];

    public function run(): void
    {
        $service = app(SiteTranslationService::class);

        $navbarTranslations = [];

        foreach (NavbarItem::all() as $item) {
            if (isset(self::NAVBAR_TITLES[$item->slug])) {
                $navbarTranslations[] = [
                    'translatable_id' => $item->id,
                    'field' => 'title',
                    'value' => self::NAVBAR_TITLES[$item->slug],
                ];
            }
        }

        if ($navbarTranslations !== []) {
            $service->saveMap(SiteTranslationService::NAVBAR_ITEM, 'es', $navbarTranslations);
        }

        $footerTranslations = [];

        foreach (FooterItem::all() as $item) {
            if (isset(self::FOOTER_TITLES[$item->slug])) {
                $footerTranslations[] = [
                    'translatable_id' => $item->id,
                    'field' => 'title',
                    'value' => self::FOOTER_TITLES[$item->slug],
                ];
            }

            $subTitles = self::FOOTER_SUB_ITEM_TITLES[$item->slug] ?? null;

            if ($subTitles && is_array($item->items)) {
                foreach ($item->items as $index => $subItem) {
                    if (isset($subTitles[$subItem['title'] ?? null])) {
                        $footerTranslations[] = [
                            'translatable_id' => $item->id,
                            'field' => "items.{$index}.title",
                            'value' => $subTitles[$subItem['title']],
                        ];
                    }
                }
            }
        }

        if ($footerTranslations !== []) {
            $service->saveMap(SiteTranslationService::FOOTER_ITEM, 'es', $footerTranslations);
        }

        $system = Setting::where('type', 'system')->first();

        if ($system) {
            $systemTranslations = [];

            foreach (self::SYSTEM_SETTING_TRANSLATIONS as $field => $byCurrentValue) {
                $current = $system->fields[$field] ?? null;

                if ($current !== null && isset($byCurrentValue[$current])) {
                    $systemTranslations[] = [
                        'translatable_id' => $system->id,
                        'field' => $field,
                        'value' => $byCurrentValue[$current],
                    ];
                }
            }

            if ($systemTranslations !== []) {
                $service->saveMap(SiteTranslationService::SYSTEM_SETTING, 'es', $systemTranslations);
            }
        }

        // php artisan db:seed --class="Database\Seeders\SiteTranslationSeeder"
    }
}
