<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\ContactRequest;
use App\Http\Resources\ContactResource;
use App\Repositories\Contracts\ContactRepositoryInterface;
use Illuminate\Http\JsonResponse;

class ContactController extends BaseApiController
{
    protected ContactRepositoryInterface $contactRepository;

    public function __construct(ContactRepositoryInterface $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    /**
     * Get class contact details.
     */
    public function show(): JsonResponse
    {
        $contact = $this->contactRepository->getContact();

        if (!$contact) {
            return $this->sendError('Informasi kontak kelas belum diset.', [], 44);
        }

        return $this->sendSuccess(new ContactResource($contact), 'Informasi kontak berhasil diambil.');
    }

    /**
     * Update or create contact details.
     */
    public function update(ContactRequest $request): JsonResponse
    {
        $contact = $this->contactRepository->updateContact($request->validated());

        return $this->sendSuccess(
            new ContactResource($contact),
            'Informasi kontak berhasil diperbarui.'
        );
    }
}
