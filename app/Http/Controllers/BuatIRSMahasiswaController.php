<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\Irs;
use App\Models\Khs;
use App\Models\Mahasiswa;
use App\Models\ProgramStudi;
use App\Models\KalenderAkademik;
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
                    'id_kelas' => $item->id_kelas,
                    'hari' => $item->hari,
                    'jam_mulai' => $item->waktu_mulai,
                    'jam_selesai' => $item->waktu_selesai,
                    'ruangan' => $item->nama_ruang,
                    'kelas' => $item->kode_kelas,
                    'kuota' => $item->kuota,
                ];
            });
            return $mataKuliah;
        })
        ->values();
    
    $irs = Irs::join('kelas', 'irs.id_kelas', '=', 'kelas.id')
        ->join('mata_kuliah', 'kelas.kode_mk', '=', 'mata_kuliah.kode_mk')
        ->where('irs.nim', $mahasiswa->nim)
        ->select('kelas.*', 'mata_kuliah.nama', 'mata_kuliah.sks', 'mata_kuliah.kode_mk')
        ->get()
        ->groupBy('kode_mk')
        ->map(function ($group) {
            $mataKuliah = $group->first();
            $mataKuliah->kelas = $group->map(function ($item) {
                return [
                    'id_kelas' => $item->id,
                    'kelas' => $item->kode_kelas,
                    'kuota' => $item->kuota,
                ];
            });
            return [
                'kode_mk' => $mataKuliah->kode_mk,
                'nama' => $mataKuliah->nama,
                'sks' => $mataKuliah->sks,
                'selectedClass' => $mataKuliah->kelas[0],
            ];
        })
        ->values();
    error_log($irs);
    $selectedClass = $irs->toJson();
    
    return Inertia::render('(mahasiswa)/buat-irs-mahasiswa/page', ['mahasiswa' => $mahasiswa, 'jadwal' => $jadwal, 'irs' => $irs]);
    }

    public function insert($id_kelas){
        $kelas = Kelas::where('id', $id_kelas)->first();
        $matkul = MataKuliah::where('kode_mk', $kelas->kode_mk)->first();
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        
        if ($mahasiswa->id_prodi !== $matkul->id_prodi){
            return redirect()->back()->withErrors(['error' => 'Mata kuliah tidak sesuai dengan program studi Anda.']);
        }

        $dateNow = now();
        $yearNow = $dateNow->year;

        $tahunAkademik = KalenderAkademik::where('keterangan', 'Periode Tahun Akademik')
            ->whereDate('tanggal_mulai', '<=', $dateNow)
            ->whereDate('tanggal_selesai', '>=', $dateNow)
            ->first();

        $khs = Khs::where('nim', $mahasiswa->nim)
                ->where('kode_mk', $matkul->kode_mk)
                ->orderBy('nilai_huruf', 'asc')
                ->first();

        if (is_null($khs)) {
            $status = 'Baru';
        } elseif ($khs->nilai_huruf <= 'C') {
            $status = 'Perbaikan';
        } else {
            $status = 'Ulang';
        }
        
        Irs::create([
            'id_kelas' => $id_kelas,
            'semester' => $mahasiswa->semester,
            'tahun_akademik' => $tahunAkademik->tahun_akademik,
            'status' => $status,
            'nim' => $mahasiswa->nim
        ]);

        // return redirect()->back()->with('success', 'Mata kuliah berhasil ditambahkan ke IRS.');
    }

    public function delete($id_kelas){
        $kelas = Kelas::where('id', $id_kelas)->first();
        $matkul = MataKuliah::where('kode_mk', $kelas->kode_mk)->first();
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();
        
        if ($mahasiswa->id_prodi !== $matkul->id_prodi){
            return redirect()->back()->withErrors(['error' => 'Mata kuliah tidak sesuai dengan program studi Anda.']);
        }
        
        Irs::where('id_kelas', $id_kelas)->delete();
    }
}
