<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
  public function getRatePage(string $orderId)
  {
    $authId = Auth::id();
    $order = OrderItem::where('order_item_id', $orderId)
      ->with('images', 'order')
      ->first();
    if ($order->order->user_id !== $authId) {
      return abort(403, 'You are not authorized to this page, contact dev');
    } else {
      return Inertia::render('Shop/WriteReview', [
        'item' =>  new ItemResource($order)
      ]);
    }
  }

  public function createReview(Request $request)
  {
    dd($request->all());
    return;
  }
}
