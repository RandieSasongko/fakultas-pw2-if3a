<?php
// app/Models/Fakultas.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fakultas extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'foto',
        'deskripsi'
    ];

    protected $appends = ['foto_url'];

    // Relasi ke Prodi (One to Many)
    public function prodis()
    {
        return $this->hasMany(Prodi::class);
    }

    public function getFotoUrlAttribute()
    {
        if ($this->foto) {
            return asset('storage/' . $this->foto);
        }
        return null;
    }
}