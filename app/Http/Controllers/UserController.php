<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
  public function showProfile()
  {
    return Inertia::render('User/UserProfile');
  }

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

  public function updatePassword(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'current_password' => ['required', 'current_password'],
      'password' => ['required', Password::defaults(), 'confirmed'],
    ]);

    $request->user()->update([
      'password' => Hash::make($validated['password']),
    ]);

    return back();
  }

  public function updateUserInformation(Request $request): RedirectResponse
  {
    $request->validate([
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email',
      'address' => 'required',
    ]);

    try {
      DB::beginTransaction();

      $user = User::where('id', auth()->id())->first();
      if ($request->hasFile('new_profile_picture')) {
        $randomNumber  = rand(100, 999);
        $fileExtension = $request->new_profile_picture->getClientOriginalExtension();
        $fileName = $request->first_name . $request->last_name . '_' . $randomNumber . '.' . $fileExtension;
        $directory = 'Photos/Profile_Pictures/Customers';
        $path = $request->new_profile_picture->storeAs($directory, $fileName, 'public');
      }

      $user->update([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone_no' => $request->phone_no,
        'address' => $request->address,
        'profile_picture_path' => $path
      ]);

      DB::commit();
      return back();
    } catch (Exception $e) {
      return back()->with(['message' => 'Something went wrong: ' . $e->getMessage()]);
    }
    dd($request->all());
  }


  // end
}