<?php

namespace App\Http\Controllers;

use App\Http\Resources\SellerDataResource;
use App\Http\Resources\SellerProductList;
use App\Models\Category;
use App\Models\Products;
use App\Models\ProductsImages;
use App\Models\Seller;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;


class SellerController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function products()
  {
    $seller = Seller::where('user_id', auth()->id())->first();

    $products = Products::with('images')->where('seller_id', $seller->id)->get();

    return Inertia::render('Seller/Products', [

      'products' =>  SellerProductList::collection($products)
    ]);
  }

  public function shop()
  {
    return Inertia::render('Shop/ShopProfile');
  }

  public function createSellerAccoount(Request $request)
  {
    $request->validate([
      'first_name' => ['required', 'string', 'max:255'],
      'last_name' => ['required', 'string', 'max:255'],
      'proof_of_membership_path' => ['required'],
      'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
      'phone_no' => ['required', 'digits:11', 'unique:' . User::class],
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
        'phone_no' => $request->phone_no,
        'is_seller' => true,
        'password' => Hash::make($request->password),
      ]);

      $sellerDetails = Seller::create([
        'user_id' => $user->id,
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

  public function dashboard()
  {
    return Inertia::render('Seller/Dashboard');
  }

  public function myShop()
  {
    return Inertia::render('Seller/Shop');
  }

  public function profileIndex()
  {
    $sellerData = User::with('seller')->where('id', auth()->id())->get();

    return Inertia::render('Seller/SellerProfile', [
      'seller' =>  SellerDataResource::collection($sellerData)
    ]);
  }

  public function updateSellerInformation(Request $request): RedirectResponse
  {
    $request->validate([
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email',
      'address' => 'required',
      'shop_address' => 'required',
      'phone_no' => 'required|max:11',
      'shop_name' => 'required'
    ]);

    try {
      DB::beginTransaction();

      $user = User::with('seller')->where('id', auth()->id())->firstOrFail();

      if ($request->hasFile('new_profile_picture')) {

        if ($user->profile_picture_path) {

          Storage::disk('public')->delete($user->profile_picture_path);
        }
        $randomNumber  = rand(100, 999);
        $fileExtension = $request->new_profile_picture->getClientOriginalExtension();
        $fileName = $request->first_name . $request->last_name . '_' . $randomNumber . '.' . $fileExtension;
        $directory = 'Photos/Profile_Pictures/Sellers';
        $path = $request->new_profile_picture->storeAs($directory, $fileName, 'public');


        $user->update([
          'profile_picture_path' => $path
        ]);
      }


      if ($request->hasFile('new_shop_profile')) {

        if ($user->seller->shop_picture_path) {
          Storage::disk('public')->delete($user->seller->shop_profile_path);
        }
        $randomNumber  = rand(100, 999);
        $fileExtension = $request->new_shop_profile->getClientOriginalExtension();
        $fileName = $request->shop_name . '_' . $randomNumber . '.' . $fileExtension;
        $directory = 'Photos/Profile_Pictures/Shops';
        $path = $request->new_shop_profile->storeAs($directory, $fileName, 'public');
        $user->seller->update([
          'shop_picture_path' => $path,
        ]);
      }

      $user->update([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone_no' => $request->phone_no,
        'address' => $request->address,
      ]);



      $sellerUpdated = $user->seller->update([
        'shop_address' => $request->shop_address,
        'shop_name' => $request->shop_name,
      ]);


      DB::commit();
      return to_route('seller.profile')->with([
        'status' => 'success',
        'message' => 'Update successfully'
      ]);
    } catch (Exception $e) {
      return back()->with(['message' => 'Something went wrong: ' . $e->getMessage()]);
    }
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

    return to_route('seller.profile')->with([
      'status' => 'success',
      'message' => 'Password changed successfully!'
    ]);
  }

  public function destroySellerAccount(Request $request): RedirectResponse
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

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {


    $request->validate([
      'product_name' => "required|min:2",
      'quantity' => "required|min:1|integer|gt:0",
      'description' => 'required|min:10',
      'category' => 'required',
      'images' => 'required|array|min:1',
      'images.*' => 'image',
      'price' => 'required|integer|min:1'
    ]);


    try {
      $seller = Seller::where('user_id', auth()->id())->first();
      if (!$seller) {
        return redirect()->route('seller.showAddProduct')->with([
          'message' => 'Failed referencing Seller data',
          'status' => 'error'
        ]);
      }
      DB::beginTransaction();

      $product = Products::create([
        'seller_id' => $seller->id,
        'product_name' => $request->product_name,
        'quantity' => $request->quantity,
        'description' => $request->description,
        'category' => $request->category,
        'price' => $request->price
      ]);

      foreach ($request->file('images') as $image) {
        $randomNumber = rand(100, 999);
        $fileExtension = $image->getClientOriginalExtension();
        $fileName = $request->product_name . '_' . $randomNumber . '.' . $fileExtension;
        $directory = 'Photos/Product_Photos';
        $path = $image->storeAs($directory, $fileName, 'public');

        ProductsImages::create([
          'product_id' => $product->id,
          'image_path' => $path
        ]);
      }

      DB::commit();
      return redirect()->route('seller.showAddProduct')->with([
        'message' => 'Product added succesfully',
        'status' => 'success'
      ]);
    } catch (Exception $e) {
      DB::rollBack();
      Log::error('Failed to add product error in: ' . $e->getMessage());
      return redirect()->route('seller.showAddProduct')->with([
        'message' => 'Failed to add your product. Try Again.',
        'status' => 'error'
      ]);
    }
  }

  public function showAddProduct(Request $request)
  {
    $categories = Category::all();

    return Inertia::render('Seller/Partials/AddProduct', [
      'categories' => $categories
    ]);
  }



  /**
   * Display the specified resource.
   */
  public function showShippingSetting(Seller $seller)
  {
    return Inertia::render('Seller/ShippingSetting');
  }

  public function finance()
  {
    return Inertia::render('Seller/Finance');
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
  public function destroy(int $id)
  {
    DB::beginTransaction();

    try {
      $productData = Products::with('images')->findOrFail($id);
      $imagesData = $productData->images;

      if ($productData && $imagesData) {

        foreach ($imagesData as $file) {
          Storage::disk('public')->delete($file->image_path);
        }

        $productData->images()->delete();
        $productData->delete();
        DB::commit();

        return to_route('seller.products')->with([
          'message' => 'Deletion success',
          'status' => 'success'
        ]);
      } else {
        throw new \Exception("Product or images not found.");
      }
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Failed to delete product: ' . $e->getMessage());

      return to_route('seller.products')->with([
        'message' => 'Deletion not success',
        'status' => 'error'
      ]);
    }
  }
}
