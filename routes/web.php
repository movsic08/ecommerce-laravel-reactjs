<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Models\CartItem;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return redirect()->route('login');
});
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/shop', [ProductsController::class, 'allProducts'])->middleware(['auth'])->name('shop');

Route::get('/messages', function () {
  return Inertia::render('User/UserMessages');
})->middleware(['auth'])->name('user-messages');
Route::get('/cart', [CartController::class, 'currentCartList'])->middleware(['auth'])->name('user-cart');


Route::get('/shop/product={productid}', [ProductsController::class, 'viewProduct'])->middleware(['auth'])->name('view-product');
Route::post('/store-to-cart', [CartController::class, 'addToCart'])->middleware(['auth'])->name('store-to-cart');




Route::get('/about', function () {
  return Inertia::render('About');
})->middleware(['auth'])->name('about');

Route::get('/blog', function () {
  return Inertia::render('Blog');
})->middleware(['auth'])->name('blog');

Route::get('/contact', function () {
  return Inertia::render('Contact');
})->middleware(['auth'])->name('contact');

// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
