<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function role_change(Request $request)
    {
        $member = Member::where('user_id', $request->user_id)->where('server_id', $request->server_id)->first();
        $member->update([
            'member_role' => $request->role
        ]);
    }

    public function kick(Request $request)
    {
        $member = Member::where('user_id', $request->user_id)->where('server_id', $request->server_id)->first();
        $member->delete();
    }

    public function register(Request $request)
    {
        if ($request->password == $request->password_confirmation) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            Member::create([
                'user_id' => $user->id,
                'server_id' => 1,
                'member_role' => "ADMIN",
            ]);
        }
    }
}
