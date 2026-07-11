<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\ScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Repositories\Contracts\ScheduleRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScheduleController extends BaseApiController
{
    protected ScheduleRepositoryInterface $scheduleRepository;

    public function __construct(ScheduleRepositoryInterface $scheduleRepository)
    {
        $this->scheduleRepository = $scheduleRepository;
    }

    /**
     * Display a listing of schedules.
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search');
        $day = $request->query('day');
        $perPage = (int) $request->query('per_page', 10);
        $sort = $request->query('sort', 'created_at');
        $order = $request->query('order', 'desc');

        $schedules = $this->scheduleRepository->getFilteredSchedules(
            $search,
            $day,
            $perPage,
            $sort,
            $order
        );

        return response()->json([
            'success' => true,
            'message' => 'Daftar jadwal perkuliahan berhasil diambil.',
            'data' => ScheduleResource::collection($schedules),
            'meta' => [
                'current_page' => $schedules->currentPage(),
                'last_page' => $schedules->lastPage(),
                'per_page' => $schedules->perPage(),
                'total' => $schedules->total(),
            ]
        ]);
    }

    /**
     * Store a newly created schedule in storage.
     */
    public function store(ScheduleRequest $request): JsonResponse
    {
        $schedule = $this->scheduleRepository->create($request->validated());

        return $this->sendSuccess(
            new ScheduleResource($schedule),
            'Jadwal perkuliahan berhasil ditambahkan.',
            21
        );
    }

    /**
     * Display the specified schedule.
     */
    public function show(int $id): JsonResponse
    {
        $schedule = $this->scheduleRepository->find($id);

        if (!$schedule) {
            return $this->sendError('Jadwal perkuliahan tidak ditemukan.', [], 44);
        }

        return $this->sendSuccess(new ScheduleResource($schedule), 'Jadwal perkuliahan ditemukan.');
    }

    /**
     * Update the specified schedule in storage.
     */
    public function update(ScheduleRequest $request, int $id): JsonResponse
    {
        $schedule = $this->scheduleRepository->find($id);

        if (!$schedule) {
            return $this->sendError('Jadwal perkuliahan tidak ditemukan.', [], 44);
        }

        $this->scheduleRepository->update($id, $request->validated());

        return $this->sendSuccess(
            new ScheduleResource($schedule->fresh()),
            'Jadwal perkuliahan berhasil diperbarui.'
        );
    }

    /**
     * Remove the specified schedule from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $schedule = $this->scheduleRepository->find($id);

        if (!$schedule) {
            return $this->sendError('Jadwal perkuliahan tidak ditemukan.', [], 44);
        }

        $this->scheduleRepository->delete($id);

        return $this->sendSuccess(null, 'Jadwal perkuliahan berhasil dihapus.');
    }
}
