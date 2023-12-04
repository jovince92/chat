<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Channel;
use App\Models\Member;
use App\Models\Server;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        
        User::factory()->create([
            'id'=>1,
            'name' => 'admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('admin'),
        ]);
        
        


        User::factory()->create([
            'name' => 'Vince',
            'email' => 'vince',
            'password' => bcrypt('vince'),
        ]);

        User::factory()->create([
            'name' => 'HHH',
            'email' => 'hhh',
            'password' => bcrypt('123'),
        ]);

        Server::create([
            'user_id'=>1,
            'name'=>'Main',
            'image'=>'https://plus.unsplash.com/premium_photo-1701207039025-93b5c78b8d60',
            'invite_code'=>'12345'
        ]);

        Member::create([
            'user_id'=>1,
            'server_id'=>1,
            'member_role'=>'ADMIN'
        ]);

        Channel::create([
            'server_id'=>1,
            'name'=>'general',
            'type'=>'text',
            'user_id'=>1
        ]);

    }
}
