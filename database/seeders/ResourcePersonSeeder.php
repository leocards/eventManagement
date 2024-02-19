<?php

namespace Database\Seeders;

use App\Models\ResourcePerson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResourcePersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ResourcePerson::insert(
            [
                [
                    "name" => "John Doe",
                    "position" => "Programmer",
                    "profile" => "/storage/profile/image_1705658360.jpg",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Peter Doe",
                    "position" => "Analyst",
                    "profile" => "/storage/profile/image_1705661220.jpg",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Jodi Doe",
                    "position" => "FDS Specialist",
                    "profile" => "/storage/profile/image_1705677741.jpg",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Ram Roel",
                    "position" => "Specialist",
                    "profile" => "/storage/profile/profile.png",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Leo",
                    "position" => "Vice",
                    "profile" => "/storage/profile/profile.png",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Johny",
                    "position" => "President",
                    "profile" => "/storage/profile/profile.png",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Carry",
                    "position" => "IT Specialist",
                    "profile" => "/storage/profile/profile.png",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Joe Biden",
                    "position" => "Specialist",
                    "profile" => "/storage/profile/profile.png",
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ]
            ]
        );
    }
}
