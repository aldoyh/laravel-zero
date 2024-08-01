<?php

namespace App\Commands;

use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;

class Run extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // start a dusk test to open the browser and visit the app
        $this->info('Running Dusk test...');
        $this->call(
            'dusk:chrome-driver',
            []
        );

        // run the tests
        $this->info('Running the tests...');
        $this->call('test');

        // stop the app
        $this->info('Stopping the app...');
        $this->call('stop');

        $this->info('Done!');
    }

    /**
     * Define the command's schedule.
     */
    public function schedule(Schedule $schedule): void
    {
        $schedule->command(static::class)->everyMinute();
    }
}
