<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('exercises')->insert([
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 1, 'reps' => 15, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 1, 'reps' => 15, 'weight' => 40],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 1, 'reps' => 10, 'weight' => 60],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 1, 'reps' => 7, 'weight' => 80],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 1, 'reps' => 8, 'weight' => 60],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 2, 'reps' => 10, 'weight' => 48],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 2, 'reps' => 10, 'weight' => 48],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 2, 'reps' => 10, 'weight' => 48],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 2, 'reps' => 10, 'weight' => 48],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 2, 'reps' => 9, 'weight' => 52],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 3, 'reps' => 10, 'weight' => 18],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 3, 'reps' => 15, 'weight' => 22],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 3, 'reps' => 10, 'weight' => 28],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 3, 'reps' => 10, 'weight' => 34],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 3, 'reps' => 8, 'weight' => 38],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 4, 'reps' => 10, 'weight' => 12],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 4, 'reps' => 10, 'weight' => 18],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 4, 'reps' => 10, 'weight' => 18],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 4, 'reps' => 12, 'weight' => 12],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 4, 'reps' => 20, 'weight' => 12],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 5, 'reps' => 15, 'weight' => 16],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 5, 'reps' => 10, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 5, 'reps' => 10, 'weight' => 24],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 5, 'reps' => 10, 'weight' => 28],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 5, 'reps' => 7, 'weight' => 34],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 6, 'reps' => 12, 'weight' => 12],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 6, 'reps' => 8, 'weight' => 16],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 6, 'reps' => 8, 'weight' => 16],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 6, 'reps' => 10, 'weight' => 16],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 6, 'reps' => 10, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 7, 'reps' => 10, 'weight' => 16],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 7, 'reps' => 8, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 7, 'reps' => 8, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 7, 'reps' => 8, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 7, 'reps' => 6, 'weight' => 24],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 8, 'reps' => 10, 'weight' => 15],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 8, 'reps' => 10, 'weight' => 15],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 8, 'reps' => 10, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 8, 'reps' => 10, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 8, 'reps' => 10, 'weight' => 20],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 9, 'reps' => 15, 'weight' => 6],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 9, 'reps' => 10, 'weight' => 8],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 9, 'reps' => 10, 'weight' => 10],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 9, 'reps' => 10, 'weight' => 10],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 9, 'reps' => 12, 'weight' => 10],
            ['training_id' => 1, 'user_id' => 1, 'exercise_types_id' => 10, 'reps' => 2, 'weight' => 40],

        ]);
    }
}
