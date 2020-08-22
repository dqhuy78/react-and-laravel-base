<?php
// phpcs:ignoreFile
// @codeCoverageIgnoreStart
namespace App\Console\Commands\GenerateCommand;

use Illuminate\Console\Command;

class OverrideMakeModelCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:model {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Override make model command';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->callSilent('create:model', ['name' => $this->argument('name')]);
        $this->callSilent('create:repository', ['name' => $this->argument('name')]);

        $this->info('Create model and repository success');
    }
}
