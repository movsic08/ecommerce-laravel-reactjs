<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'seller_id',
    'address',
    'shop_name',
    'years_in_selling',
    'has_permit',
    'has_DTI',
    'has_mayors_business_permit',
    'has_paid_organizational_fee',
    'has_barangay_clearance',
    'has_bir',
    'proof_of_membership_path',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
