<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
  public function currentCartList(Request $request)
  {
    $currentUser = $request->user();
    $cartsItem = CartItem::where('user_id', $currentUser->id)
      ->with('product')
      ->get();
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
      CartItem::create([
        'product_id' => $request->product_id,
        'quantity' => $request->quantity,
        'user_id' => auth()->id()
      ]);

      // dd('quantity' . $request->quantity);
      return back()->with('message', 'Item added successfully!');
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Something went wrong!', 500
      ]);
    };
  }
}
