<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            "first_name" => ['required', 'max:255'],
            "last_name" => ['required', 'max:255'],
            "birthday" => ['required', 'date'],
            "email" => ["required", 'email', 'unique:users,email'],
            "contact" => ['required', 'size:11', 'starts_with:09'],
            "address" => ['required'],
            "position" => ['required'],
            "province" => ['required'],
            "password_confirmation" => ['required'],
            "gender" => ['required', 'in:Male,Female'],
            'password' => ['required', 
                'confirmed', 
                Rules\Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
            ],
        ]);

        try {
            $filename = null;
            if ($request->profile && $request->profile['response']) {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->profile["data"]["base64"]));
                $filename = 'image_' . time() . '.' . $request->profile["data"]["extension"];

                Storage::disk('public')->put('profile/' . $filename, $imageData);

                $imagePath = public_path('app/public/profile/' . $filename);
                if (!$imagePath)
                    return back()->withErrors('file', $imagePath);
                else $filename = '/storage/profile/' . $filename;
            }

            $user = DB::transaction(function () use ($request, $filename) {
                return User::create([
                    "first_name" => $request->first_name,
                    "last_name" => $request->last_name,
                    "birthday" => $request->birthday,
                    "email" => $request->email,
                    "contact" => $request->contact,
                    "address" => $request->address,
                    "position" => $request->position,
                    "province" => $request->province,
                    "gender" => $request->gender,
                    "profile" => $filename ?? "/storage/profile/profile.png",
                    "password" => Hash::make($request->password),
                    "status" => "Active",
                    "role" => "Employee",
                ]);
            });

            event(new Registered($user));

            Auth::login($user);

            /// RouteServiceProvider::HOME

            return redirect()->route('profile.edit');

        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
