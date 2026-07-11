<?php

namespace App\Repositories\Contracts;

use App\Models\ClassProfile;

interface ProfileRepositoryInterface
{
    /**
     * Get the single active class profile.
     */
    public function getProfile(): ?ClassProfile;

    /**
     * Update the active class profile.
     */
    public function updateProfile(array $attributes): ClassProfile;
}
