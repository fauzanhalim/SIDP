<?php

use Illuminate\Database\Seeder;

use App\User;

class AllTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //path to sql file
        $sql = public_path('database/pengaturan.sql');

        //collect contents and pass to DB::unprepared
        DB::unprepared(file_get_contents($sql));

        User::insert([
            [
                'name'              => 'admin',
                'role'              => 'admin',
                'password'          => bcrypt('admin'), // secret
                'remember_token'    => str_random(10),
            ],
            [
                'name'              => 'user',
                'role'              => 'user',
                'password'          => bcrypt('user'), // secret
                'remember_token'    => str_random(10),
            ],
        ]);
    }
}
