<?php

namespace App\Http\Controllers;

use App\Http\Resources\Seller\ViewProductResource;
use App\Http\Resources\SellerProductImageResource;
use App\Http\Resources\SellerProductList;
use App\Http\Resources\ShopProductResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CheckoutController extends Controller
{
  public function show(Request $request)
  {

    $products = [];
    foreach ($request->items as $item) {
      $product = Products::with('seller')
        ->with('images')
        ->where('id', $item['product_id'])
        ->first();


      if ($product) {
        $products[] = [
          'product' => new ShopProductResource($product),
          'seller' => $product->seller,
          'images' => SellerProductImageResource::collection($product->images),
          'buying_quantity' => $item['item_quantity']
        ];
      }
    }

    // dd(new SellerProductList($product));
    return Inertia::render('Shop/Checkout', [
      'products' => $products,
    ]);
  }

  public function store(Request $request)
  {

    $validated = $request->validate([
      'name' => 'required|string',
      'phone_no' => 'required|string',
      'address' => 'required|string',
      'total' => 'required|numeric',
      'payment_method' => 'required|string|in:cod, gcash',
      'items' => 'required|array',
      'items.*.product_id' => 'required|integer',
      'items.*.quantity' => 'required|integer',
      'items.*.price' => 'required|numeric',
      'items.*.shop_name' => 'required|string',
      'items.*.seller_id' => 'required|integer',
      'items.*.product_name' => 'required|string',
      'items.*.category' => 'required|string',
    ]);

    DB::beginTransaction();

    try {
      do {
        $generated_order_id = 'MBH' . strtoupper(Str::random(3)) . Str::random(4) . strtoupper(Str::random(4)) . Str::random(3);
        $generated_order_item_id = 'MBH' . strtoupper(Str::random(1)) . Str::random(2) . strtoupper(Str::random(1)) . Str::random(2);
      } while (
        Order::where('order_id', $generated_order_id)->exists() ||
        OrderItem::where('order_item_id', $generated_order_item_id)->exist()
      );

      $order = Order::create([
        'user_id' => auth()->id(),
        'order_id' => $generated_order_id,
        'name' => $request->name,
        'phone_no' => $request->phone_no,
        'address' => $request->address,
        'total' => $request->total,
        'payment_option' => $request->payment_method
      ]);


      foreach ($request->items as $item) {
        OrderItem::create([
          'order_id' => $order->id,
          'product_id' => $item['product_id'],
          'quantity' => $item['quantity'],
          'price' => $item['price'],
          'seller_id' => $item['seller_id'],
          'shop_name' => $item['shop_name'],
          'status' => 'pending',
          'product_name' => $item['product_name'],
          'category' => $item['category'],
          'amount' => $item['quantity'] * $item['price'],
          'delivery_address' => $request->address,

        ]);
      }


      DB::commit();

      return to_route('checkout.success', $generated_order_id)->with([
        'status' => 'success',
        'message' => 'Orde Placed Successfully'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Failed: ' . $e->getMessage());
      return to_route('checkout.show')->with([
        'status' => 'error',
        'message' => 'Order placement failed' . $e->getMessage()
      ]);
      // return response()->json(['message' => 'Order placement failed' . $e->getMessage()], 500);
    }
  }

  public function successPage(string $orderId)
  {
    $order = Order::where('order_id', $orderId)->with('items')->firstOrFail();
    $categoriesFromOrder = $order->items->pluck('category')->unique();
    $products = Products::with('images')->whereIn('category', $categoriesFromOrder)->limit(10)->get();

    return Inertia::render('Shop/Status/Success', [
      'orderId' => $orderId,
      'products' => ViewProductResource::collection($products)
    ]);
  }









  //end
}
