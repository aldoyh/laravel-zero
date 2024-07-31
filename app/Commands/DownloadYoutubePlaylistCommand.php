<?php

namespace App\Commands;

use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;

use function Termwind\render;

class DownloadYoutubePlaylistCommand extends Command
{
    /**
     * The signature of the command.
     *
     * @var string
     */
    protected $signature = 'yt:playlist';

    /**
     * The description of the command.
     *
     * @var string
     */
    protected $description = 'Download a youtube playlist';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Downloading youtube playlist');

        render(<<<'HTML'
            <div class="py-1 ml-2">
                <div class="px-1 bg-blue-500 text-black">Adhari CLI ⛵️</div>
                <em class="ml-1">
                  when few letters make HUGE impact 🚀
                </em>
            </div>
        HTML);
    }

    /**
     * Define the command's schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    public function schedule(Schedule $schedule): void
    {
        // $schedule->command(static::class)->everyMinute();
    }
}
