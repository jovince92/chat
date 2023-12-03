<?php

namespace App\Listeners;

use App\Events\NewCustomerEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NewCustomerListener
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
    public function handle(NewCustomerEvent $event): void
    {
        //
    }
}
