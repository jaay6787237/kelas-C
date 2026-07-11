<?php

namespace App\Repositories\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;

interface GalleryRepositoryInterface extends RepositoryInterface
{
    /**
     * Get gallery items with category ID/slug filtering, search, and sorting.
     */
    public function getFilteredGallery(
        ?string $search,
        ?string $categorySlugOrId,
        int $perPage,
        string $sort,
        string $order
    ): LengthAwarePaginator;
}
