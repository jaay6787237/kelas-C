<?php

namespace App\Repositories\Eloquent;

use App\Models\Contact;
use App\Repositories\Contracts\ContactRepositoryInterface;

class ContactRepository implements ContactRepositoryInterface
{
    protected Contact $model;

    public function __construct(Contact $model)
    {
        $this->model = $model;
    }

    public function getContact(): ?Contact
    {
        return $this->model->first();
    }

    public function updateContact(array $attributes): Contact
    {
        $contact = $this->getContact();

        if (!$contact) {
            return $this->model->create($attributes);
        }

        $contact->update($attributes);
        return $contact->fresh();
    }
}
