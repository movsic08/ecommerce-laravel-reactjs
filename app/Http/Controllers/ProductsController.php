<?php

namespace App\Http\Controllers;

use App\Http\Resources\Seller\ViewProductResource;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\ProductsImages;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class ProductsController extends Controller
{
  public function allProducts()
  {
    $query = Products::query();
    if (request('name')) {
      $query->where('product_name', 'like', '%' . request('name') . '%');
    }
    switch (request('filterProducts')) {
      case  'filterProducts':
        $query->orderBy('created_at', 'asc');
        break;

      case 'top-selling':
        $query->orderBy('sold', 'desc');
        break;

      case 'highest-rating':
        $query->orderBy('rating', 'desc');
        break;
    }

    $products = $query->paginate(15);
    $categories = Category::all();

    // return  $products;
    return Inertia::render('Shop/Shop', [
      'products' => $products,
      'queryParams' => request()->query() ?: null,
      'categories' => $categories
    ]);
  }


  public function viewProduct($productid)
  {
    try {
      $product = Products::findOrFail($productid);
      return Inertia::render('Shop/ViewProduct', [
        'product' => $product
      ]);
    } catch (ModelNotFoundException $e) {
      return response()->json(['message' => 'Product not found.']);
    }
  }

  public function sellerViewEditProduct(int $id)
  {
    $product = Products::with('images')->findOrFail($id);

    return Inertia::render('Seller/Partials/ViewEditProduct', [
      'product' => new ViewProductResource($product)
    ]);
  }

  public function update(Request $request)
  {
    $request->validate([
      'product_name' => 'required|min:2|string|max:255',
      'price' => 'required|numeric|min:1',
      'quantity' => 'required|integer|min:1',
      'description' => 'required|string|min:10',
      'type' => 'required|string',
      'images' => 'required',
      'newUploadedImages.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    try {
      $product = Products::findOrFail($request->id);

      DB::beginTransaction();

      $currentImages = collect($request->images)->pluck('id');
      $product->images->whereNotIn('id', $currentImages)->each(function ($image) {
        Storage::disk('public')->delete($image->image_path);
        $image->delete();
      });

      if ($request->hasFile('newUploadedImages')) {
        foreach ($request->file('newUploadedImages') as $image) {
          $randomNumber = rand(100, 999);
          $fileExtension = $image->getClientOriginalExtension();
          $fileName = $request->product_name . '_' . $randomNumber . '.' . $fileExtension;
          $directory = 'Photos/Product_Photos';
          $path = $image->storeAs($directory, $fileName, 'public');

          ProductsImages::create([
            'product_id' => $request->id,
            'image_path' => $path
          ]);
        }
      };

      $product->update([
        'product_name' => $request->product_name,
        'price' => $request->price,
        'quantity' => $request->quantity,
        'description' => $request->description,
        'type' => $request->type,
      ]);
      DB::commit();
      return to_route('seller.view.product', $request->id)->with([
        'message' => 'Product updated sucessfully',
        'status' => 'success',
      ]);
    } catch (Exception $e) {
      DB::rollBack();
      Log::error('Failed to update the product: ', $e->getMessage());
      return to_route('seller.view.product', $request->id)->with([
        'message' => 'Failed to update the product, contact dev.',
        'status' => 'error',
      ]);
    }
  }
}
