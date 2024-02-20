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
            "profile" => null,
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
            "profile" => null,
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
            "profile" => null,
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
                "profile" => null,
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
                "profile" => null,
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
                "profile" => null,
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
                "profile" => null,
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
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ]
        ]);

        User::insert([
            [
                "first_name" => "Jane",
                "last_name" => "Smith",
                "birthday" => "1988-09-20",
                "email" => "jane.smith@gmail.com",
                "contact" => "09123456789",
                "address" => "456 Elm Street",
                "position" => "Regional Case Management Focal",
                "province" => "Davao City",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Michael",
                "last_name" => "Samson",
                "birthday" => "1995-03-10",
                "email" => "michael.samson@gmail.com",
                "contact" => "09234567890",
                "address" => "789 Oak Avenue",
                "position" => "Administrative Officer II",
                "province" => "Davao Del Sur",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Alice",
                "last_name" => "Johnson",
                "birthday" => "1993-08-12",
                "email" => "alice.johnson@gmail.com",
                "contact" => "09123456789",
                "address" => "123 Maple Street",
                "position" => "Compliance Verification Officer",
                "province" => "Davao Occidental",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "David",
                "last_name" => "Brown",
                "birthday" => "1990-05-23",
                "email" => "david.brown@gmail.com",
                "contact" => "09234567890",
                "address" => "456 Oak Street",
                "position" => "Administrative Assistant II",
                "province" => "Davao Oriental",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Emma",
                "last_name" => "Miller",
                "birthday" => "1985-12-05",
                "email" => "emma.miller@gmail.com",
                "contact" => "09345678901",
                "address" => "789 Elm Street",
                "position" => "Financial Analyst II",
                "province" => "Davao Oriental",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "James",
                "last_name" => "Wilson",
                "birthday" => "1987-04-17",
                "email" => "james.wilson@gmail.com",
                "contact" => "09456789012",
                "address" => "321 Pine Street",
                "position" => "Family Development Session Focal/Specialist",
                "province" => "Davao Oriental",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Olivia",
                "last_name" => "Mart",
                "birthday" => "1992-10-30",
                "email" => "olivia.mart@gmail.com",
                "contact" => "09567890123",
                "address" => "234 Birch Street",
                "position" => "Regional Training Specialist II",
                "province" => "Davao Oriental",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "William",
                "last_name" => "Garcia",
                "birthday" => "1989-06-28",
                "email" => "william.garcia@gmail.com",
                "contact" => "09678901234",
                "address" => "567 Cedar Street",
                "position" => "Administrative Assistant",
                "province" => "Davao Oriental",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Sophia",
                "last_name" => "Lopez",
                "birthday" => "1994-01-14",
                "email" => "sophia.lopez@gmail.com",
                "contact" => "09789012345",
                "address" => "890 Walnut Street",
                "position" => "Regional Gender and Development Officer",
                "province" => "Davao City",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Logan",
                "last_name" => "Hernandez",
                "birthday" => "1991-11-09",
                "email" => "logan.hernandez@gmail.com",
                "contact" => "09890123456",
                "address" => "678 Ash Street",
                "position" => "Administrative Aide IV",
                "province" => "Davao Occidental",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Ethan",
                "last_name" => "Gonzalez",
                "birthday" => "1988-07-25",
                "email" => "ethan.gonzalez@gmail.com",
                "contact" => "09901234567",
                "address" => "123 Elm Street",
                "position" => "Regional Training Specialist",
                "province" => "Davao Occidental",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Ava",
                "last_name" => "Rodriguez",
                "birthday" => "1996-02-19",
                "email" => "ava.rodriguez@gmail.com",
                "contact" => "09123456789",
                "address" => "456 Maple Street",
                "position" => "Project Development Officer I",
                "province" => "Davao Del Sur",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Mia",
                "last_name" => "Perez",
                "birthday" => "1990-04-03",
                "email" => "mia.perez@gmail.com",
                "contact" => "09234567890",
                "address" => "789 Oak Street",
                "position" => "Regional Indigenous Peoples Focal",
                "province" => "Davao Del Sur",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Liam",
                "last_name" => "Sanchez",
                "birthday" => "1987-05-15",
                "email" => "liam.sanchez@gmail.com",
                "contact" => "09345678901",
                "address" => "234 Pine Street",
                "position" => "Risk Management and Quality Assurance Focal",
                "province" => "Davao Del Sur",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Charlotte",
                "last_name" => "Torres",
                "birthday" => "1993-03-28",
                "email" => "charlotte.torres@gmail.com",
                "contact" => "09456789012",
                "address" => "567 Birch Street",
                "position" => "Regional Beneficiary Data Officer",
                "province" => "Davao Del Norte",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Noah",
                "last_name" => "Ramirez",
                "birthday" => "1989-09-06",
                "email" => "noah.ramirez@gmail.com",
                "contact" => "09567890123",
                "address" => "890 Cedar Street",
                "position" => "Regional Monitoring and Evaluation Officer",
                "province" => "Davao City",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Isabella",
                "last_name" => "Nguyen",
                "birthday" => "1995-06-11",
                "email" => "isabella.nguyen@gmail.com",
                "contact" => "09678901234",
                "address" => "123 Ash Street",
                "position" => "Division Chief",
                "province" => "Davao Del Norte",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Mason",
                "last_name" => "Tran",
                "birthday" => "1988-12-24",
                "email" => "mason.tran@gmail.com",
                "contact" => "09789012345",
                "address" => "456 Elm Street",
                "position" => "Regional Training Specialist",
                "province" => "Davao Del Norte",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Sophie",
                "last_name" => "Gomez",
                "birthday" => "1992-11-08",
                "email" => "sophie.gomez@gmail.com",
                "contact" => "09876543210",
                "address" => "123 Pine Street",
                "position" => "Project Development Officer II",
                "province" => "Davao City",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Benjamin",
                "last_name" => "Nguyen",
                "birthday" => "1994-07-15",
                "email" => "benjamin.nguyen@gmail.com",
                "contact" => "09876543211",
                "address" => "456 Cedar Street",
                "position" => "Regional Case Management Focal",
                "province" => "Davao Del Norte",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Ella",
                "last_name" => "Hernandez",
                "birthday" => "1991-12-20",
                "email" => "ella.hernandez@gmail.com",
                "contact" => "09876543212",
                "address" => "789 Elm Street",
                "position" => "Administrative Assistant III",
                "province" => "Davao Del Sur",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Lucas",
                "last_name" => "Tran",
                "birthday" => "1993-05-25",
                "email" => "lucas.tran@gmail.com",
                "contact" => "09876543213",
                "address" => "123 Oak Street",
                "position" => "Regional Training Specialist II",
                "province" => "Davao Occidental",
                "gender" => "Male",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ],
            [
                "first_name" => "Harper",
                "last_name" => "Kim",
                "birthday" => "1990-09-30",
                "email" => "harper.kim@gmail.com",
                "contact" => "09876543214",
                "address" => "456 Maple Street",
                "position" => "Financial Analyst III",
                "province" => "Davao Oriental",
                "gender" => "Female",
                "profile" => null,
                "password" => Hash::make("12345678"), //12345678
                "status" => "Active",
                "role" => "Employee",
                "created_at" => now()->format('Y-m-d H:i:s'),
                "updated_at" => now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
