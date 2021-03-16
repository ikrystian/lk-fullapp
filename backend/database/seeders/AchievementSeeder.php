<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('achievement')->insert([
            [
                'name' => 'weight',
                'achievement_group_id' => 1,
                'condition' => 'larger_than',
                'value' => 10000],
        ]);
    }
}
