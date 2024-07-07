<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    if (Auth::check()) {
      $user = Auth::user();

      // return $sellerData;
      if ($user->is_admin == true) {
        // Proceed to the next request if the user is not admin and not seller
        return $next($request);
      } else {
        // Abort with 403 forbidden if the user is admin or seller
        abort(403, 'Unauthorized');
      }
    } else {
      return redirect()->route('admin.login');
    }
  }
}
