<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Document;
use App\Http\Resources\DocumentsResource;

use File;
use Carbon\Carbon;

class DocumentsController extends Controller
{
    protected $pathPrint    = 'files/print/';
    protected $pathUpload   = 'files/upload/';

    public function index()
    {
        $data = Document::orderBy('created_at', 'desc')->search()->paginate(request('per_page', 5));

        return DocumentsResource::collection($data);
    }

    public function sequenceLetter()
    {
        $time   = request('time_in_charge') ? Carbon::parse(request('time_in_charge')) : Carbon::now();
        $time   = $time->format('Y-m-d');

        $data   = Document::where('time_in_charge', $time)->where('id', request('id'))->first(); 

        $count  = Document::whereDate('time_in_charge', $time)
                            ->orderBy('created_at', 'desc')
                            ->first();

        if($count){
            if($data){
                return $data->sequence_letter;
            }else{
                return $count->sequence_letter + 1;
            }
        }else{
            return 1;
        }
    }

    public function edit($id)
    {
        $data = Document::allRelation()
                        ->findOrFail($id);

        return $data;
    }

    public function store()
    {
        return $this->save();
    }

    public function update($id)
    {
        return $this->save($id);
    }

    public function save($id = null)
    {
        try {
            $data   = $id ? Document::findOrFail($id) : New Document();
            $data->user_id                  = request('user_id');
            $data->person_in_charge_one     = $this->personInCharge(1);
            $data->person_in_charge_two     = $this->personInCharge(2);
            $data->person_in_charge_three   = $this->personInCharge(3);
            $data->number_letter            = request('number_letter');
            $data->time_in_charge           = request('time_in_charge');
            $data->activity_id              = $this->activity()->value;
            $data->job_id                   = $this->job()->value;
            $data->contract_value           = request('contract_value');
            $data->information              = request('information');
            $data->number_agreement_letter  = request('number_agreement_letter');
            $data->date_agreement_letter    = request('date_agreement_letter');
            $data->sequence_letter          = request('sequence_letter');
            $data->file                     = '';
            // return $data;
            $data->save();
        } catch (\Execption $e) {
            return response()->json([
                'data'      => 'Maaf, Data Tidak Berhasil Terkirim',
                'status'    => 500,
            ]);
        }

        $print      = $this->print();
        $temp       = asset($this->pathPrint.$this->fileNameLetter());

        if($print){
            return response()->json([
                'status'    => 200,
                'id'        => $data->id,
                'data'      => 'Data Berhasil Terkirim',
                'file'      => $temp,
            ]);
        }else{
            return response()->json([
                'status'    => 500,
                'id'        => null,
                'data'      => 'Maaf, Data Tidak Bisa di Print',
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $data = Document::findOrFail($id);
            $temp = public_path($this->pathPrint.$data->file);
            unlink($temp);
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

    public function upload($id)
    {        
        if(request()->hasFile('file')){
            $data = Document::findOrFail($id);

            @unlink(public_path($this->pathUpload.$data->file));
            $file       = request()->file('file');
            $extension  = $file->getClientOriginalExtension();
            $fileName   = str_random(8) . '.' . $extension;
            $file->move($this->pathUpload, $fileName);
            
            if($file){
                try {
                    $data->update([
                        'file'      => $fileName,
                        'isUpload'  => 1,
                    ]);
                } catch (\Execption $e) {
                    return response()->json([
                        'data'      => 'Maaf, Data Tidak Berhasil Terkirim',
                        'status'    => 500,
                    ]);
                }
            }

            return response()->json([
                'status'    => 200,
                'data'      => 'Data Berhasil Terkirim',
            ]);
        }

        return response()->json([
            'status'    => 400,
            'data'      => 'Maaf, File Tidak Ada',
        ]);
    }

    private function print()
    {
        $file               = request('person') == 1 ? 'source1' : 'source2';
        $rek_code           = (object) json_decode(request('rek_code'), true);
        $time_in_charge     = $this->timeInCharge();
        $dateAgreementLetter= Carbon::parse(request('date_agreement_letter'))->format('d F Y');

        $domPdfPath = base_path( 'vendor/dompdf/dompdf');
        $makingWord = new \PhpOffice\PhpWord\TemplateProcessor(public_path('files/'.$file.'.docx'));

        $time_in_charge = 'Pada hari ini '.$time_in_charge.', yang bertanda tangan di bawah ini :';
        $makingWord->setValue('${time_in_charge}', $time_in_charge);
        $makingWord->setValue('${number_letter}', request('number_letter'));
        $makingWord = $this->insertMultiPerson($makingWord);
        $makingWord->setValue('${number_dpa}', request('number_dpa'));
        $makingWord->setValue('${name_activity}', request('name_activity'));
        $makingWord->setValue('${name_work}', request('name_work'));
        $makingWord->setValue('${rek_code}', $rek_code->label);
        $makingWord->setValue('${contract_value}', format_money(request('contract_value')));
        $makingWord->setValue('${information}', request('information'));
        $makingWord->setValue('${number_agreement_letter}', request('number_agreement_letter'));
        $makingWord->setValue('${date_agreement_letter}', $dateAgreementLetter);
        $nameFile = $this->fileNameLetter();
        $tempFile = $this->pathPrint.$nameFile;
        $makingWord->saveAs($tempFile);

        if($makingWord){
            return true;
        }else{
            return false;
        }
    }

    private function fileNameLetter()
    {
        return str_replace('/', '_', request('number_letter')).'.docx';
    }

    private function insertMultiPerson($makingWord)
    {
        $makingWord->setValue('${person_in_charge}', $this->personInCharge(1, true)->label);
        $makingWord->setValue('${nip}', $this->personInCharge(1, true)->otherData['nip']);
        if(request('person') == '3'){
            $makingWord->setValue('${person_in_charge_two}', $this->personInCharge(2, true)->label);
            $makingWord->setValue('${nip_two}', $this->personInCharge(2, true)->otherData['nip']);
            $makingWord->setValue('${person_in_charge_three}', $this->personInCharge(3, true)->label);
            $makingWord->setValue('${nip_three}', $this->personInCharge(3, true)->otherData['nip']);
        }

        return $makingWord;
    }

    private function timeInCharge()
    {
        $day    = inspection_date(request('time_in_charge'), 'day');
        $date   = inspection_date(request('time_in_charge'), 'date');
        $month  = inspection_date(request('time_in_charge'), 'month');
        $year   = inspection_date(request('time_in_charge'), 'year');

        $result = ucwords($day).' tanggal '.ucwords(terbilang($date)).' '.$month.' Tahun '.ucwords(terbilang($year));

        return $result;
    }

    private function personInCharge($type, $object = false)
    {
        $person_in_charge_one   = (object) json_decode(request('person_in_charge_one'), true);
        if(request('person') == 3){
            $person_in_charge_two   = (object) json_decode(request('person_in_charge_two'), true);
            $person_in_charge_three = (object) json_decode(request('person_in_charge_three'), true); 
        }else{
            $person_in_charge_two   = (object) ['value' => 0];
            $person_in_charge_three = (object) ['value' => 0];
        }

        if($type == 1){
            $result = $person_in_charge_one;
        }else if($type == 2){
            $result = $person_in_charge_two;
        }else if($type == 3){
            $result = $person_in_charge_three;
        }

        if($object){
            return $result;
        }else{
            return $result->value;
        }
    }

    private function activity()
    {
        $activity = (object) json_decode(request('code_activity'), true);

        return $activity;
    }

    private function job()
    {
        $activity = (object) json_decode(request('rek_code'), true);

        return $activity;
    }
}
