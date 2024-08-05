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

    $user = Auth::user();
    // return $sellerData;
    if ($user->is_admin == true) {
      return $next($request);
    } else {
      if ($user->seller) {
        return redirect()->route('seller.dashboard');
      } elseif ($user->is_seller == false && $user->is_admin == false) {
        return redirect()->route('dashboard');
      } else {
        abort(403, 'Unauthorized');
      }
    }
  }
}
