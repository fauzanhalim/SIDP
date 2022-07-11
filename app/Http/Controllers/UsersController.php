<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\User;
use Illuminate\Http\Request;

/**
 * Class UsersController
 * @property User user
 * @package App\Http\Controllers
 */
class UsersController extends Controller
{
    /**
     * @var User
     */
    protected $user;

    /**
     * UsersController constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * List of users in Json format
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $data = User::orderBy('created_at', 'desc')->search()->paginate(request('per_page', 5));

        return UsersResource::collection($data);
    }

    public function store()
    {
        $checkName = User::where('name', request('name'))->first();
        if($checkName) return response()->json(['data' => 'Maaf, NIP Tidak Boleh Sama', 'status' => 400]);

        try {
            $data           = New User();
            $data->name     = request('name');
            $data->role     = 'user';
            $data->password = request('password');
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
        $checkName = User::where('name', request('name'))->where('id', '!=', $id)->first();
        if($checkName) return response()->json(['data' => 'Maaf, Kode Tidak Boleh Sama', 'status' => 400]);

        try {
            $data           = User::findOrFail($id);
            $data->name     = request('name');
            $data->role     = 'user';
            $data->password = request('password');
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
            $data = User::findOrFail($id);
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
