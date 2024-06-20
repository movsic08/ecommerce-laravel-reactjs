<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Products;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
  public function allProducts()
  {
    $products = Products::all();

    // dd($products);
    return Inertia::render('User/Shop', [
      'products' => $products,
    ]);
  }
  public function viewProduct($productid)
  {
    try {
      $product = Products::findOrFail($productid);
      return Inertia::render('User/ViewProduct', [
        'product' => $product
      ]);
    } catch (ModelNotFoundException $e) {
      return response()->json(['message' => 'Product not found.']);
    }

  }



}
