<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\GalleryRequest;
use App\Http\Resources\GalleryResource;
use App\Repositories\Contracts\GalleryRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends BaseApiController
{
    protected GalleryRepositoryInterface $galleryRepository;

    public function __construct(GalleryRepositoryInterface $galleryRepository)
    {
        $this->galleryRepository = $galleryRepository;
    }

    /**
     * Display a listing of gallery items.
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search');
        $category = $request->query('category'); // Can be ID, slug, or name
        $perPage = (int) $request->query('per_page', 10);
        $sort = $request->query('sort', 'created_at');
        $order = $request->query('order', 'desc');

        $gallery = $this->galleryRepository->getFilteredGallery(
            $search,
            $category,
            $perPage,
            $sort,
            $order
        );

        return response()->json([
            'success' => true,
            'message' => 'Daftar foto galeri berhasil diambil.',
            'data' => GalleryResource::collection($gallery),
            'meta' => [
                'current_page' => $gallery->currentPage(),
                'last_page' => $gallery->lastPage(),
                'per_page' => $gallery->perPage(),
                'total' => $gallery->total(),
            ]
        ]);
    }

    /**
     * Store a newly created gallery item in storage with image upload.
     */
    public function store(GalleryRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Upload to storage/app/public/gallery
            $path = $request->file('image')->store('public/gallery');
            $data['image'] = $path;
        }

        $gallery = $this->galleryRepository->create($data);

        return $this->sendSuccess(
            new GalleryResource($gallery->load('category')),
            'Foto galeri baru berhasil diunggah.',
            21
        );
    }

    /**
     * Display the specified gallery item.
     */
    public function show(int $id): JsonResponse
    {
        $gallery = $this->galleryRepository->find($id);

        if (!$gallery) {
            return $this->sendError('Foto galeri tidak ditemukan.', [], 44);
        }

        return $this->sendSuccess(new GalleryResource($gallery->load('category')), 'Foto galeri ditemukan.');
    }

    /**
     * Update the specified gallery item in storage.
     */
    public function update(GalleryRequest $request, int $id): JsonResponse
    {
        $gallery = $this->galleryRepository->find($id);

        if (!$gallery) {
            return $this->sendError('Foto galeri tidak ditemukan.', [], 44);
        }

        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old file if exists in storage
            if ($gallery->image && Storage::exists($gallery->image)) {
                Storage::delete($gallery->image);
            }

            // Store new file
            $path = $request->file('image')->store('public/gallery');
            $data['image'] = $path;
        }

        $this->galleryRepository->update($id, $data);

        return $this->sendSuccess(
            new GalleryResource($gallery->fresh()->load('category')),
            'Dokumentasi galeri berhasil diperbarui.'
        );
    }

    /**
     * Remove the specified gallery item from storage (with Soft Delete support).
     */
    public function destroy(int $id): JsonResponse
    {
        $gallery = $this->galleryRepository->find($id);

        if (!$gallery) {
            return $this->sendError('Foto galeri tidak ditemukan.', [], 44);
        }

        // Deleting record (Note: soft delete preserves the file in storage)
        $this->galleryRepository->delete($id);

        return $this->sendSuccess(null, 'Foto galeri berhasil dihapus.');
    }
}
