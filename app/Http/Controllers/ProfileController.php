<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }

    public function update(Request $request)
    {
        // dd($request);

        $user = User::where('id', Auth::id())->first();

        $image = $request->file('image');
        if ($image) {
            $image_name = $image->getClientOriginalName();
            $location = 'uploads/profile_photos/';
            $path = public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }
            $new_image = $location . $image_name;
            $request->file('image')->move($path, $new_image);

            $user->update([
                'image' => $new_image,
            ]);
        }

        $user->update([
            'email' => $request->email
        ]);

        if ($request->new_password) {
            if ($request->new_password != $request->confirm_password) {
                return "New password and confirm password is not match.";
            }

            $hasher = app('hash');
            if ($hasher->check($request->current_password, $user->password)) {
                $user->update([
                    'password' => bcrypt($request->new_password),
                ]);
            } else {
                return "Invalid current password entered.";
            }
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
