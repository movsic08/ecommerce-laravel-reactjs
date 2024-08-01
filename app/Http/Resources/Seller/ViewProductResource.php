<?php

namespace App\Http\Resources\Seller;

use App\Http\Resources\SellerProductImageResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ViewProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public static $wrap = false;
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'is_verified' => $this->is_verified,
      'price' => $this->price,
      'rating' => $this->rating,
      'quantity' => $this->quantity,
      'seller_id' => $this->seller_id,
      'category' => $this->category,
      'sold' => $this->sold,
      'product_name' => $this->product_name,
      'description' => $this->description,
      'images' => SellerProductImageResource::collection($this->whenLoaded('images')),
    ];
  }
}
