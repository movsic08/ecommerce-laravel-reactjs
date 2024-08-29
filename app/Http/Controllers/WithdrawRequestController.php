<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use App\Models\SellersWallets;
use App\Models\SellersWalletTransaction;
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
      'payment_method' => 'required|in:gcash,maya',
      'account_name' => 'required|string',
      'account_number' => 'required|string',
    ]);

    try {
      DB::beginTransaction();

      WithdrawRequest::create([
        'seller_id' => $seller->id,
        'amount' => $request->amount,
        'status' => 'pending',
        'payment_method' => $request->payment_method,
        'account_name' => $request->account_name,
        'account_number' => $request->account_number,
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
    $requestsLists = WithdrawRequest::with('sellerData', 'sellerData.user')->orderBy('updated_at', 'desc')->get();

    return Inertia::render('Admin/WithdrawalRequests', [
      'requestsLists' => $requestsLists
    ]);
  }

  public function updateRequest($id, $status, $amount)
  {
    try {
      DB::beginTransaction();
      $request = WithdrawRequest::findOrFail($id);
      $request->update([
        'status' => $status
      ]);

      $sellers_wallet = SellersWallets::where('seller_id', $request->seller_id)->first();
      if ($status == 'rejected') {

        $sellers_wallet->increment('balance', $amount);

        SellersWalletTransaction::create([
          'wallet_id' => $sellers_wallet->id,
          'type' => 'withdraw_revert',
          'amount' => $amount,
          'reference_number' => $this->generateWalletTransactionReference()
        ]);
      } else {
        SellersWalletTransaction::create([
          'wallet_id' => $sellers_wallet->id,
          'type' => 'withdrawal',
          'amount' => $amount,
          'reference_number' => $this->generateWalletTransactionReference()
        ]);
      }

      DB::commit();
      return to_route('widthdrawal.request.index')->with([
        'status' => 'success',
        'message' => $status == 'rejected' ? 'Withdraw request rejected ' : 'Payment Confirmation sent!'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return to_route('widthdrawal.request.index')->with([
        'status' => 'error',
        'message' => $e->getMessage()
      ]);
    }
  }



  private function generateWalletTransactionReference($prefix = 'WLT')
  {
    $timestamp = now()->format('YmdHis'); // Current timestamp in YmdHis format
    $randomNumber = mt_rand(1000, 9999);  // Random 4-digit number

    return $prefix . $timestamp . $randomNumber;
  }
  // endline
}
