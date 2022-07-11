import React, { Component } from 'react';

//third party
import axios from 'axios';

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      sorted_column: this.props.columns[0],
      offset: 4,
      order: 'asc',
      loading: true,
      empty:false,
      search: '',
    };
  }

  fetchEntities() {
    let fetchUrl = `${this.props.url}/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.meta.per_page}`;
    axios.get(fetchUrl,{
      params: {
        search: this.state.search,
      }
    })
      .then(response => {
          let data = response.data;
          // console.log(data);
          if(Array.isArray(data.data) && data.data.length){
            this.setState({ loading: false, empty: false});
          }else{
            this.setState({ loading: false, empty: true});
          }

          this.setState({ entities: data });
      })
      .catch(e => {
        console.error(e);
      });
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {this.fetchEntities()});
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.meta.current_page }, () => {this.fetchEntities()});
  }

  columnList() {
    let columns = this.props.columns.map((column, index) => {
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

  numberList(index) {
    const meta          = this.state.entities.meta;
    const per_page      = Number(meta.per_page);
    const current_page  = Number(meta.current_page);
    
    let number = index + (current_page * per_page);

    return (number - per_page) + 1 +'.';
  }

  messageTable(){
    if(this.state.loading){
      return 'Loading';
    }else if(this.state.empty){
      return 'Data Tidak Ada.';
    }
  }

  dataList() {
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((item, index) => {
        let numberList = this.numberList(index);

        return (
          <tr key={index}>
            <td>{numberList}</td>
            {Object.keys(item).filter(item => item != 'id' ).map(key => 
              <td key={key}>{ item[key] }</td>
            )}
            {this.buttonAction(item)}
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td key={0} colSpan={this.props.columns.length + 2} className="text-center">{this.messageTable()}</td>
        </tr>
      )
    }
  }

  buttonAction(item){
    return(
      <td align="center">
        <button title="Edit Data" className="btn btn-sm btn-info" onClick={() => this.props.handleEdit(item)}>
            <i className="icofont icofont-edit icofont-sm"></i>
        </button>
        <button title="Delete Data" className="btn btn-sm btn-danger" onClick={() => this.props.handleDelete(item)}>
            <i className="icofont icofont-ui-delete icofont-sm"></i>
        </button>
      </td>
    )
  }

  pagesNumbers() {
    if (!this.state.entities.meta.to) {
      return [];
    }
    let from = this.state.entities.meta.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (this.state.offset * 2);
    if (to >= this.state.entities.meta.last_page) {
      to = this.state.entities.meta.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    // console.log(from, to, pagesArray);

    return pagesArray;
  }

  pageList() {
    return this.pagesNumbers().map(page => {
      return <li className={ page === this.state.entities.meta.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button key={page} className="page-link" onClick={() => this.changePage(page)}>{page}</button>
      </li>
    })
  }

  searching(e){
    // console.log(e.target.value);

    this.setState({search: e.target.value},  () => {this.fetchEntities()});
  }

  render() {
    return (
      <div>
        <div className="pull-right">
          <input type="text" name="search" className="form-control" id="search" onInput={e => this.searching(e)} placeholder="search"/>
        </div>
        <table id="dt-ajax-array" className="table table-striped table-bordered nowrap">
          <thead>
            { this.columnList() }
          </thead>
          <tbody>
            { this.dataList() }
          </tbody>
        </table>
        { (this.state.entities.data && this.state.entities.data.length > 0) &&
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link"
                  disabled={ 1 === this.state.entities.meta.current_page }
                  onClick={() => this.changePage(this.state.entities.meta.current_page - 1)}
                >
                  Previous
                </button>
              </li>
              { this.pageList() }
              <li className="page-item">
                <button className="page-link"
                  disabled={this.state.entities.meta.last_page === this.state.entities.meta.current_page}
                  onClick={() => this.changePage(this.state.entities.meta.current_page + 1)}
                >
                  Next
                </button>
              </li>
              <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying { this.state.entities.data.length } of { this.state.entities.meta.total } entries.</i></span>
            </ul>
          </nav>
        }
      </div>
    );
  }
}
