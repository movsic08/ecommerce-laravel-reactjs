<?php

namespace App\Http\Middleware;

use App\Models\Seller;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifiedSeller
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
      $sellerData = Seller::where('user_id', $user->id)->first();

      if ($sellerData->is_verified == true && $user->is_seller == true) {
        // Proceed to the next request if the user is not admin and not customer
        return $next($request);
      } else {

        if ($sellerData->is_verified == false && $user->is_seller == true) {
          return to_route('seller.pending.account');
        } else {
          abort(403, 'Unauthorized');
        }
      }
    } else {
      return redirect()->route('login');
    }
  }
}
