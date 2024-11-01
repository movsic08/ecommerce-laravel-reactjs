<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use DB;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function createMessage(Request $request)
    {
        $request->validate([
            'message' => 'required'
        ]);
        try {

            DB::beginTransaction();
            $conversation = Conversation::create([
                'user_id1' => $request->seller_id,
                'user_id2' => Auth()->id()
            ]);

            Message::create([
                'message' => $request->message,
                'sender_id' => Auth()->id(),
                'receiver_id' => $request->seller_id,
                'conversation_id' => $conversation->id
            ]);

            DB::commit();

            return redirect()->back()->with([
                'status' => 'success',
                'message' => 'Message sent!'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with([
                'status' => 'error',
                'message' => 'Error ' . $e->getMessage()
            ]);
        }


    }
}
