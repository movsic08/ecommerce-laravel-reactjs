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
    $query = Products::query();
    $products = $query->paginate(5)->onEachSide(1);

    // return  $products;
    return Inertia::render('Shop/Shop', [
      'products' => $products,
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
}
