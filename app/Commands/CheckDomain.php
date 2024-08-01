<?php

namespace App\Commands;

use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;

use function Laravel\Prompts\outro;

class CheckDomain extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-domain {domain}';

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
        $domain = $this->argument('domain');

        $this->info("Checking domain: $domain");

        $cmd = "whois $domain";

        $this->info("Running command: $cmd");

        $proccess = exec($cmd);

        dd($proccess);

        $this->info("Domain is available: " . ($this->isDomainAvailable($domain) ? 'true' : 'false'));

        $this->info("Domain is registered: " . ($this->isDomainRegistered($domain) ? 'true' : 'false'));

        outro("Done!");
    }

    /**
     * Define the command's schedule.
     */
    public function schedule(Schedule $schedule): void
    {
        // $schedule->command(static::class)->everyMinute();
    }
}
