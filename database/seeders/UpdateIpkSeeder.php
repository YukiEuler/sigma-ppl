<?php

namespace Database\Seeders;

use App\Models\Khs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UpdateIpkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $results = Khs::join('mahasiswa', 'khs.nim', '=', 'mahasiswa.nim')
            ->select('mahasiswa.nim as NIM', DB::raw('SUM(khs.bobot * CASE 
                WHEN khs.nilai_huruf = "A" THEN 4
                WHEN khs.nilai_huruf = "B" THEN 3
                WHEN khs.nilai_huruf = "C" THEN 2
                WHEN khs.nilai_huruf = "D" THEN 1
                ELSE 0
            END) / SUM(khs.bobot) as IPK'))
            ->groupBy('mahasiswa.nim')
            ->orderBy('IPK', 'desc')
            ->get();

        foreach ($results as $result) {
            DB::table('mahasiswa')
                ->where('nim', $result->NIM)
                ->update(['ipk' => $result->IPK]);
        }
    }
}