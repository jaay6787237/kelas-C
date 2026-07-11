<?php

namespace App\Repositories\Eloquent;

use App\Models\Schedule;
use App\Repositories\Contracts\ScheduleRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ScheduleRepository extends BaseRepository implements ScheduleRepositoryInterface
{
    public function __construct(Schedule $model)
    {
        parent::__construct($model);
    }

    public function getFilteredSchedules(
        ?string $search,
        ?string $day,
        int $perPage,
        string $sort,
        string $order
    ): LengthAwarePaginator {
        $query = $this->model->newQuery();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('course_name', 'like', '%' . $search . '%')
                  ->orWhere('lecturer', 'like', '%' . $search . '%')
                  ->orWhere('classroom', 'like', '%' . $search . '%');
            });
        }

        if ($day) {
            $query->where('day', $day);
        }

        // Validate sort column to prevent injection
        $allowedSorts = ['id', 'course_name', 'lecturer', 'day', 'start_time', 'classroom', 'created_at'];
        $sort = in_array($sort, $allowedSorts) ? $sort : 'created_at';
        $order = strtolower($order) === 'asc' ? 'asc' : 'desc';

        return $query->orderBy($sort, $order)->paginate($perPage);
    }
}
