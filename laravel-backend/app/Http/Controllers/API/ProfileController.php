<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Repositories\Contracts\ProfileRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProfileController extends BaseApiController
{
    protected ProfileRepositoryInterface $profileRepository;

    public function __construct(ProfileRepositoryInterface $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    /**
     * Get the active class profile.
     */
    public function show(): JsonResponse
    {
        $profile = $this->profileRepository->getProfile();

        if (!$profile) {
            return $this->sendError('Profil kelas belum diset.', [], 44);
        }

        return $this->sendSuccess(new ProfileResource($profile), 'Profil kelas berhasil diambil.');
    }

    /**
     * Update or create the active class profile.
     */
    public function update(ProfileRequest $request): JsonResponse
    {
        $existingProfile = $this->profileRepository->getProfile();
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            // Delete old logo from storage if it exists
            if ($existingProfile && $existingProfile->logo && Storage::exists($existingProfile->logo)) {
                Storage::delete($existingProfile->logo);
            }

            // Upload logo to public/logos
            $path = $request->file('logo')->store('public/logos');
            $data['logo'] = $path;
        }

        $profile = $this->profileRepository->updateProfile($data);

        return $this->sendSuccess(
            new ProfileResource($profile),
            'Profil kelas berhasil diperbarui.'
        );
    }
}
