<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    protected $table = 'dosen';
    protected $primaryKey = 'nip';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['nip', 'nama', 'alamat', 'no_telp', 'dekan', 'kaprodi', 'id_prodi', 'user_id'];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }

    // public function mataKuliah()
    // {
    //     return $this->belongsToMany(MataKuliah::class, 'dosen_mk', 'nip', 'kode_mk')
    //                 ->withPivot('tahun_akademik');
    // }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'nip_wali');
    }

    public function dosenMk()
    {
        return $this->hasMany(DosenMk::class, 'nip', 'nip');
    }
}