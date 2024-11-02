<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
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

    return Inertia::render('(mahasiswa)/buat-irs-mahasiswa/page', ['mahasiswa' => $mahasiswa]);
}
}