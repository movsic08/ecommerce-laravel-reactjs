<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function index()
  {
    $purchases = Order::with('items')->where('user_id', auth()->id())->get();
    return Inertia::render('Shop/MyPurchases', [
      'purchases' => $purchases
    ]);
  }

  public function orderDetails(string $orderId)
  {
    return Inertia::render('Shop/OrderDetails');
  }
}
