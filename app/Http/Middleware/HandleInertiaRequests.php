<?php

namespace App\Http\Middleware;

use App\Models\SystemMenu;
use App\Models\SystemMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        //$rs = SystemMenu::where('system_type', 0)->get();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'app_name' => config('app.name'),
            'replies' => SystemMenu::where('system_type', 0)->where('sys_message_id', 1)->get(),
            'servers' => Auth::check() ? $request->user()->servers : [],
            // 'system_message' => SystemMessage::with(['menus', 'menus.replies', 'menus.replies.menus', 'menus.replies.menus.replies'])
            //     ->where('system_type', 0)
            //     ->where('parent_id', null)
            //     ->get(),
            'system_message' => SystemMessage::with(['menus'])
                ->where('system_type', 0)
                ->where('parent_id', null)
                ->get(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],


            //

        ];
    }
}
