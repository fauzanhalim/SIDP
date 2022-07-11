<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonCharge extends Model
{
    protected $table = 'person_charge'; 
    protected $appends = ['label'];

    public function ableColumnSearch()
    {
        return ['name', 'nip'];
    }

    public function scopeSearch($query)
    {
        if(request('search')){
            foreach($this->ableColumnSearch() as $item){
                $query->orWhere($item, 'like', '%'.request('search').'%');
            }
        }
    }

    public function getLabelAttribute()
    {
        return $this->name;
    }
}
