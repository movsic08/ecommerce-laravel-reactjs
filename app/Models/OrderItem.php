<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id', 'product_id', 'quantity', 'price', 'seller_id', 'shop_name', 'product_name', 'category', 'status', 'received_date'
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
