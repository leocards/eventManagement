<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "first_name" => "Super",
            "last_name" => "Admin",
            "birthday" => "2001/02/02",
            "email" => "super.admin@gmail.com",
            "contact" => "09999999999",
            "address" => "Panabo City",
            "position" => "Division Chief",
            "province" => "Davao del Norte",
            "gender" => "Male",
            "profile" => "/storage/profile/profile.png",
            "password" => Hash::make("12345678"), //12345678
            "status" => "Active",
            "role" => "Super Admin",
            "created_at" => now()->format('Y-m-d H:i:s'),
            "updated_at" => now()->format('Y-m-d H:i:s'),
        ]);

        User::create([
            "first_name" => "John",
            "last_name" => "Doe",
            "birthday" => "2001/02/02",
            "email" => "jd@gmail.com",
            "contact" => "09999999999",
            "address" => "Digos City",
            "position" => "Project Development Officer III",
            "province" => "Davao City",
            "gender" => "Male",
            "profile" => "/storage/profile/profile.png",
            "password" => Hash::make("12345678"), //12345678
            "status" => "Active",
            "role" => "Admin",
            "created_at" => now()->format('Y-m-d H:i:s'),
            "updated_at" => now()->format('Y-m-d H:i:s'),
        ]);

        User::create([
            "first_name" => "Anna",
            "last_name" => "Doe",
            "birthday" => "2001/02/02",
            "email" => "Anna@gmail.com",
            "contact" => "09999999999",
            "address" => "Panabo City",
            "position" => "Financial Analyst II",
            "province" => "Davao City",
            "gender" => "Female",
            "profile" => "/storage/profile/profile.png",
            "password" => Hash::make("12345678"), //12345678
            "status" => "Active",
            "role" => "Employee",
            "created_at" => now()->format('Y-m-d H:i:s'),
            "updated_at" => now()->format('Y-m-d H:i:s'),
        ]);

        User::insert([
            [
                "first_name" => "John",
                "last_name" => "Doe",
                "birthday" => "1990-05-15",
                "email" => "john.doe@gmail.com",
                "contact" => "09334566789",
                "address" => "123 Main Street",
                "position" => "Information Communication and Technology Administrator",
                "province" => "Davao City",
                "gender" => "Male",
                "profile" => "/storage/profile/profile.png",
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Alice",
                "last_name" => "Smith",
                "birthday" => "1985-08-20",
                "email" => "alice.smith@gmail.com",
                "contact" => "09736546321",
                "address" => "456 Maple Avenue",
                "position" => "Regional Training Specialist II",
                "province" => "Davao Del Norte",
                "gender" => "Female",
                "profile" => "/storage/profile/profile.png",
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Michael",
                "last_name" => "Johnson",
                "birthday" => "1982-03-10",
                "email" => "michael.johnson@gmail.com",
                "contact" => "09531236456",
                "address" => "789 Oak Street",
                "position" => "Administrative Aide IV",
                "province" => "Davao Del Sur",
                "gender" => "Male",
                "profile" => "/storage/profile/profile.png",
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Emily",
                "last_name" => "Brown",
                "birthday" => "1995-11-25",
                "email" => "emily.brown@gmail.com",
                "contact" => "09437896123",
                "address" => "101 Elm Court",
                "position" => "Systems Coordinatorr",
                "province" => "Davao Oriental",
                "gender" => "Female",
                "profile" => "/storage/profile/profile.png",
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "David",
                "last_name" => "Martinez",
                "birthday" => "1988-07-03",
                "email" => "david.martinez@gmail.com",
                "contact" => "09139876654",
                "address" => "222 Cedar Lane",
                "position" => "Social Welfare Officer III",
                "province" => "Davao Oriental",
                "gender" => "Male",
                "profile" => "/storage/profile/profile.png",
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
