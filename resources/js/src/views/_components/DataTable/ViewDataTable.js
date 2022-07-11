import React from 'react';
import { Link } from "react-router-dom";

//styles
import './ViewDataTable.scss';

//third party
import { Modal, Button } from 'react-bootstrap';

// penggunaan datatable
{/* <DataTable
    noData // jika belum ada data untuk di tampilan
    noEdit // tidak menampilkan tombol edit
    noDelete // tidak menampilkan tombol delete
    usePopup // tombol action dalam bentuk popup atau modal bootstrap
    columns={columns} // array kolom table
    nameRoute={nameRoute} // berguna untuk pindah page di edit
    url={Config.baseUrl + nameRoute} // url untuk mendapatkan data 
    addButtonActions={() => addButtonActions()} // jika ada tambahan tombol
    // modal datatable
    showModal={showModalDatatable}
    setShowModal={(e) => setShowModalDatatable(e)}
/> */}

const viewDataTable = (props) => {
    const messageTable = () => {
        let message = '';
        if(props.brokenUrl){
            message = 'link bermasalah';
        }else if(props.noData){
            message = 'data tidak ada';
        }

        return(
            <tr>
                <td colSpan={props.columnList.length + 2} align="center">{message}</td>
            </tr>
        )
    }

    const disabled = () => (
        props.brokenUrl 
        ? 'disabled'
        : ''
    )

    return(
        <div>
            <Modal 
                size="sm"
                show={props.showModal} 
                onHide={() => props.setShowModal(false)}
            >
                {/* <Modal.Header closeButton> */}
                <Modal.Header>
                    <Modal.Title>Daftar Tombol Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.allButtonAction()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row head">
                <div className="col-md-4">
                <Link to={props.nameRoute+'/form'} title="Back" className={`btn btn-md btn-success ${disabled()}`}>
                    <span>Buat</span>
                </Link>
                </div>
                <div className="col-md-4 offset-md-4">
                <div className="input-group ">
                    <input type="text" onInput={e => props.setSearch(e.target.value)} className="form-control" placeholder="Search" />
                    <span className="input-group-addon btn btn-primary btn-sm" onClick={() => props.handleSearch()}>
                        <span className="">Cari</span>
                    </span>
                </div>
                </div>
            </div>
            {
                <div className="">
                    <table className="table datatable table-styling table-sm">
                        <thead>
                            { props.columnList() }
                        </thead>
                        <tbody>
                            { 
                                !props.noData && !props.brokenUrl
                                ? props.dataList() 
                                : messageTable()
                            }
                        </tbody>
                    </table>
                    { !props.noData && !props.brokenUrl && (props.state.entities.data && props.state.entities.data.length > 0) &&
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                <button className="page-link"
                                    disabled={ 1 === props.state.entities.meta.current_page }
                                    onClick={() => props.changePage(props.state.entities.meta.current_page - 1)}
                                >
                                    Previous
                                </button>
                                </li>
                                { props.pageList() }
                                <li className="page-item">
                                <button className="page-link"
                                    disabled={props.state.entities.meta.last_page === props.state.entities.meta.current_page}
                                    onClick={() => props.changePage(props.state.entities.meta.current_page + 1)}
                                >
                                    Next
                                </button>
                                </li>
                                <span style={{ marginTop: '8px' }}> &nbsp; <i>Menampilkan { props.state.entities.data.length } dari { props.state.entities.meta.total } Data.</i></span>
                            </ul>
                        </nav>
                    }
                </div>
            }
        </div>
    )
}

export default viewDataTable;