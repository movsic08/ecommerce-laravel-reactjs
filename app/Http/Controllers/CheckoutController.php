<?php

namespace App\Http\Controllers;

use App\Http\Resources\SellerProductImageResource;
use App\Http\Resources\SellerProductList;
use App\Http\Resources\ShopProductResource;
use App\Models\Products;
use Illuminate\Http\Request;
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
    dd($request->all());
  }
}
