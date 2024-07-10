<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminResourceOfSellers;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
          'message' => 'Seller not found, DB Error!',
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
      ->first();

    return Inertia::render('Admin/ViewSellersData', [
      'seller' => $seller
    ]);
  }
}
