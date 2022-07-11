import React, {useState, useEffect} from 'react';

//third party
import axios from '../../supports/Axios';
//components
import DataTable from '../_components/DataTable/DataTable';
// helpers
import * as Helpers from '../../supports/Helpers';
// partials
import UploadFile from './Partials/UploadFile';
import DetailDocument from './Partials/DetailDocument';

const document = () => {
    const columns       = ['Nomor Surat'];
    const nameRoute     = '/document';
    
    const [isUpload, setIsUpload]   = useState(false);
    const [document, setDocument]   = useState({id: 0, isUpload: 0});
    const [idDocument, setIdDocument]= useState(0);

    const [showModalDetail, setShowModalDetail]         = useState(false);
    const [showModalUpload, setShowModalUpload]         = useState(false);
    const [showModalDatatable, setShowModalDatatable]   = useState(false);

    const addButtonActions = (data) => {

        setIsUpload(false);
        setIdDocument(data.id);

        let listButton = [
            {title: 'Detail Data', class: 'btn-success', icon: 'fa fa-bars', onClick: () => handleDetail()},
            {title: 'Upload Data', class: 'btn-warning', icon: 'fa fa-cloud-upload', onClick: () => handleUpload()},
            {title: 'Download Data', class: 'btn-primary', icon: 'fa fa-cloud-download', onClick: () => handleDownload()},
        ]

        listButton = listButton.filter(item => {
            if(document.isUpload === 0){
                if(item.title !== 'Download Data'){
                    return item;
                }
            }else{
                return item;
            }
        });        

        return listButton.map((item, index) => 
            <button key={index} title={item.title} className={`btn btn-sm ${item.class}`} onClick={() => item.onClick()}>
                <i className={item.icon}></i>
            </button>    
        )
    }

    const handleDetail = () => {
        // console.log(document);
        setShowModalDetail(true);
        setShowModalDatatable(false);
    }

    const handleUpload = () => {
        setShowModalUpload(true);
        setShowModalDatatable(false);
    }

    const handleDownload = () => {
        window.open(document.path_file_download, '_blank');
    }

    useEffect(() => {
        loadData();
    }, [idDocument, isUpload]);

    const loadData = async () => {
        if(idDocument !== undefined && idDocument !== 0){
            // console.log(idDocument);
            await axios({
                method: 'get',
                url: nameRoute+'/edit/'+idDocument,
            }).then(res => {
                let result = res.data;

                setDocument(result);
                Helpers.addClass('.action > .btn', 'btn-block');
            }).catch(function (response) {
                let result = {
                    data: 'Maaf, Ada Kesalahan Sistem',
                    status: 500,
                }
                Helpers.alert(result);
            });
        }
    }

    return(
        <div>
            <DetailDocument
                document={document}
                showModal={showModalDetail}
                setShowModal={() => setShowModalDetail()}
            />
            <UploadFile
                document={document}
                nameRoute={nameRoute}
                showModal={showModalUpload}
                setIsUpload={() => setIsUpload()} 
                setShowModal={() => setShowModalUpload()}
            />
            <div className="page-header">
                <div className="row">
                    <div className="col-md-10">
                        <div className="page-header-title">
                            <div className="d-inline">
                                <h4>Dokumen</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="card">
                            <div className="card-block">
                                <DataTable
                                    usePopup
                                    columns={columns}
                                    nameRoute={nameRoute}
                                    url={nameRoute} 
                                    addButtonActions={(data) => addButtonActions(data)}

                                    // modal datatable
                                    showModal={showModalDatatable}
                                    setShowModal={(e) => setShowModalDatatable(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default document;