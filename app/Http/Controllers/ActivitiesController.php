<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Activity;
use App\Http\Resources\ActivitiesResource;

class ActivitiesController extends Controller
{
    public function index()
    {
        $data = Activity::orderBy('created_at', 'desc')->search()->paginate(request('per_page', 5));

        return ActivitiesResource::collection($data);
    }

    public function fetchData()
    {
        $data = Activity::limit(5)->search()->get();

        return $data;
    }

    public function store()
    {
        $checkCode = Activity::where('code', request('code'))->first();
        if($checkCode) return response()->json(['data' => 'Maaf, NIP Tidak Boleh Sama', 'status' => 400]);

        try {
            $data       = New Activity();
            $data->name = request('name');
            $data->code  = request('code');
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

    public function update($id)
    {
        $checkCode = Activity::where('code', request('code'))->where('id', '!=', $id)->first();
        if($checkCode) return response()->json(['data' => 'Maaf, Kode Tidak Boleh Sama', 'status' => 400]);

        try {
            $data       = Activity::findOrFail($id);
            $data->name = request('name');
            $data->code = request('code');
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
            $data = Activity::findOrFail($id);
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
