<?php

namespace App\Repositories\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;

interface ScheduleRepositoryInterface extends RepositoryInterface
{
    /**
     * Get schedules with custom day filtering, search terms, and sort orders.
     */
    public function getFilteredSchedules(
        ?string $search,
        ?string $day,
        int $perPage,
        string $sort,
        string $order
    ): LengthAwarePaginator;
}
