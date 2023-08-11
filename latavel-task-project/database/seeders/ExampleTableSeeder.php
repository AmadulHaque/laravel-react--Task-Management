<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ExampleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create();
        for ($i=1; $i <=10; $i++) {
            Task::create([
                'task_url' => $faker->url,
                'status' => 0,
            ]);
        }
    }
}
