<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'address'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    protected $appends = ['label'];

    public function ableColumnSearch()
    {
        return ['name'];
    }

    public function scopeSearch($query)
    {
        foreach($this->ableColumnSearch() as $item){
            $query->orWhere($item, 'like', '%'.request('search').'%');
        }
    }

    public function getLabelAttribute()
    {
        return $this->code;
    }
}
