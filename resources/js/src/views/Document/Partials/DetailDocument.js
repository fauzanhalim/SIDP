import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const detailDocument = props => {
    const data      = props.document;

    const dataList = () => {
        if(data){
            const rowData   = [
                {column: 'Nomor Surat', data: data.number_letter},
                {column: 'Membuat Surat', data: data.user_name},
                {column: 'PaHP 1', data: data.person_one_name},
                {column: 'PaHP 2', data: data.person_two_name},
                {column: 'PaHP 3', data: data.person_three_name},
                {column: 'Nama Kegiatan', data: data.name_activity},
                {column: 'Nama Kode Rekening', data: data.name_job},
            ];

            return rowData
            .filter(item => {
                if(data.person_in_charge_two === 0){
                    if(item.column !== 'PaHP 2' && item.column !== 'PaHP 3'){
                        return item;
                    }
                }else{
                    return item;
                }
            })
            .map((item, index) => 
                <tr key={index}>
                    <td style={{textAlign: 'left'}}>{item.column}</td>
                    <td>{item.data}</td>
                </tr>    
            )
        }
    }

    return(
        <Modal 
            size="md"
            show={props.showModal} 
            onHide={() => props.setShowModal(false)}
        >
            {/* <Modal.Header closeButton> */}
            <Modal.Header>
                <Modal.Title>Detail Dokumen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                <div className="">
                    <table className="table table-styling table-sm">
                        <thead>
                            <tr>
                                <th style={{textAlign: 'left'}}>Kolom</th>
                                <th>data</th>
                            </tr>
                        </thead>
                        <tbody>
                            { dataList() }
                        </tbody>
                    </table>
                </div>
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default detailDocument;