<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseDetailsResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function index()
  {
    $purchases = Order::with('items.images')->where('user_id', auth()->id())->get();
    // dump(PurchaseDetailsResource::collection($purchases));
    return Inertia::render('Shop/MyPurchases', [
      // 'purchases' => $purchases,
      'purchases' => PurchaseDetailsResource::collection($purchases)
    ]);
  }

  public function orderDetails(string $orderId)
  {
    return Inertia::render('Shop/OrderDetails');
  }
}
