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
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Peter Doe",
                    "position" => "Analyst",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Jodi Doe",
                    "position" => "FDS Specialist",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Ram Roel",
                    "position" => "Specialist",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Leo",
                    "position" => "Vice",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Johny",
                    "position" => "President",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Carry",
                    "position" => "IT Specialist",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ],
                [
                    "name" => "Joe Biden",
                    "position" => "Specialist",
                    "profile" => null,
                    "created_at" => now()->format('Y-m-d H:i:s'),
                    "updated_at" => now()->format('Y-m-d H:i:s'),
                ]
            ]
        );

        ResourcePerson::insert([
            [
                "name" => "Alice Smith",
                "position" => "Software Engineer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Bob Johnson",
                "position" => "Data Scientist",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Ella Williams",
                "position" => "Web Developer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "David Brown",
                "position" => "Project Manager",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Sophia Davis",
                "position" => "UI/UX Designer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Michael Wilson",
                "position" => "Database Administrator",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Olivia Martinez",
                "position" => "Quality Assurance Analyst",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "William Jones",
                "position" => "Network Engineer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Amelia Garcia",
                "position" => "Systems Analyst",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "James Rodriguez",
                "position" => "Cybersecurity Specialist",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Mia Hernandez",
                "position" => "Business Analyst",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Benjamin Lopez",
                "position" => "DevOps Engineer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Charlotte Perez",
                "position" => "Technical Support Specialist",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Henry Sanchez",
                "position" => "Software Tester",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Scarlett Torres",
                "position" => "Product Manager",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Alexander Ramirez",
                "position" => "Full Stack Developer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Emma Flores",
                "position" => "Software Architect",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Daniel Gomez",
                "position" => "Cloud Solutions Architect",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Madison Vargas",
                "position" => "Data Engineer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Noah Cruz",
                "position" => "Machine Learning Engineer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Ava Rivera",
                "position" => "Blockchain Developer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Logan Torres",
                "position" => "Game Developer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Isabella Nguyen",
                "position" => "Frontend Developer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Ethan Kim",
                "position" => "Backend Developer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Mia Patel",
                "position" => "UX Designer",
                "profile" => null,
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ]
        ]);
    }
}
