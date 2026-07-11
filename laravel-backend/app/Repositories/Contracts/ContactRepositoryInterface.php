<?php

namespace App\Repositories\Contracts;

use App\Models\Contact;

interface ContactRepositoryInterface
{
    /**
     * Get the single active contact details.
     */
    public function getContact(): ?Contact;

    /**
     * Update the active contact details.
     */
    public function updateContact(array $attributes): Contact;
}
