<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();
        $jalurMasukOptions = ['SBMPTN', 'SNMPTN', 'Mandiri'];
        $statusOptions = ['Aktif', 'Aktif', 'Aktif', 'Lulus', 'DO', 'Cuti'];

        for ($i = 0; $i < 100; $i++){
            $userMahasiswa = User::create([
                'username' => $faker->unique()->numerify('2406012#######'),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'Mahasiswa',
            ]);
    
            Mahasiswa::create([
                'nim' => $userMahasiswa->username,
                'nama' => $faker->name,
                'alamat' => $faker->address,
                'no_telp' => $faker->phoneNumber,
                'angkatan' => rand(2020, 2024),
                'jalur_masuk' => $jalurMasukOptions[array_rand($jalurMasukOptions)],
                'status' => $statusOptions[array_rand($statusOptions)],
                'sks_kumulatif' => rand(0,144),
                'ipk' => $faker->randomFloat(2, 0, 4),
                'id_prodi' => 62,
                'nip_dosen_wali' => '197404011999031002',
                'user_id' => $userMahasiswa->id
            ]);
        }
    }
}
