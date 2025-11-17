<?php
// app/Http/Controllers/ProdiController.php

namespace App\Http\Controllers;

use App\Models\Prodi;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ProdiController extends Controller
{
    public function index()
    {
        $prodis = Prodi::with('fakultas')->get();
        
        return response()->json([
            'success' => true,
            'data' => $prodis
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'fakultas_id' => 'required|exists:fakultas,id',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = [
            'nama' => $request->nama,
            'fakultas_id' => $request->fakultas_id
        ];

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('prodi', 'public');
            $data['foto'] = $fotoPath;
        }

        $prodi = Prodi::create($data);

        // Load relasi fakultas
        $prodi->load('fakultas');

        return response()->json([
            'success' => true,
            'message' => 'Prodi berhasil dibuat',
            'data' => $prodi
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $prodi = Prodi::with('fakultas')->find($id);

        if (!$prodi) {
            return response()->json([
                'success' => false,
                'message' => 'Prodi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $prodi
        ]);
    }

    public function update(Request $request, $id)
    {
        $prodi = Prodi::find($id);

        if (!$prodi) {
            return response()->json([
                'success' => false,
                'message' => 'Prodi tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'nama' => 'required|string|max:255',
            'fakultas_id' => 'required|exists:fakultas,id',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = [
            'nama' => $request->nama,
            'fakultas_id' => $request->fakultas_id
        ];

        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($prodi->foto) {
                Storage::disk('public')->delete($prodi->foto);
            }
            
            $fotoPath = $request->file('foto')->store('prodi', 'public');
            $data['foto'] = $fotoPath;
        }

        $prodi->update($data);
        $prodi->load('fakultas');

        return response()->json([
            'success' => true,
            'message' => 'Prodi berhasil diupdate',
            'data' => $prodi
        ]);
    }

    public function destroy($id)
    {
        $prodi = Prodi::find($id);

        if (!$prodi) {
            return response()->json([
                'success' => false,
                'message' => 'Prodi tidak ditemukan'
            ], 404);
        }

        // Hapus foto jika ada
        if ($prodi->foto) {
            Storage::disk('public')->delete($prodi->foto);
        }

        $prodi->delete();

        return response()->json([
            'success' => true,
            'message' => 'Prodi berhasil dihapus'
        ]);
    }
}