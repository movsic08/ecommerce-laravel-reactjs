<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
  public function show(Request $request)
  {
    $product = Products::where('id', $request->product_id)->first();
    $quantity = $request->item_quantity;
    return Inertia::render('Shop/Checkout', [
      'product' => $product,
      'quantity' => $quantity
    ]);
  }

  public function store(Request $request)
  {
  }
}
