<?php

use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\BagianAkademikController;
use App\Http\Controllers\BuatIRSMahasiswaController;
use App\Http\Controllers\DekanController;
use App\Http\Controllers\MenentukanRuangKuliahController;
use App\Http\Controllers\MenyetujuiRuangKuliah;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IRSMahasiswaController;
use App\Http\Controllers\KaprodiController;
use App\Http\Controllers\PersetujuanIRSDosenController;
use App\Http\Controllers\PerwalianDosenController;
use App\Http\Controllers\ProfileDosenController;
use App\Http\Controllers\ProfileMahasiswaController;
use App\Http\Controllers\RekapIRSDosenController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');

Route::get('/login', [LoginController::class, 'login'])->name('login');
Route::post('actionlogin', [LoginController::class, 'actionlogin'])->name('actionlogin');

// Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');
Route::get('actionlogout', [LoginController::class, 'actionlogout'])->name('actionlogout')->middleware('auth');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/login');
})->name('logout');

Route::get('register', [RegisterController::class, 'register'])->name('register');
Route::post('register/action', [RegisterController::class, 'actionregister'])->name('actionregister');

Route::get('mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/irs', [IRSMahasiswaController::class, 'index'])->name('mahasiswa.irs')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/buat-irs', [BuatIRSMahasiswaController::class, 'index'])->name('mahasiswa.buatirs')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/buat-irs/insert/{id_kelas}', [BuatIRSMahasiswaController::class, 'insert'])->name('mahasiswa.insertirs')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/buat-irs/delete/{id_kelas}', [BuatIRSMahasiswaController::class, 'delete'])->name('mahasiswa.deleteirs')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/buat-irs/ubah-status', [BuatIRSMahasiswaController::class, 'ubahstatus'])->name('mahasiswa.ubahstatus')->middleware(['auth', 'validateRole:Mahasiswa']);

Route::get('dosen/dashboard', [DosenController::class, 'index'])->name('dosen.dashboard')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/perwalian', [PerwalianDosenController::class, 'index'])->name('dosen.perwalian')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/perwalian/detail/{id}', [PerwalianDosenController::class, 'detail'])->name('dosen.detailmhs')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/rekap-irs',[RekapIRSDosenController::class, 'index'])->name('dosen.rekapirs')->middleware(['auth', 'validateRole:Dosen']);