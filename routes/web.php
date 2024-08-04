<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerController;
use App\Http\Middleware\NotVerfiedSeller;
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

//Customer pages 
Route::middleware('auth')->group(function () {

  Route::get('/home', [ProductsController::class, 'customerHome'])->name('dashboard');
  Route::get('/shop', [ProductsController::class, 'allProducts'])->name('shop');
  Route::get('/messages', function () {
    return Inertia::render('User/UserMessages');
  })->name('user-messages');
  Route::get('/shop/id', [SellerController::class, 'shop'])->name('view.seller.shop');
  Route::get('/cart', [CartController::class, 'currentCartList'])->name('user-cart');
  Route::get('/shop/product={productid}', [ProductsController::class, 'viewProduct'])->name('view-product');
  Route::post('/store-to-cart', [CartController::class, 'addToCart'])->name('store-to-cart');
  Route::get('/cart-count', [CartController::class, 'cartCount'])->middleware('auth');
  Route::delete('/cart/{id}', [CartController::class, 'destroy'])->middleware('auth')->name('cartItem.destroy');
  Route::get('/my-purchases', [OrderController::class, 'index'])->name('user.myPurchases');
  Route::post('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
  Route::post('/checkout/create', [CheckoutController::class, 'store'])->name('checkout.store');
});

//unverified seller account
Route::get('/created-success-pending', function () {
  return Inertia::render('StatusPages/SuccessSellerAccount');
})->name('seller.created.success');
Route::get('/seller-account-on-the-process', function () {
  return Inertia::render('StatusPages/PendingSellerAccount');
})->middleware(NotVerfiedSeller::class)
  ->name('seller.pending.account');



// Admin
Route::prefix('admin')->middleware('admin', 'auth')->group(function () {
  Route::get('/index', [AdminController::class, 'adminDashboard'])->name('admin.index');
  Route::get('/sellers-list', [AdminController::class, 'index'])->name('admin.sellers');
  Route::get('/users-list', [AdminController::class, 'indexUsers'])->name('admin.users');
  Route::get('/permission', [AdminController::class, 'viewAllProducts'])->name('admin.permission');
  Route::patch('permission/toggle-verification/{id}', [AdminController::class, 'toggleProductVerification'])->name('admin.permission.toggleVerification');
  Route::delete('destroy-pending-product/{id}/{name}', [AdminController::class, 'destroyPendingProduct'])->name('admin.destroy.product');
  Route::get('/view-seller/{id}', [AdminController::class, 'viewSellerData'])->name('admin.view-seller');
  Route::put('view-seller/{id}', [AdminController::class, 'updateSeller'])->name('admin.update-seller');
  Route::delete('view-seller/{id}', [AdminController::class, 'destroySellerData'])->name('admin.destroy.sellerdata');
  Route::put('/view-seller-status/{id}', [AdminController::class, 'updateSellerStatus'])->name('admin.update.seller.status');
});


//seller pages
Route::prefix('seller')->middleware('seller')->group(function () {
  Route::get('/index', function () {
    return Inertia::render('Seller/Dashboard');
  })->name('seller.dashboard');
  Route::get('/shop', function () {
    return Inertia::render('Seller/Shop');
  })->name('seller.shop');
  Route::get('/products', [SellerController::class, 'products'])->name('seller.products');
  Route::get('/add-product', [SellerController::class, 'showAddProduct'])->name('seller.showAddProduct');
  Route::post('addproduct', [SellerController::class, 'store'])->name('seller.addproduct');
  Route::delete('destroyproduct/{id}', [SellerController::class, 'destroy'])->name('seller.destroy.product');
  Route::post('/product/update', [ProductsController::class, 'update'])->name('seller.post.product');
  Route::get('/view/product/{id}', [ProductsController::class, 'sellerViewEditProduct'])->name('seller.view.product');
  Route::get('/notification', [NotificationController::class, 'index'])->name('seller.showNotification');
  Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
  Route::patch('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
  Route::patch('/notifications/{id}/mark-as-unread', [NotificationController::class, 'markAsUnread'])->name('notifications.markAsUnread');
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
