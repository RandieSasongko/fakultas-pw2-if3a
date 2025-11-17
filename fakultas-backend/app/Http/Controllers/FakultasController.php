<?php
// app/Http/Controllers/FakultasController.php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class FakultasController extends Controller
{
    public function index()
    {
        $fakultas = Fakultas::with('prodis')->get();
        
        return response()->json([
            'success' => true,
            'data' => $fakultas
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = [
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi
        ];

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('fakultas', 'public');
            $data['foto'] = $fotoPath;
        }

        $fakultas = Fakultas::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Fakultas berhasil dibuat',
            'data' => $fakultas
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $fakultas = Fakultas::with('prodis')->find($id);

        if (!$fakultas) {
            return response()->json([
                'success' => false,
                'message' => 'Fakultas tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $fakultas
        ]);
    }

    public function update(Request $request, $id)
    {
        $fakultas = Fakultas::find($id);

        if (!$fakultas) {
            return response()->json([
                'success' => false,
                'message' => 'Fakultas tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = [
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi
        ];

        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($fakultas->foto) {
                Storage::disk('public')->delete($fakultas->foto);
            }
            
            $fotoPath = $request->file('foto')->store('fakultas', 'public');
            $data['foto'] = $fotoPath;
        }

        $fakultas->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Fakultas berhasil diupdate',
            'data' => $fakultas
        ]);
    }

    public function destroy($id)
    {
        $fakultas = Fakultas::find($id);

        if (!$fakultas) {
            return response()->json([
                'success' => false,
                'message' => 'Fakultas tidak ditemukan'
            ], 404);
        }

        // Hapus foto jika ada
        if ($fakultas->foto) {
            Storage::disk('public')->delete($fakultas->foto);
        }

        $fakultas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Fakultas berhasil dihapus'
        ]);
    }

    // Method untuk mendapatkan prodi berdasarkan fakultas
    public function prodiByFakultas($id)
    {
        $fakultas = Fakultas::with('prodis')->find($id);

        if (!$fakultas) {
            return response()->json([
                'success' => false,
                'message' => 'Fakultas tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'fakultas' => $fakultas->nama,
            'data' => $fakultas->prodis
        ]);
    }
}