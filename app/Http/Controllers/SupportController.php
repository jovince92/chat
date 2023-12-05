<?php

namespace App\Http\Controllers;

use App\Events\NewChatMessageEvent;
use App\Events\NewCustomerEvent;
use App\Models\Channel;
use App\Models\Message;
use App\Models\SystemMessage;
use App\Models\User;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function enter(Request $request){
        $faker = Factory::create();
        if(Auth::check()) Auth::logout();

        $user=User::updateOrCreate([
            'email'=>$request->email
        ],[
            'name'=>$request->name,
            'password'=>bcrypt('password')
        ]);
        $channel=Channel::updateOrCreate(['user_id'=>$user->id,],
        [
            'user_id'=>$user->id,
            'server_id'=>1,
            'name'=>$request->name,
            'type'=>'TEXT'
        ]);
        broadcast(new NewCustomerEvent($channel,$user));

        Auth::login($user);

        $new_msg=Message::create([
            'user_id'=>1,
            'channel_id'=>$channel->id,
            'content'=>SystemMessage::find(1)->message ??  'Hi! How Can We Help You?',
        ]);

        broadcast(new NewChatMessageEvent($new_msg->load(['user'])));

        return Inertia::render('Landing',[
            'channel'=>$channel,
            'user'=>$user
        ]);

    }
    public function message_store(Request $request){
        $request->validate([
            'image' => 'mimes:jpeg,png,jpg,webp,pdf'
        ]);
        $new_msg=Message::create([
            'user_id'=>$request->user()->id,
            'channel_id'=>$request->channel_id,
            'content'=>$request->message??"",
        ]);

        $image = $request->file('image') ;
        if($image){
            $image_name=$new_msg->id.'_'.$image->getClientOriginalName();
            $location='uploads/chat_images/server_'.strval($request->channel_id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_image = $location.$image_name;
            $request->file('image')->move($path, $new_image);
            $new_msg->update([
                'file'=>$new_image
            ]);
        }


        broadcast(new NewChatMessageEvent($new_msg->load(['user'])));
    }
}
