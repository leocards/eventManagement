<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class UserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, String $role, String $role2 = null): Response
    {   
        if($request->user()->hasRole($role) || ($role2 && $request->user()->hasRole($role2))) {
            return $next($request);
        }

        return redirect()->back()->with('message', 'Unauthorized access');
    }
}
