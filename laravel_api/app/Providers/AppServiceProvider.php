<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Validator;
use DB;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('unique_custom', function ($attribute, $value, $parameters)
        {
            // Get the parameters passed to the rule
            list($table, $field, $field2, $field2Value) = $parameters;

            return DB::table($table)->where($field, $value)->where($field2, $field2Value)->count() == 0;
        });

        Validator::extend('unique_custom_three_parameters', function ($attribute, $value, $parameters)
        {
            // Get the parameters passed to the rule
            list($table, $field, $field2, $field2Value, $field3, $field3Value) = $parameters;

            return DB::table($table)->where($field, $value)->where($field2, $field2Value)->where($field3, $field3Value)->count() == 0;
        });
        Schema::defaultStringLength(191);
    }
}
