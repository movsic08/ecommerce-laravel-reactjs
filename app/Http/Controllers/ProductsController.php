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

    // return  $products;
    return Inertia::render('Shop/Shop', [
      'products' => $products,
      'queryParams' => request()->query() ?: null
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
