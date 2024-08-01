<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
  use HasFactory;

  protected $fillable = [
    'product_name',
    'is_verified',
    'price',
    'rating',
    'quantity',
    'seller_id',
    'description',
    'category',
    'sold'
  ];

  public function seller()
  {
    return $this->belongsTo(Seller::class, 'seller_id');
  }


  public function images()
  {
    return $this->hasMany(ProductsImages::class, 'product_id');
  }

  public function cartItem()
  {
    return $this->hasMany(CartItem::class);
  }
}
