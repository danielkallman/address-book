<?php

use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.se',
            'password' => Hash::make('test123'),
            'role' => 2
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user@test.se',
            'password' => Hash::make('test456'),
            'role' => 1
        ]);
    }
}
