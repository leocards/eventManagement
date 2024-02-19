<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SecurityQuestion;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'email_verified' => $request?->email,
            'token' => $request->token
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    public function verifyEmail(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        if(User::where('email', $request->email)->first()) {
            return redirect()->route('password.request', ['email'=>$request->email, 'token'=> Str::random(32)]);
        } else throw ValidationException::withMessages([
            'email' => ["We can't find a user with that email address."],
        ]);
    }

    public function securityQuestions(Request $request)
    {
        $questions = SecurityQuestion::where('user_id', User::where('email', $request->email)->value('id'))->pluck('question');

        return response()->json($questions);
    }

    public function verifyAnswer(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'question' => 'required',
            'answer' => 'required'
        ]);

        $questions = SecurityQuestion::where('question', $request->question)
            ->where('answer', $request->answer)
            ->first();

        if($questions) {
            return redirect()->route('password.reset', ['email' => $request->email, 'token' => Str::random(32)]);
        } else return back()->withErrors("Failed to verify");
    }
}
