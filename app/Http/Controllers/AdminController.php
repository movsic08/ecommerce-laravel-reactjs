<?php

namespace App\Http\Controllers;

use App\Http\Middleware\VerifiedSeller;
use App\Http\Resources\AdminResourceOfSellers;
use App\Http\Resources\SellerDataResource;
use App\Mail\SellerUnverified;
use App\Mail\SellerVerified;
use App\Models\Products;
use App\Models\Seller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $query = User::query();
    $query = $query->where('is_seller', true);
    $users = $query->paginate(15);

    return Inertia::render('Admin/SellersList', [
      'users' => AdminResourceOfSellers::collection($users),
    ]);
  }

  public function indexUsers()
  {
    $query = User::query();
    $query = $query->where('is_seller', false);
    $query = $query->where('is_admin', false);

    $users = $query->paginate(15);

    return Inertia::render('Admin/UsersList', [
      "users" => $users
    ]);
  }


  public function updateSellerStatus(Request $request, string $id)
  {

    $request->validate([
      'is_verified' => 'required',
    ]);

    if ($request->is_verified == 0) {
      $request->validate([
        'message' => 'required',
      ]);
    }

    try {

      $user = User::with('seller')->findorFail($id);
      $seller = $user->seller;
      DB::beginTransaction();
      $seller->update([
        'is_verified' => $request->is_verified,
        'verified_at' => Carbon::now()
      ]);


      if ($request->is_verified == 1) {

        Mail::to($user->email)->send(new SellerVerified((object) $request->all()));
      }

      if ($request->is_verified == 0) {
        Mail::to($user->email)->send(new SellerUnverified((object) $request->all()));
      }

      DB::commit();
      Log::alert('email sent success');
      return redirect()->route('admin.view-seller', $request->id)->with('message', 'Change status success');
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Failed to update seller status or send email: ' . $e->getMessage());
      return redirect()->route('admin.view-seller', $request->id)->with('error', 'Failed to send email');
    }
  }


  public function adminDashboard()
  {
    $products = Products::orderBy('sold', 'desc')->limit(5)->get();
    // $products = Products::with('images')->orderBy('sold', 'desc')->get();
    // dump($products);
    return Inertia::render('Admin/Index', [
      'products' => $products
    ]);
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
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  public function updateSeller(Request $request, string $id)
  {

    $request->validate([
      'shop_name' => 'required',
      'shop_address' => 'required',
      'first_name' => 'required| min:2',
      'last_name' => 'required| min:2',
      'seller_address' => 'required',
    ]);

    $user = User::with('seller')->findorFail($id);
    $seller = $user->seller;

    $user->update([

      'first_name' => $request->first_name,
      'last_name' => $request->last_name,
      'seller_address' => $request->seller_address,
    ]);

    $seller->update([
      'shop_name' => $request->shop_name,
      'shop_address' => $request->shop_address,
      'motto' => $request->motto
    ]);

    // return response()->json(['message' => 'Update success']);
    return redirect()->route('admin.view-seller', $id)->with('message', 'Updating ' . $seller->shop_name . ' success');
    // dd($id, $request->all());
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }

  public function destroySellerData(string $id)
  {
    DB::beginTransaction();

    try {
      $user = User::with('seller')->findOrFail($id);
      $seller = $user->seller;

      if ($user && $seller) {
        $filePath = $seller->proof_of_membership_path;
        Storage::disk('public')->delete($filePath);
        $seller->delete();
        $user->delete();

        DB::commit();

        return redirect()->route('admin.sellers')->with([
          'message' => 'Seller deleted successfully!',
          'status' => 'success',
        ]);
      } else {
        DB::rollBack();
        return redirect()->route('admin.sellers')->with([
          'message' => 'Seller not found/Deletion DB Error!',
          'status' => 'error',
        ]);
      }
    } catch (\Exception $e) {
      DB::rollBack();

      return redirect()->route('admin.sellers')->with([
        'message' => 'Failed to delete seller',
        'status' => 'error',
      ]);
    }
  }


  public function viewSellerData(Request $request)
  {
    $seller = User::with('seller')
      ->where('id', $request->id)
      ->where('is_seller', true)
      ->firstOrFail();
    // dd($seller->seller->proof_of_membership_path);
    // Transform the fetched data using SellerResource
    $sellerResource = new SellerDataResource($seller);


    // Return the view using Inertia with the transformed seller data
    return Inertia::render('Admin/ViewSellersData', [
      'seller' => $sellerResource->toArray($request), // Flatten the resource data
    ]);
  }
}
