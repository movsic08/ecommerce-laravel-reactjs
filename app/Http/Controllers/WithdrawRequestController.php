<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WithdrawRequestController extends Controller
{
  public function requestPayoutForm()
  {
    $user = auth()->user();
    $seller = Seller::where('user_id', $user->id)->with('wallet')->firstOrFail();

    $wallet = $seller->wallet;

    $walletTransactions = $wallet->walletTransactions;
    return Inertia::render('Seller/WithdrawalRequestForm', [
      'balance' => $wallet->balance
    ]);
  }
}
