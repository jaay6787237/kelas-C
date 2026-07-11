<?php

namespace App\Repositories\Eloquent;

use App\Models\ClassProfile;
use App\Repositories\Contracts\ProfileRepositoryInterface;

class ProfileRepository implements ProfileRepositoryInterface
{
    protected ClassProfile $model;

    public function __construct(ClassProfile $model)
    {
        $this->model = $model;
    }

    public function getProfile(): ?ClassProfile
    {
        return $this->model->first();
    }

    public function updateProfile(array $attributes): ClassProfile
    {
        $profile = $this->getProfile();
        
        if (!$profile) {
            return $this->model->create($attributes);
        }

        $profile->update($attributes);
        return $profile->fresh();
    }
}
