<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use App\Models\User;
use Exception;
use Illuminate\Http\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class SellerController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  public function createSellerAccoount(Request $request)
  {
    $request->validate([
      'first_name' => ['required', 'string', 'max:255'],
      'last_name' => ['required', 'string', 'max:255'],
      'proof_of_membership_path' => ['required'],
      'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
      'password' => ['required', 'confirmed', Password::defaults()],
      'has_permit' => ['required'],
      'has_dti' => ['required'],
      'has_mayors_business_permit' => ['required'],
      'has_paid_org_fee' => ['required'],
      'has_barangay_clearance' => ['required'],
      'has_bir' => ['required']
    ], [
      'has_permit.required' => "Permit is required.",
      'proof_of_membership_path.required' => 'The proof of membership is required.',
      'has_dti.required' => 'The DTI is required.',
      'has_mayors_business_permit.required' => 'The Mayor\'s Business Permit is required.',
      'has_paid_org_fee.required' => 'The Organizational Fee is required.',
      'has_barangay_clearance.required' => 'The Barangay Clearance is required.',
      'has_bir.required' => 'The BIR Registration is required.'
    ]);

    try {
      $randomNumber = rand(1000, 9999);
      $fileExtension = $request->file('proof_of_membership_path')->getClientOriginalExtension();
      $fileName = 'Permit_' . $request->first_name . '_' . $randomNumber . '.' . $fileExtension;
      $directory = 'Photos/Permit_photos';
      $path = Storage::disk('public')->putFileAs($directory, $request->file('proof_of_membership_path'), $fileName);
    } catch (Exception $e) {
      return redirect()->route('seller.signup')->with('message', 'Something Went wrong.');
    }
    if ($path) {
      $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'address' => $request->address,
        'email' => $request->email,
        'is_seller' => true,
        'password' => Hash::make($request->password),
      ]);

      $sellerDetails = Seller::create([
        'user_id',
        'seller_id' => $user->id,
        'seller_address' => $request->address,
        'years_in_selling' => $request->years_in_selling,
        'has_permit' => $request->has_permit == 'on' ? true : false,
        'has_DTI' => $request->has_dti  == 'on' ? true : false,
        'has_mayors_business_permit' => $request->has_mayors_business_permit  == 'on' ? true : false,
        'has_paid_organizational_fee' => $request->has_paid_org_fee  == 'on' ? true : false,
        'has_barangay_clearance' => $request->has_barangay_clearance  == 'on' ? true : false,
        'has_bir' => $request->has_bir  == 'on' ? true : false,
        'proof_of_membership_path' => $path,
      ]);

      if ($user && $sellerDetails) {
        return Inertia::render('StatusPages/SuccessSellerAccount');
      }
    } else {
      return redirect()->route('seller.signup')->with('message', 'Something went wrong in creating path, contact developers.');
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Seller $seller)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Seller $seller)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Seller $seller)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Seller $seller)
  {
    //
  }
}
