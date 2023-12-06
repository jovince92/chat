<?php

namespace App\Http\Controllers;

use App\Models\SystemMessage;
use App\Models\SystemMenu;
use Illuminate\Http\Request;

class SystemMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SystemMessage::with(['menus', 'menus.replies'])->get();
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
        $newSysMessage = SystemMessage::updateOrCreate([
            'id'=>1,
        ],[
            'sys_menu_id' => null,
            'message' => $request->initial_message
        ]);

        foreach ($request->menus as $menu) {
            $newReply = SystemMessage::updateOrCreate([
                'id' => $menu['reply_id']
            ],[
                'sys_menu_id' => null,
                'message' => $menu['reply']
            ]);

            SystemMenu::updateOrCreate([
                'sys_message_id' => $menu['id']
            ],[
                'sys_message_id' => $newSysMessage->id,
                'sys_message_reply_id' => $newReply->id,
                'name' => $menu['name']
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SystemMessage $systemMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SystemMessage $systemMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SystemMessage $systemMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SystemMessage $systemMessage)
    {
        //
    }
}