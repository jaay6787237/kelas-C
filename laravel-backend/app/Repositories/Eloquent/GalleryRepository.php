<?php

namespace App\Repositories\Eloquent;

use App\Models\Gallery;
use App\Repositories\Contracts\GalleryRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GalleryRepository extends BaseRepository implements GalleryRepositoryInterface
{
    public function __construct(Gallery $model)
    {
        parent::__construct($model);
    }

    public function getFilteredGallery(
        ?string $search,
        ?string $categorySlugOrId,
        int $perPage,
        string $sort,
        string $order
    ): LengthAwarePaginator {
        $query = $this->model->newQuery()->with('category');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        if ($categorySlugOrId) {
            $query->whereHas('category', function ($q) use ($categorySlugOrId) {
                if (is_numeric($categorySlugOrId)) {
                    $q->where('id', $categorySlugOrId);
                } else {
                    $q->where('slug', $categorySlugOrId)
                      ->orWhere('name', 'like', '%' . $categorySlugOrId . '%');
                }
            });
        }

        $allowedSorts = ['id', 'title', 'taken_at', 'created_at'];
        $sort = in_array($sort, $allowedSorts) ? $sort : 'created_at';
        $order = strtolower($order) === 'asc' ? 'asc' : 'desc';

        return $query->orderBy($sort, $order)->paginate($perPage);
    }
}
