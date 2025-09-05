<?php

namespace App\Providers;

use App\Services\DatafinityService;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(DatafinityService::class, function () {
            return new DatafinityService(config('services.datafinity.secret'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureModels();

        $this->configureDatabase();

        $this->configureHttp();

        $this->configureRateLimiting();

        $this->configurePasswords();
    }


    public function configureModels(): void
    {
        Model::automaticallyEagerLoadRelationships();
    }

    public function configureDatabase(): void
    {
        DB::prohibitDestructiveCommands($this->app->isProduction());
    }

    public function configureHttp(): void
    {
        Http::preventStrayRequests($this->app->runningUnitTests());
    }

    public function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(1000)->by($request->user()?->id ?: $request->ip());
        });
    }

    private function configurePasswords(): void
    {
        if (! $this->app->isProduction()) {
            Password::defaults();

            return;
        }

        Password::defaults(function () {
            return Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised();
        });
    }
}
