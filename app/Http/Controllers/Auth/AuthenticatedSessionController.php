<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
  /**
   * Display the login view.
   */
  public function create(): Response
  {
    return Inertia::render('Auth/Login', [
      'canResetPassword' => Route::has('password.request'),
      'status' => session('status'),
    ]);
  }

  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): RedirectResponse
  {
    $request->authenticate();


    $request->session()->regenerate();
    if (auth()->user()->is_seller == 1) {
      if (auth()->user()->seller->is_verified == 0) {
        $request->session()->regenerateToken();

        $request->session()->invalidate();
        return to_route('seller.pending.account');
      } else {
        return redirect()->intended(route('seller.dashboard', absolute: false));
      }
    } else {

      return redirect()->intended(route('dashboard', absolute: false));
    }
  }
  // Incoming Admin authentication request
  public function adminLogin(LoginRequest $request): RedirectResponse
  {
    $request->authenticate();
    Log::info('User authenticated:', ['user' => auth()->user()]);
    $request->session()->regenerate();

    return redirect()->intended(route('admin.index', absolute: false));
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
  }
}
