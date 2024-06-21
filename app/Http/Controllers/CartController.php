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
}
