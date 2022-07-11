<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $table = 'activities';
    protected $appends = ['label'];

    public function ableColumnSearch()
    {
        return ['name', 'code'];
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
