<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\BagianAkademik;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $fakultas = Fakultas::create([
            'id_fakultas' => '1',
            'nama_fakultas' => 'Fakultas Ilmu Komputer',
        ]);

        $ProgramStudi = ProgramStudi::create([
            'id_prodi' => '1',
            'nama_prodi' => 'Informatika',
            'id_fakultas' => $fakultas->id_fakultas,
            'jenjang' => 'S1',
        ]);

        
        $nip = [];

        for ($i = 0; $i < 5; $i++) {
            $userDosen = User::create([
                'username' => $faker->unique()->numerify('##########'),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'Dosen',
            ]);

            Dosen::create([
                'nip' => $userDosen->username,
                'nama' => $faker->name,
                'alamat' => $faker->address,
                'no_telp' => $faker->phoneNumber,
                'id_prodi' => $ProgramStudi->id_prodi,
                'user_id' => $userDosen->id
            ]);

            $nip[] = $userDosen->username;
        }
        
        for ($i = 0; $i < 20; $i++){
            $userMahasiswa = User::create([
                'username' => $faker->unique()->numerify('24060122130###'),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'role' => 'Mahasiswa',
            ]);
    
            Mahasiswa::create([
                'nim' => $userMahasiswa->username,
                'nama' => $faker->name,
                'alamat' => $faker->address,
                'no_telp' => $faker->phoneNumber,
                'angkatan' => 2022,
                'jalur_masuk' => 'SBMPTN',
                'sks_kumulatif' => 0,
                'ipk' => 0,
                'id_prodi' => $ProgramStudi->id_prodi,
                'nip_dosen_wali' => $nip[$i/5],
                'user_id' => $userMahasiswa->id
            ]);
        }
    }
}
