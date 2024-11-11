<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use App\Models\Mahasiswa;
use App\Models\Dosen;
use App\Models\ProgramStudi;
use App\Models\Irs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IRSMahasiswaController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
        $mahasiswa->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;
        $dosen = Dosen::where('nip', $mahasiswa->nip_dosen_wali)->first();
        $mahasiswa->nama_dosen_wali = $dosen->nama;
        
        $irs = IRS::where('nim', $mahasiswa->nim)
            ->join('kelas', 'kelas.id', '=', 'irs.id_kelas')
            ->join('mata_kuliah', 'mata_kuliah.kode_mk', '=', 'kelas.kode_mk')
            ->select('*', 'irs.semester as irs_semester')
            ->with([
                'kelas.jadwalKuliah' => function ($query) {
                    $query->with('ruangan');
                },
                'mataKuliah.dosenMk.dosen'
            ])
            ->get()
            ->sortBy(function ($row) {
                $days = ['Senin' => 1, 'Selasa' => 2, 'Rabu' => 3, 'Kamis' => 4, 'Jumat' => 5];
                $dayOrder = $days[$row->kelas->jadwalKuliah->first()->hari] ?? 6;
                $timeOrder = strtotime($row->kelas->jadwalKuliah->first()->waktu_mulai);
                return $dayOrder * 1000000000 + $timeOrder;
            })
            ->groupBy('irs_semester')
            ->map(function ($rows, $semester) {
                $totalSks = $rows->sum('sks');
                $tahunAkademik = $rows->first()->tahun_akademik;
                $tahunAkademikSplit = explode('-', $tahunAkademik);
                $tahun = (int) $tahunAkademikSplit[0];
                $periode = (int) $tahunAkademikSplit[1] % 2;
                $paritasSemester = $periode == 0 ? "Ganjil" : "Genap";
                $semester = $rows->first()->irs_semester;
                $jadwal = $rows->map(function ($row) {
                    $row->mataKuliah->dosen = collect($row->mataKuliah->dosenMk)->filter(function ($dosenMk) use ($row) {
                        return $dosenMk['tahun_akademik'] === $row->tahun_akademik;
                    })->map(function ($dosenMk) {
                        return $dosenMk['dosen'];
                    })->values()->toArray();
        
                    $row->jadwal_kuliah = $row->kelas->jadwalKuliah->toArray();
                    return $row->toArray();
                });
                return [
                    'title' => 'Semester '.$semester.' | Tahun Ajaran '.($tahun-$periode).'/'.($tahun-$periode+1).' '.$paritasSemester,
                    'sks' => $totalSks,
                    'courses' => $jadwal,
                ];
            });
        
        
        // error_log($irs['1']['courses']);

        return Inertia::render('(mahasiswa)/irs-mahasiswa/page', ['mahasiswa' => $mahasiswa, 'irs' => $irs]);
    }
}
