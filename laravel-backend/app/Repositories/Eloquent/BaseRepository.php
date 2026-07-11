<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class BaseRepository implements RepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function paginate(int $perPage = 10, array $searchFields = [], string $searchTerm = ''): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if (!empty($searchFields) && !empty($searchTerm)) {
            $query->where(function ($q) use ($searchFields, $searchTerm) {
                foreach ($searchFields as $index => $field) {
                    if ($index === 0) {
                        $q->where($field, 'like', '%' . $searchTerm . '%');
                    } else {
                        $q->orWhere($field, 'like', '%' . $searchTerm . '%');
                    }
                }
            });
        }

        return $query->paginate($perPage);
    }

    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    public function update(int $id, array $attributes): bool
    {
        $record = $this->find($id);
        if ($record) {
            return $record->update($attributes);
        }
        return false;
    }

    public function delete(int $id): bool
    {
        $record = $this->find($id);
        if ($record) {
            return $record->delete();
        }
        return false;
    }
}
