<?php

namespace Database\Seeders;

use Database\Factories\ProductFactory;
use App\Models\Products;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    User::factory(50)->create();
    $this->call([
      CategoriesSeeder::class,
    ]);

    $this->call([
      // Other seeders...
      ProductsSeeder::class,
    ]);

    User::factory()->create([
      'first_name' => 'Admin',
      'last_name' => 'Main',
      'email' => 'admin@gmail.com',
      'address' => 'Alaminos City, Pangasinan',
      'is_admin' => true,
      'password' => Hash::make('password')
    ]);
  }
}
