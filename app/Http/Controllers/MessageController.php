<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function createMessage(Request $request)
    {
        $request->validate([
            'message' => 'required'
        ]);
        try {

            DB::beginTransaction();
            $conversation = Conversation::firstOrCreate([
                'user_id1' => $request->seller_id,
                'user_id2' => Auth()->id()
            ]);

            $message = Message::create([
                'message' => $request->message,
                'sender_id' => Auth()->id(),
                'receiver_id' => $request->seller_id,
                'conversation_id' => $conversation->id
            ]);

            $conversation->update([
                'last_message_id' => $message->id,
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

    public function messagesIndex()
    {
        $conversations = Conversation::with(['lastMessage', 'user1'])
            ->where('user_id1', Auth::id())
            ->orWhere('user_id2', Auth::id())
            ->get();


        return Inertia::render('User/Messages', [
            'conversations' => $conversations
        ]);
    }

    public function retrieveConvo(Request $request)
    {
        $messages = Message::where('conversation_id', $request->convoId)
            ->get();
        return response()->json([
            'message' => 'Message retrieve',
            'messages' => $messages
        ], 200);
    }
}
