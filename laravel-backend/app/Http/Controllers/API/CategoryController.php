<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends BaseApiController
{
    protected CategoryRepositoryInterface $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of categories.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $search = $request->query('search', '');

        $categories = $this->categoryRepository->paginate($perPage, ['name', 'slug'], $search);

        return response()->json([
            'success' => true,
            'message' => 'Daftar kategori galeri berhasil diambil.',
            'data' => CategoryResource::collection($categories),
            'meta' => [
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
            ]
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $category = $this->categoryRepository->create($data);

        return $this->sendSuccess(
            new CategoryResource($category),
            'Kategori galeri berhasil dibuat.',
            21
        );
    }

    /**
     * Display the specified category.
     */
    public function show(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (!$category) {
            return $this->sendError('Kategori galeri tidak ditemukan.', [], 44);
        }

        return $this->sendSuccess(new CategoryResource($category), 'Kategori galeri ditemukan.');
    }

    /**
     * Update the specified category.
     */
    public function update(CategoryRequest $request, int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (!$category) {
            return $this->sendError('Kategori galeri tidak ditemukan.', [], 44);
        }

        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $this->categoryRepository->update($id, $data);

        return $this->sendSuccess(
            new CategoryResource($category->fresh()),
            'Kategori galeri berhasil diperbarui.'
        );
    }

    /**
     * Remove the specified category.
     */
    public function destroy(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (!$category) {
            return $this->sendError('Kategori galeri tidak ditemukan.', [], 44);
        }

        // Prevent deletion if category has associated galleries
        if ($category->galleries()->count() > 0) {
            return $this->sendError(
                'Tidak dapat menghapus kategori ini karena masih memiliki galeri aktif.',
                ['galleries' => ['Harap hapus atau pindahkan foto galeri terlebih dahulu.']],
                422
            );
        }

        $this->categoryRepository->delete($id);

        return $this->sendSuccess(null, 'Kategori galeri berhasil dihapus.');
    }
}
