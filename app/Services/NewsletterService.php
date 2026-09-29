<?php

namespace App\Services;

use App\Models\Newsletter;
use App\Models\User;
use App\Notifications\NewsletterNotification;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class NewsletterService extends MediaService
{
    public function getNewsletters(array $data, bool $paginate = false): LengthAwarePaginator|Collection
    {
        $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

        $newsletters = Newsletter::when(array_key_exists('search', $data), function ($query) use ($data) {
            return $query->where('subject', 'LIKE', '%'.$data['search'].'%');
        })
            ->latest();

        if ($paginate) {
            return $newsletters->paginate($page);
        }

        return $newsletters->get();
    }

    public function createNewsletter(array $data): Newsletter
    {
        return Newsletter::create($data);
    }

    public function updateNewsletter(string $id, array $data): Newsletter
    {
        $newsletter = Newsletter::findOrFail($id);
        $newsletter->update($data);

        return $newsletter;
    }

    public function deleteNewsletter(string $id): bool
    {
        return Newsletter::findOrFail($id)->delete();
    }

    public function NewsletterNotification(array $data)
    {
        $newsletter = Newsletter::findOrFail($data['newsletter_id']);
        $users = User::when($data['user_type'] === 'all', function ($query) {
            return $query->where('role', '!=', 'admin');
        })->when($data['user_type'] !== 'all', function ($query) use ($data) {
            return $query->where('role', $data['user_type']);
        })->get();

        foreach ($users as $user) {
            $user->notify(new NewsletterNotification($newsletter));
        }
    }
}
