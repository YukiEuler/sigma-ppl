<?php
// app/Models/Kelas.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'kelas';

    protected $fillable = [
        'kode_mk',
        'kode_kelas',
        'tahun',
        'semester',
        'kuota',
    ];

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'kode_mk', 'kode_mk');
    }

    public function irs()
    {
        return $this->hasMany(Irs::class, 'id_kelas', 'id');
    }

    public function jadwalKuliah()
    {
        return $this->hasMany(JadwalKuliah::class, 'id_kelas', 'id');
    }
}