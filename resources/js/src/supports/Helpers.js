import React, {useState} from 'react';

// third party
import Swal from 'sweetalert2';

// note = errors dari useForm
// tag e.g : <input>, <label>,
// name is name in tag html
// label is name of form

let baseDomain  = document.head.querySelector('meta[name="api-base-url"]').content;

const handleError = (name, tag, errors, personInCharge) => {
    if(tag == 'label' && personInCharge != null){
        let resultSameChoice = sameChoice(name, personInCharge);

        if(errors[name]) return {color: 'red'}

        if(resultSameChoice) return {color: 'red'}
    }else if(tag == 'input'){
        if(errors[name]) return 'form-control-danger';
    }else if(tag == 'select'){ 
        let resultSameChoice =  personInCharge != null ? sameChoice(name, personInCharge) : false;

        // if there is no choice
        if (errors[name]) return true;
        // if choice is same
        if(resultSameChoice && personInCharge != null) return true;
    }
}


const messageError = (name, label, errors, personInCharge) => {
    let resultSameChoice = personInCharge != null ? sameChoice(name, personInCharge) : false;
    
    if(errors[name]) return <span style={{color: 'red'}}> {label} tidak boleh kosong</span>;

    if(resultSameChoice && personInCharge != null) return <span style={{color: 'red'}}> sudah ada yang milih </span>;
}

// jika pilihannya sama, maka muncul peringatan.
const sameChoice = (name, personInCharge) => {
    let resultError = Object.keys(personInCharge)
                            .filter(item => item != name)
                            .some(item => {
                                let thisSelect   = personInCharge[name];
                                let anotherSelect  = personInCharge[item];
                                // console.log(thisSelect, anotherSelect);
                                if( 
                                    (thisSelect != null && anotherSelect != null) &&
                                    (thisSelect == anotherSelect)
                                ){
                                    return true;
                                }else{
                                    return false;
                                }
                            });
                            
    return resultError;
}

const formatRupiah = (number, prefix) => {
    let number_string   = number.replace(/[^,\d]/g, '').toString(),
    split   		    = number_string.split(','),
    sisa     		    = split[0].length % 3,
    rupiah     		    = split[0].substr(0, sisa),
    ribuan     		    = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

const removeFormatRupiah = (angka) => {
    return angka.replace('Rp. ', '').replace(/\./g, '');
}

const formatNumber = number => {
    return number.replace(/[^,\d]/g, '').toString();
}

const wordLimit = (str, len, status) => {
    //if use middle
    //insert const len = {front: 0, back: 0}

    if(status == 'back'){
        return str.slice(len);
    }else if(status == 'front'){
        return str.slice(0, len);
    }else if(status == 'middle'){
        if(len.front !== undefined && len.back !== undefined){
            return str.slice(len.front, len.back);
        }
    }
}

const alert = (result) => {
    let icon = '', title = '';

    let audioError    = new Audio(baseDomain + '/audio/error.ogg');
    let audioSuccess  = new Audio(baseDomain + '/audio/success.ogg');
    let audioWarning  = new Audio(baseDomain + '/audio/warning.ogg');

    if(result.status == 200){
        audioSuccess.play();

        icon    = 'success';
        title   = 'Notification';
    }else if(result.status == 400){
        audioWarning.play();

        icon    = 'warning';
        title   = 'Attention';
    }
    else if(result.status == 500){
        audioError.play();

        icon    = 'error';
        title   = 'Warning';
    }   

    if(result.status == 400){
        Swal.fire({
            icon: icon,
            timer: 2000,
            // title: title,
            text: result.data,
            showConfirmButton: false,
        });
    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: icon,
            title: result.data,
        });
    }

    return result.status;
}

const addClass = (elements, myClass) => {
    // if there are no elements, we're done
  if (!elements) { return; }

  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }

  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {

    // if class is not already found
    if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {

      // add class
      elements[i].className += ' ' + myClass;
    }
  }
}

// reference format https://formvalidation.io/guide/validators/file/
const validateFile = (type) => {
    if(type === 'application/pdf' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        return true;
    }else{
        return false;
    }
}

export {
    alert,
    addClass,
    wordLimit,
    sameChoice,
    handleError, 
    messageError,
    formatRupiah,
    formatNumber,
    validateFile,
    removeFormatRupiah,
}