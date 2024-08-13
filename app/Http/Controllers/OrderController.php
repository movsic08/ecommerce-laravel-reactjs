<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseDetailsResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

  public function cancelOrder(Request $request)
  {

    $request->validate([
      'orderId' => 'required|exists:order_items,id',
      "selected_reason" => "required",
      "other_reason" => 'nullable|string|min:2'
    ]);

    DB::beginTransaction();

    try {
      $order = OrderItem::where('id', $request->orderId)->first();

      if ($request->selected_reason == 'others') {
        $order->update([
          "is_cancelled" => 1,
          'status' => 'cancelled',
          'cancelled_reason' =>  $request->other_reason
        ]);
      } else {
        $order->update([
          "is_cancelled" => 1,
          'status' => 'cancelled',
          'cancelled_reason' =>  $request->selected_reason
        ]);
      }


      DB::commit();
      return to_route('user.myPurchases')->with([
        'status' => 'success',
        'message' => 'Order Cancelled Successfully'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return to_route('user.myPurchases')->with([
        'status' => 'error',
        'message' => 'Cancelling order, failed!. ' . $e->getMessage()
      ]);
    }
  }

  public function showCancelOrder(string $orderId)
  {
    return Inertia::render('Shop/CancelOrder', [
      'id' => $orderId
    ]);
  }
}
