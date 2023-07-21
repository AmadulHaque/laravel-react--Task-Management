<?php

namespace App\Listeners;

use App\Events\PodcastProcessed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Mail\PostTaskMail;
use App\Models\User;

class SendPodcastNotification
{
     /**  implements ShouldQueue
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @return void
     */
    public function handle(PodcastProcessed $event)
    {
        $user = User::all();
        foreach ($user as $key => $value) {
            \Mail::to($value->email)->send(new PostTaskMail($event->data)); 
        }

    }
}
