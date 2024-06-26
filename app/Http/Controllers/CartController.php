<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
  public function currentCartList()
  {
    $currentUserId = Auth::id();
    $cartsItem = CartItem::where('user_id', $currentUserId)->get();
    return Inertia::render('User/Cart', [
      'cartsItem' => $cartsItem
    ]);
  }

  public function addToCart(Request $request)
  {
    $request->validate([
      'product_id' => 'required|exists:products,id',
      'quantity' => 'required|integer|min:1'
    ]);

    try {
      $cartItem = CartItem::create([
        'product_id' => $request->product_id,
        'quantity' => $request->quantity,
        'user_id' => auth()->id()
      ]);
      return response()->json([
        'message' => 'Item added to cart successfully!', 200
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Something went wrong!', 500
      ]);
    };




    // return dd(
    //   $request->product_id,
    //   'this is the quantity: ' . $request->quantity
    // );
  }
}
