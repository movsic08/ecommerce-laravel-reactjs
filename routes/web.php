<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\NotVerfiedSeller;
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
})->middleware(['auth', 'user'])->name('dashboard');

Route::get('/shop', [ProductsController::class, 'allProducts'])->middleware(['auth'])->name('shop');

Route::get('/messages', function () {
  return Inertia::render('User/UserMessages');
})->middleware(['auth'])->name('user-messages');
Route::get('/cart', [CartController::class, 'currentCartList'])->middleware(['auth'])->name('user-cart');


Route::get('/shop/product={productid}', [ProductsController::class, 'viewProduct'])->middleware(['auth'])->name('view-product');
Route::post('/store-to-cart', [CartController::class, 'addToCart'])->middleware(['auth'])->name('store-to-cart');
Route::get('/cart-count', [CartController::class, 'cartCount'])->middleware('auth');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->middleware('auth')->name('cartItem.destroy');

//unverified seller account
Route::get('/created-success-pending', function () {
  return Inertia::render('StatusPages/SuccessSellerAccount');
})->name('seller.created.success');
Route::get('/seller-account-on-the-process', function () {
  return Inertia::render('StatusPages/PendingSellerAccount');
})->middleware(NotVerfiedSeller::class)
  ->name('seller.pending.account');

//seller pages
Route::get('/seller/home', function () {
  return Inertia::render('Seller/Index');
})->middleware(['auth', 'seller'])
  ->name('seller.index');

//FOR TESTING
Route::get('/test', function () {
  return Inertia::render('Admin/Index');
});




// Admin
Route::prefix('admin')->middleware('admin', 'auth')->group(function () {

  Route::get('/index', function () {
    return Inertia::render('Admin/Index');
  })->name('admin.index');

  Route::get('/sellers-list', [AdminController::class, 'index'])->name('admin.sellers');

  Route::get('/users-list', [AdminController::class, 'indexUsers'])->name('admin.users');

  Route::get('/permission', function () {
    return Inertia::render('Admin/PermissionPanel');
  })->name('admin.permission');

  Route::get('/view-seller/{id}', [AdminController::class, 'viewSellerData'])->name('admin.view-seller');
  Route::put('/view-seller/{id}', [AdminController::class, 'updateSeller'])->name('admin.update-seller');
  Route::delete('/view-seller/{id}', [AdminController::class, 'destroySellerData'])->name('admin.destroy.sellerdata');
  Route::put('/view-seller-status/{id}', [AdminController::class, 'updateSellerStatus'])->name('admin.update.seller.status');
});



Route::get('/about', function () {
  return Inertia::render('About');
})->middleware(['auth'])->name('about');



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
