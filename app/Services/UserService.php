<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function getUsers(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('users_page', $data) ? intval($data['users_page']) : 1;
        $perPage = array_key_exists('users_per_page', $data) ? intval($data['users_per_page']) : 10;

        $users = User::students()
            ->when(array_key_exists('users_search', $data), function ($query) use ($data) {
                return $query->where(function ($q) use ($data) {
                    $q->where('name', 'LIKE', '%'.$data['users_search'].'%')
                        ->orWhere('email', 'LIKE', '%'.$data['users_search'].'%');
                });
            })
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('enrollments_count', $data) && $data['enrollments_count'], function ($query) {
                return $query->withCount('enrollments');
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $users->paginate($perPage, ['*'], 'users_page', $pageNumber);
        }

        return $users->get();
    }

    public function updateUser(int|string $id, array $data): void
    {
        DB::transaction(function () use ($data, $id) {
            User::findOrFail($id)->update($data);
        }, 5);
    }
}
