<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;
  protected $fillable = [
    'user_id', 'order_id', 'name', 'address', 'total', 'payment_option'
  ];

  public function items()
  {
    return $this->hasMany(OrderItem::class);
  }
}
