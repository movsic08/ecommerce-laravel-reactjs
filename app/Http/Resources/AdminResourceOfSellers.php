<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResourceOfSellers extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->first_name . ' ' . $this->last_name,
      'email' => $this->email,
      'address' => $this->address,
      'seller_id' => $this->seller_id,
      'created_at' => Carbon::parse($this->created_at)->format('M d, Y'),
    ];
  }
}
