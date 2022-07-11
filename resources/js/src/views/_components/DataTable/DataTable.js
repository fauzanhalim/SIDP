import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

//cara menggunakan di viewdatatable

//third party
import axios from '../../../supports/Axios';
import Swal from 'sweetalert2';
// helpers
import * as Helpers from '../../../../src/supports/Helpers';

import ViewDataTable from './ViewDataTable';

const DataTable = (props) => {
  const history = useHistory();
  const [item, setItem]                 = useState();
  const [empty, setEmpty]               = useState(true);
  const [search, setSearch]             = useState('');
  const [remove, setRemove]             = useState(false);
  const [loading, setLoading]           = useState(true);
  const [brokenUrl, setBrokenUrl]       = useState(false);
  // const [showModal, setShowModal]       = useState(false);
  const [widthAction, setWidthAction]   = useState(100);
  const [clickSearch, setClickSearch]   = useState(false);
  const [currentPage, setCurrentPage]   = useState();
  const [selectedItem, setSelectedItem] = useState({});
  const [state, setState] = useState({
    entities: {
      data: [],
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 5,
        to: 1,
        total: 1,
      },
    },
    first_page: 1,
    current_page: 1,
    sorted_column: props.columns[0],
    offset: 4,
    order: 'asc',
  });
  const allEffect = [currentPage, clickSearch, remove];

  const styled = {
    action: {
      'width':widthAction+'px',
    }
  }

  const fetchEntities = async () => {
    let fetchUrl = `${props.nameRoute}/?page=${currentPage}&column=${state.sorted_column}&order=${state.order}&per_page=${state.entities.meta.per_page}`;
    await axios.get(fetchUrl,{
      params: {
        search: search,
      }
    })
    .then(response => {
        let data = response.data;

        if(data.data === undefined){
          console.log('bukan array');
          setBrokenUrl(true);
        }else{
          if(Array.isArray(data) && data.length){
            setLoading(false);
            setEmpty(false);
          }else{
            setLoading(false);
            setEmpty(true);
          }
  
          if(remove){
            setRemove(false);
          }
          if(clickSearch){
            setClickSearch(false);
          }
  
          setState({...state, entities: data});
        }
    })
    .catch(e => {
      console.error(e);
    });
  }

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    if(currentPage != pageNumber){
      setLoading(true);
    }else{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntities();
  }, allEffect);

  const columnList = () => {
    let columns = props.columns.map((column, index) => {
      return(
        <th key={index}>
          { column }
        </th>
      )
    });

    return (
      <tr className="table-primary">
        <th width="5">No</th>
        {columns}
        <th className="action" style={styled.action}>Action</th>
      </tr>
    );
  }

  const makeNumberList = (index) => {
    const meta          = state.entities.meta;
    const per_page      = Number(meta.per_page);
    const current_page  = Number(meta.current_page);
    
    let number = index + (current_page * per_page);

    return (number - per_page) + 1 +'.';
  }

  const messageTable = () => {
    if(loading){
      return 'Loading...';
    }else if(empty){
      return 'Data Tidak Ada.';
    }
  }

  const dataList = () => {
    let checkData   = state.entities.data.length;
    const addColumn = props.addColumn ? props.addColumn : null;
    let resultMessageTable =(
      <tr>
        <td key={0} colSpan={props.columns.length + 2} className="text-center">{messageTable()}</td>
      </tr>
    );
    
    if(loading || !checkData){
      return resultMessageTable;
    }else if (checkData) {
      return state.entities.data.map((item, index) => {
        let numberList = makeNumberList(index);

        return (
          <tr key={index}>
            <td>{numberList}</td>
            {Object.keys(item).filter(item => item != 'id' ).map(key => 
              <td key={key}>
                { item[key] }
              </td>
            )}
            {addColumn}
            {listAction(item)}
          </tr>
        );
      });
    }
  }

  // set width column button action
  useEffect(() => {
    if(state.entities.data && state.entities.data.length > 0){
      let button  = document.querySelectorAll("#button_action > button");
      if(button.length > 1){
        let count   = (button.length / state.entities.data.length) * 50; 
        setWidthAction(count);
      }else{
        setWidthAction(100);
      }
    }
      
  }, [state.entities.data]);

  const listAction = (item) =>{
    setItem(item);

    return(
      <td align="center" id="button_action">
        {
          !props.usePopup 
          ? allButtonAction(item)
          : <button title="Kumpulan Tombol Action" className="btn btn-sm btn-success" onClick={() => handlePopup(item)}>
              Details
            </button>
        }
        
      </td>
    )
  }

  const handlePopup = item => {
    props.setShowModal(true);
    setSelectedItem(item);
  }

  useEffect(() => {
    if(props.showModal){
      Helpers.addClass('.action > .btn', 'btn-block');
    }
  }, [props.showModal]);

  const allButtonAction = (item) => {
    const addButton = (data) => props.addButtonActions ? props.addButtonActions(data) : null;

    let data = item ? item : selectedItem;

    return (
      <div className="action">
        {!props.noEdit && <button title="Ubah Data" className="btn btn-sm btn-info" onClick={() => handleEdit(data)}>
            <i className="icofont icofont-edit icofont-md"></i>
          </button>}
        {addButton(data)}
        {!props.noDelete && <button title="Hapus Data" className="btn btn-sm btn-danger" onClick={() => handleDelete(data)}>
            <i className="icofont icofont-ui-delete icofont-md"></i>
          </button>}
      </div>
    )
  }

  const handleEdit = (data) => {
    history.push({
        pathname: props.nameRoute+"/form",
        state: data,
    });
  }

  const handleDelete = (data) => {
    props.setShowModal(false);

    Swal.fire({
      icon: 'question',
      text: 'Anda yakin ingin menghapus data ini ?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ya, Yakin.",
      cancelButtonText: "Tidak.", 
    })
    .then((result) => {
      if(result.value){
        axios({
            method: 'post',
            url: props.nameRoute+'/delete/'+data.id,
        }).then(res => {
            let result = res.data;
            
            let alert = Helpers.alert(result);
            if(alert == 200){
              setRemove(true);
              props.setShowModal(false);
            }
        }).catch(function (response) {
            let result = {
                data: 'Maaf, Ada Kesalahan Sistem',
                status: 500,
            }
            Helpers.alert(result);
        });
      }else{
        
      }
    });
  }

  const pagesNumbers = () => {
    if (!state.entities.meta.to) {
      return [];
    }
    let from = state.entities.meta.current_page - state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (state.offset * 2);
    if (to >= state.entities.meta.last_page) {
      to = state.entities.meta.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    // console.log(from, to, pagesArray);

    return pagesArray;
  }

  const pageList = () => {
    return pagesNumbers().map(page => {
      return <li className={ page === state.entities.meta.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button key={page} className="page-link" onClick={() => changePage(page)}>{page}</button>
      </li>
    })
  }

  const handleSearch = () => {
    setClickSearch(true);
    setCurrentPage(1);

    if(state.entities.data.length){
      setEmpty(false);
    }else{
      setEmpty(true);
    }

    setLoading(true);
  }

  const passing = {
    state: state,
    // showModal: showModal,
    brokenUrl: brokenUrl,
    dataList: value => dataList(value),
    pageList: value => pageList(value),
    setSearch: value => setSearch(value),
    changePage: value => changePage(value),
    columnList: value => columnList(value),
    // setShowModal: value => setShowModal(value),
    handleSearch: value => handleSearch(value),
    allButtonAction: () => allButtonAction(),
}

  return (
    <ViewDataTable 
      {...props}
      {...passing}
    />
  );
}

export default DataTable;
