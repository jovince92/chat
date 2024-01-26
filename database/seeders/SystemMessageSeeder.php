<?php

namespace Database\Seeders;

use App\Models\SystemMessage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemMessage::create([
            'id'=>1,
            'message'=>'Hello! Welcome to Chat Support. What can we do for you?'
        ]);
    }
}
