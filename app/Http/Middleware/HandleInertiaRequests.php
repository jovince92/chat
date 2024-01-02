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
        $rs = SystemMenu::where('system_type', 0)->get();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'app_name' => config('app.name'),
            'replies' => $rs->pluck('name')->toArray(),
            'servers' => Auth::check() ? $request->user()->servers : [],
            'system_message' => SystemMessage::with(['menus', 'menus.replies'])->where('system_type', 0)->get(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            //

        ];
    }
}
