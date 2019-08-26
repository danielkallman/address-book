<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckIsAdminOrUser
{
    public function handle($request, Closure $next)
    {
        if (
            Auth::user()->role === 2 ||
            Auth::user()->role === 1
        ) {
            return $next($request);
        } else {
            return response()->json(['error' => 'Unauthorized_user'], 403);
        }
    }
}
