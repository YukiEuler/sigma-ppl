<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use App\Models\JadwalKuliah;
use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BuatIRSMahasiswaController extends Controller
{
    public function index()
    {
    $user = Auth::user();

    if (!$user) {
        return redirect()->route('login');
    } elseif ($user->role !== 'Mahasiswa'){
        return redirect()->route('home');
    }

    $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
    $programStudi = ProgramStudi::where('id_prodi', $mahasiswa->id_prodi)->first();
    $mahasiswa->nama_prodi = $programStudi->nama_prodi;
    $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
    $mahasiswa->nama_fakultas = $fakultas->nama_fakultas;

    $jadwal = Kelas::join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->join('jadwal_kuliah', 'kelas.id', '=', 'jadwal_kuliah.id_kelas')
        ->where('mata_kuliah.id_prodi', $mahasiswa->id_prodi)
        ->join('ruangan', 'ruangan.id_ruang', '=', 'jadwal_kuliah.id_ruang')
        ->select('kelas.kode_kelas', 'kelas.kuota', 'mata_kuliah.*', 'jadwal_kuliah.*', 'ruangan.nama_ruang')
        ->get()
        ->groupBy('kode_mk')
        ->map(function ($group) {
            $mataKuliah = $group->first();
            $mataKuliah->jadwal_kuliah = $group->map(function ($item) {
                return [
                    'id' => $item->id,
                    'kode_kelas' => $item->id_kelas,
                    'hari' => $item->hari,
                    'jam_mulai' => $item->waktu_mulai,
                    'jam_selesai' => $item->waktu_selesai,
                    'ruangan' => $item->nama_ruang,
                    'kelas' => $item->kode_kelas,
                    'kuota' => $item->kuota
                ];
            });
            return $mataKuliah;
        })
        ->values();

    return Inertia::render('(mahasiswa)/buat-irs-mahasiswa/page', ['mahasiswa' => $mahasiswa, 'jadwal' => $jadwal]);
    }

    public function insert($id_kelas){
        $kelas = Kelas::where('id', $id_kelas);
        error_log($kelas);
    }
}
