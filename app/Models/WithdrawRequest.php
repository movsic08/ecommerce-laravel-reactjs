<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawRequest extends Model
{
  use HasFactory;

  protected $fillable = [
    'seller_id',
    'amount',
    'status',
    'created_at',
    'updated_at'
  ];

  public function sellerRequest()
  {
    $this->belongsTo(Seller::class);
  }
}
