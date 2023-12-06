<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\LiveKitController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\SystemMessageController;
use App\Models\Member;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::prefix('backend')->middleware(['auth'])->group(function(){
    
    Route::get('/', function () {
        $server = Member::where('user_id',Auth::id())->first();
        if(!$server){
            return redirect(route('setup'));
        }else{
            return redirect(route('server.index',['server_id'=>$server->server_id]));
        }
        
    })->name('home');

    Route::get('/setup', function () {
        return Inertia::render('SetUp');
    })->name('setup');

    
    Route::prefix('sys_message')->name('sys_message.')->group(function(){
        Route::get('/', [SystemMessageController::class, 'index'])->name('index');
        Route::post('/store', [SystemMessageController::class, 'store'])->name('store');
    });

    Route::prefix('server')->name('server.')->group(function(){
        Route::prefix('/{server_id}')->group(function(){
            Route::get('/', [ServerController::class, 'index'])->name('index');
            Route::prefix('channel')->name('channel.')->group(function(){
                Route::prefix('/{channel_id}')->group(function(){
                    Route::get('/', [ChannelController::class, 'index'])->name('index');
                    Route::prefix('message')->name('message.')->group(function(){
                        Route::post('destroy/{message_id}', [MessageController::class, 'destroy'])->name('destroy');
                        Route::post('update', [MessageController::class, 'update'])->name('update');
                        Route::post('store', [MessageController::class, 'store'])->name('store');
                        Route::get('/', [MessageController::class, 'index'])->name('index');
                    });
                });
                Route::post('store', [ChannelController::class, 'store'])->name('store');
                Route::post('update', [ChannelController::class, 'update'])->name('update');
                Route::post('destroy', [ChannelController::class, 'destroy'])->name('destroy');


                

            });

            Route::post('initiate', [ConversationController::class, 'initiate'])->name('conversation.initiate');
            Route::prefix('conversation/{conversation_id}')->name('conversation.')->group(function(){
                Route::get('/', [ConversationController::class, 'index'])->name('index');
                Route::post('store', [ConversationController::class, 'store'])->name('store');
                Route::post('update', [ConversationController::class, 'update'])->name('update');
                Route::post('destroy/{direct_message_id}', [ConversationController::class, 'destroy'])->name('destroy');
                Route::get('show', [ConversationController::class, 'show'])->name('show');
            });
        });
        Route::get('invite/{invite_code}', [ServerController::class, 'invite'])->name('invite');
        Route::post('leave', [ServerController::class, 'leave'])->name('leave');
        Route::post('store', [ServerController::class, 'store'])->name('store');
        Route::post('update', [ServerController::class, 'update'])->name('update');
        Route::post('generate', [ServerController::class, 'generate'])->name('generate');
        Route::post('destroy', [ServerController::class, 'destroy'])->name('destroy');

        

    });

    Route::prefix('member')->name('member.')->group(function(){
        Route::post('/role_change', [MemberController::class, 'role_change'])->name('role_change');
        Route::post('/kick', [MemberController::class, 'kick'])->name('kick');
    });

    

    
    
    
});

Route::prefix('livekit')->name('livekit.')->group(function(){
    Route::get('/generate/{chat_id}',[LiveKitController::class,'generate'])->name('generate');
});



Route::get('/', function(){
    return Inertia::render('Landing');
})->name('landing');
Route::post('/enter', [SupportController::class, 'enter'])->name('support.enter');
Route::get('/close_case', [SupportController::class, 'close_case'])->name('support.close');
Route::post('/feedback', [SupportController::class, 'feedback'])->name('support.feedback');
Route::get('/enter', function(){
    if(Auth::check()) Auth::logout();
    return redirect()->to(route('landing'));
});


Route::middleware(['auth'])->prefix('support')->name('support.')->group(function(){
    Route::post('/message-store', [SupportController::class, 'message_store'])->name('message_store');
});

Route::get('/phpinfo', function(){
    phpinfo();
});

require __DIR__.'/auth.php';
