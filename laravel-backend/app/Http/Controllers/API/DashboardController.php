<?php

namespace App\Http\Controllers\API;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Models\Schedule;
use Illuminate\Http\JsonResponse;

class DashboardController extends BaseApiController
{
    /**
     * Get dashboard summary overview.
     */
    public function index(): JsonResponse
    {
        $totalGallery = Gallery::count();
        $totalSchedule = Schedule::count();
        $totalCategory = GalleryCategory::count();

        return $this->sendSuccess([
            'total_gallery' => $totalGallery,
            'total_schedule' => $totalSchedule,
            'total_category' => $totalCategory,
        ], 'Metrik dashboard berhasil diambil.');
    }
}
