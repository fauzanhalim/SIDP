<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use App\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login()
    {
      if(request('name') == null || request('password') == null) return response()->json([
        'data'      => 'Maaf, Nama atau password tidak boleh kosong',
        'auth'      => null,
        'status'    => 500,
      ]);

        $data = User::where('name', request('name'))->first();

        if($data){
          return response()->json([
            'data'      => 'Berhasil Login',
            'auth'      => $data,
            'status'    => 200,
          ]);
        }else{
          return response()->json([
            'data'      => 'Maaf, Nama Tidak Tersedia',
            'auth'      => null,
            'status'    => 500,
          ]);
        }
    }
}
