<?php
use Carbon\Carbon;

if( ! function_exists('format_money') )
{
    function format_money($data){
            return number_format($data, 0, '', '.');
    }
}

// kebutuhan surat tanggal pemeriksaan
if ( ! function_exists('inspection_date') )
{
    function inspection_date($data, $type){
        // if($data == '0000-00-00') return null;

        Carbon::setLocale('id');

        $date       = Carbon::parse($data);
        $name_day   = trans('date.day.'.$date->format('l'));
        $date_day   = $date->format('d');
        $month      = trans('date.month.'.$date->format('n'));
        $year       = $date->format('Y');

        if($type == 'day'){
            return $name_day;
        }else if($type == 'date'){
            return $date_day;
        }else if($type == 'month'){
            return $month;
        }else if($type == 'year'){
            return $year;
        }
    }
}