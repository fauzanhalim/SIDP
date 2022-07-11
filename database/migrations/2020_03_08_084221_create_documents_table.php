<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('person_in_charge_one')->default(0);
            $table->integer('person_in_charge_two')->default(0);
            $table->integer('person_in_charge_three')->default(0);
            $table->string('number_letter');
            // memasukkan nomor urut pada surat
            $table->integer('sequence_letter')->default(0);
            $table->date('time_in_charge');
            $table->integer('activity_id')->unsigned();
            $table->integer('job_id')->unsigned();
            $table->double('contract_value')->default(0);
            $table->string('information')->nullable();
            $table->string('number_agreement_letter');
            $table->date('date_agreement_letter');
            // apakah sudah upload surat atau tidak
            $table->integer('isUpload')->default(0);
            $table->string('file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
