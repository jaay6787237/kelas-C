<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\PasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends BaseApiController
{
    /**
     * Admin login endpoint.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('password');

        if ($request->filled('username')) {
            $user = User::where('username', $request->username)->first();
        } else {
            $user = User::where('email', $request->email)->first();
        }

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return $this->sendError('Kredensial login tidak valid.', [
                'auth' => ['Username, email atau password salah.']
            ], 422);
        }

        // Generate Sanctum api token
        $token = $user->createToken('admin_auth_token')->plainTextToken;

        return $this->sendSuccess([
            'user' => new UserResource($user),
            'token' => $token,
            'token_type' => 'Bearer'
        ], 'Login admin berhasil.');
    }

    /**
     * Admin logout.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendSuccess(null, 'Logout berhasil dilakukan.');
    }

    /**
     * Fetch authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        return $this->sendSuccess(new UserResource($request->user()), 'Data admin berhasil diambil.');
    }

    /**
     * Update admin user profile.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
        ]);

        $user->update($validated);

        return $this->sendSuccess(new UserResource($user), 'Profil admin berhasil diperbarui.');
    }

    /**
     * Change admin password.
     */
    public function changePassword(PasswordRequest $request): JsonResponse
    {
        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return $this->sendError('Password saat ini salah.', [
                'current_password' => ['Password saat ini tidak cocok dengan data kami.']
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return $this->sendSuccess(null, 'Password admin berhasil diubah.');
    }
}
