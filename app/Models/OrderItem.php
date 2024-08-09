<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id', 'product_id', 'quantity', 'price', 'seller_id', 'shop_name', 'product_name', 'category', 'status', 'received_date', 'is_preparing', 'is_ready_for_pickup', 'is_picked_up', 'is_in_transit', 'is_out_for_delivery', 'is_delivered', 'shipment_status', 'amount', 'delivery_address', 'tracking_number', 'payment_time', 'ship_time', 'received_date',
  ];

  public function order()
  {
    return $this->belongsTo(Order::class);
  }

  public function seller()
  {
    return $this->belongsTo(Seller::class);
  }
}
