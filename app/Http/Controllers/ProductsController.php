<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Products;
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
}
