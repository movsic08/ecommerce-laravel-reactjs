<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id', 'product_id', 'quantity', 'price', 'shop_name', 'product_name', 'category'
  ];

  public function order()
  {
    return $this->belongsTo(Order::class);
  }
}
