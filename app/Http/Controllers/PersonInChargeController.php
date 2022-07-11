<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PersonCharge;
use App\Http\Resources\PersonInChargeResource;

class PersonInChargeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PersonCharge::orderBy('created_at', 'desc')->search()->paginate(request('per_page', 5));

        return PersonInChargeResource::collection($data);
    }

    public function fetchData()
    {
        $data = PersonCharge::limit(5)->search()->get();

        return $data;
    }
    

    public function store(Request $request)
    {
        $checkNip = PersonCharge::where('nip', request('nip'))->first();
        if($checkNip) return response()->json(['data' => 'Maaf, NIP Tidak Boleh Sama', 'status' => 400]);

        try {
            $data       = New PersonCharge();
            $data->name = request('name');
            $data->nip  = request('nip');
            $data->save();
        } catch (\Execption $e) {
            return response()->json([
                'data'      => 'Maaf, Data Tidak Berhasil Terkirim',
                'status'    => 500,
            ]);
        }

        return response()->json([
            'data'      => 'Data Berhasil Terkirim',
            'status'    => 200,
        ]);
    }

    public function update(Request $request, $id)
    {
        $checkNip = PersonCharge::where('nip', request('nip'))->where('id', '!=', $id)->first();
        if($checkNip) return response()->json(['data' => 'Maaf, NIP Tidak Boleh Sama', 'status' => 400]);

        try {
            $data       = PersonCharge::findOrFail($id);
            $data->name = request('name');
            $data->nip  = request('nip');
            $data->save();
        } catch (\Execption $e) {
            return response()->json([
                'data'      => 'Maaf, Data Tidak Berhasil Diperbaharui',
                'status'    => 500,
            ]);
        }

        return response()->json([
            'data'      => 'Data Berhasil Diperbaharui',
            'status'    => 200,
        ]);
    }

    public function destroy($id)
    {
        try {
            $data = PersonCharge::findOrFail($id);
            $data->delete();
        } catch (\Execption $e) {
            return response()->json([
                'data'      => 'Maaf, Data Tidak Berhasil Diperbaharui',
                'status'    => 500,
            ]);
        }

        return response()->json([
            'data'      => 'Data Berhasil Dihapus',
            'status'    => 200,
        ]);
    }
}
