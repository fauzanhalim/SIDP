<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Job;
use App\Http\Resources\JobsResource;

class JobsController extends Controller
{
    public function index()
    {
        $data = Job::orderBy('created_at', 'desc')->search()->paginate(request('per_page', 5));

        return JobsResource::collection($data);
    }

    public function fetchData()
    {
        $data = Job::limit(5)->search()->get();

        return $data;
    }

    public function store()
    {
        $checkCode = Job::where('code', request('code'))->first();
        if($checkCode) return response()->json(['data' => 'Maaf, Kode Sudah Ada.', 'status' => 400]);

        try {
            $data       = New Job();
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
        $checkNip = Job::where('code', request('code'))->where('id', '!=', $id)->first();
        // if($checkNip) return response()->json(['data' => 'Maaf, NIP Tidak Boleh Sama', 'status' => 400]);

        try {
            $data       = Job::findOrFail($id);
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
            $data = Job::findOrFail($id);
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
