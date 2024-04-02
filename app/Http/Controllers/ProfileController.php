<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\SecurityQuestion;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $securityQuestions = SecurityQuestion::where('user_id', Auth::id())->get(['question']);

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'questions' => $securityQuestions,
            'security' => $securityQuestions->count() === 0 ? false : true,
            'passwordChanged' => Hash::check('12345678', Auth::user()->password)
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updateProfilePicture(Request $request): RedirectResponse
    {
        $request->validate([
            "profile" => ['required']
        ]);

        try {
            DB::transaction(function () use ($request) {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                $filename = 'image_' . time() . '.' . $request->profile["data"]["extension"];
    
                Storage::disk('public')->put('profile/' . $filename, $imageData);
    
                $imagePath = public_path('app/public/profile/' . $filename);
    
                if (!$imagePath) {
                    return back()->withErrors('file', $imagePath);
                }
    
                $filename = '/storage/profile/' . $filename;
    
                $user = User::find(Auth::id());
                $user->profile = $filename;
                $user->save();

                Auth::user()->profile = $filename;
            });
            
            return back()->with('message', 'Successfully uploaded.');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
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

    /**
     * Delete security notice session.
     */
    public function ignoreNotice()
    {
        Session::forget('security-notice');

        return response()->json('ok');
    }
}
