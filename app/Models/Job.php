<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'jobs';
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
