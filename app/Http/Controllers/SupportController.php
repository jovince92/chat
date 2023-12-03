<?php

namespace App\Http\Controllers;

use App\Events\NewChatMessageEvent;
use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Faker\Factory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function enter(Request $request){
        $faker = Factory::create();
        $channel=Channel::create([
            'user_id'=>1,
            'server_id'=>1,
            'name'=>$request->name,
            'type'=>'TEXT'
        ]);

        $user=User::create([
            'name'=>$request->name,
            'email'=>$faker->firstName().'_'.$faker->email(),
            'password'=>bcrypt('password')
        ]);

        return Inertia::render('Landing',[
            'channel'=>$channel,
            'user'=>$user
        ]);
    }
    public function message_store(Request $request){
        
        $new_msg=Message::create([
            'user_id'=>$request->user()->id,
            'channel_id'=>$request->channel_id,
            'content'=>$request->message??"",
        ]);


        broadcast(new NewChatMessageEvent($new_msg->load(['user'])));
    }
}
