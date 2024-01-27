<?php

namespace App\Http\Controllers;

use App\Models\SystemMenu;
use App\Models\SystemMessage;
use Faker\Factory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepliesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sub_menus=SystemMenu::with(['replies', 'replies.menus'])
            ->where('system_type', 1)
            //->where('parent_id', null)
            ->get();
        return Inertia::render('Replies',[
            'sub_menus' => $sub_menus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $new = SystemMessage::create([
            'message' => null,
            'system_type' => 0,
            'parent_id' => null
        ]);
        SystemMenu::create([
            'sys_message_reply_id' => $new->id,
            'name' => 'This is a sub-menu',
            'system_type' => 1,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $input = $request->except(['user_id']);
        $reply = SystemMessage::find($input['id']);
        $reply->update($input);
    }


    public function menus_update(Request $request)
    {
        $input = $request->except(['user_id']);
        $reply = SystemMenu::find($input['id']);
        $reply->update($input);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function menus_destroy(Request $request)
    {
        $reply = SystemMenu::findOrFail($request['id']);
        $reply->delete();
    }

    public function menus_store(Request $request)
    {
        $faker = Factory::create();
        
        $new = SystemMessage::create([
            'message' => null,
            'system_type' => 0,
            'parent_id' => null
        ]);
        SystemMenu::create([
            'sys_message_id' => $request->sys_message_id,
            'sys_message_reply_id' => $new->id,
            'name' => $faker->sentence(3),
            'system_type' => 0,
        ]);
    }
}
