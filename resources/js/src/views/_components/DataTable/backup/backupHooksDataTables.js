import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";

//third party
import axios from 'axios';

const useStateCollaction = () => {
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [search, setSearch] = useState('');

  return {
    loading, setLoading,
    empty, setEmpty,
    search, setSearch
  }
}

const DataTable = (props) => {
  const {
    loading, setLoading, empty, setEmpty, search, setSearch
  } = useStateCollaction();
  
  const [state, setState] = useState({
    entities: {
      data: [],
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 3,
        to: 1,
        total: 1,
      },
    },
    first_page: 1,
    current_page: 1,
    sorted_column: props.columns[0],
    offset: 2,
    order: 'asc',
  });

  const fetchEntities = async () => {
    let fetchUrl = `${props.url}/?page=${state.current_page}&column=${state.sorted_column}&order=${state.order}&per_page=${state.entities.meta.per_page}`;
    await axios.get(fetchUrl,{
      params: {
        search: search,
      }
    })
    .then(response => {
        let data = response.data;
        if(Array.isArray(data) && data.length){
          setLoading(false);
          setEmpty(false);
        }else{
          setLoading(false);
          setEmpty(true);
        }

        setState({...state, entities: data});
    })
    .catch(e => {
      console.error(e);
    });
  }

  const changePage = (pageNumber) => {
    setState({ ...state, current_page: pageNumber});
    setLoading(true);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchEntities();
    }, 1000);
  }, [state.current_page, search]);

  const columnList = () => {
    let columns = props.columns.map((column, index) => {
      return(
        <th key={index}>
          { column }
        </th>
      )
    });

    return (
      <tr>
        <th width="10">No</th>
        {columns}
        <th width="10">Action</th>
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
      return 'Loading';
    }else if(empty){
      return 'Data Tidak Ada.';
    }
  }

  const dataList = () => {
    let checkData = state.entities.data.length;
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
              <td key={key}>{ item[key] }</td>
            )}
            {buttonAction(item)}
          </tr>
        );
      });
    }
  }

  const buttonAction = (item) =>{
    return(
      <td align="center">
        <button title="Edit Data" className="btn btn-sm btn-info" onClick={() => handleEdit(item)}>
            <i className="icofont icofont-edit icofont-sm"></i>
        </button>
        <button title="Delete Data" className="btn btn-sm btn-danger" onClick={() => handleDelete(item)}>
            <i className="icofont icofont-ui-delete icofont-sm"></i>
        </button>
      </td>
    )
  }

  const handleEdit = (data) => {
    console.log(data);
    // history.push({
    //     pathname: "/person-in-charge-form",
    //     state: data,
    // });
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

  const searching = async (e) =>{
    let type = await e.target.value;
    setTimeout(() => {
      setSearch(type);
      // setState({...state, current_page: 1});
    }, 1000);

    if(state.entities.data.length){
      setEmpty(false);
      setLoading(true);
    }else{
      setEmpty(true);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="pull-right">
        <input type="text" name="search" className="form-control" id="search" onChange={e => searching(e)} placeholder="search"/>
      </div>
      <table id="dt-ajax-array" className="table table-striped table-bordered nowrap">
        <thead>
          { columnList() }
        </thead>
        <tbody>
          { dataList() }
        </tbody>
      </table>
      { (state.entities.data && state.entities.data.length > 0) &&
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link"
                disabled={ 1 === state.entities.meta.current_page }
                onClick={() => changePage(state.entities.meta.current_page - 1)}
              >
                Previous
              </button>
            </li>
            { pageList() }
            <li className="page-item">
              <button className="page-link"
                disabled={state.entities.meta.last_page === state.entities.meta.current_page}
                onClick={() => changePage(state.entities.meta.current_page + 1)}
              >
                Next
              </button>
            </li>
            <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying { state.entities.data.length } of { state.entities.meta.total } entries.</i></span>
          </ul>
        </nav>
      }
    </div>
  );
}

export default DataTable;
