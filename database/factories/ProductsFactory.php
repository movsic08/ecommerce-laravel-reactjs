<?php

namespace Database\Factories;

use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
  // protected $model = Products::class;

  public function definition(): array
  {
    return [
      'product_name' => $this->faker->words(3, true),
      'rating' => $this->faker->randomFloat(1, 0, 5),
      'quantity' => $this->faker->numberBetween(0, 100),
      'seller_id' => $this->faker->numberBetween(1, 20),
      'price' => $this->faker->numberBetween(0, 3000.00),
      'category_id' => \App\Models\Categories::inRandomOrder()->first()->id,
      'type' => $this->faker->randomElement(['physical', 'digital']),
    ];
  }
}
