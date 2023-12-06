<?php

namespace App\Listeners;

use App\Events\CloseCaseEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CloseCaseListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CloseCaseEvent $event): void
    {
        //
    }
}
