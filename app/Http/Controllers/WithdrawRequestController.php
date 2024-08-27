<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use App\Models\WithdrawRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WithdrawRequestController extends Controller
{
  public function requestPayoutForm()
  {
    $user = auth()->user();
    $seller = Seller::where('user_id', $user->id)->with('wallet')->firstOrFail();

    $wallet = $seller->wallet;

    return Inertia::render('Seller/WithdrawalRequestForm', [
      'balance' => $wallet->balance
    ]);
  }

  public function createWithdraw(Request $request)
  {

    $user = auth()->user();
    $seller = Seller::where('user_id', $user->id)->with('wallet')->firstOrFail();

    $wallet = $seller->wallet;

    $request->validate([
      'amount' => 'integer|min:10|max:' . $wallet->balance,
    ]);

    try {
      DB::beginTransaction();

      WithdrawRequest::create([
        'seller_id' => $seller->id,
        'amount' => $request->amount,
        'status' => 'pending',
      ]);

      $wallet->decrement('balance', $request->amount);
      DB::commit();

      return redirect()->route('seller.finance')->with([
        'status' => 'success',
        'message' => 'Request withdrawal success.'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->route('seller.request.withdraw')->with([
        'status' => 'error',
        'message' => 'An error occurred during the withdrawal process.' . $e->getMessage(),
      ]);
    }
  }

  public function index()
  {
    $requestsLists = WithdrawRequest::with('sellerData', 'sellerData.user')->orderBy('created_at')->get();

    return Inertia::render('Admin/WidthdrawalRequest', [
      'requestsLists' => $requestsLists
    ]);
  }




  // endline
}
