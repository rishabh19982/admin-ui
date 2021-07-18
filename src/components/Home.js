
import "./Home.css";
import Header from "./Header";
import TableComponent from "./TableComponent";
import React from "react";
import ipConfig from "../ipConfig.json";

class Home extends React.Component  {
    constructor() {
        super();
        this.state = {
            filteredData:[],
            data:[],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            searchText: '',
            selectedRowKeys:[]
        }
        
    }

    handleSingleDelete = (record) => {
        //console.log('Deleted handled');
        let selectedRowKeys = [];
        selectedRowKeys.push(record.id);
        let originalData = this.state.data;
        let updatedData = originalData.filter((row)=>{
            if(selectedRowKeys.includes(row.id)){
                console.log()
               return false; 
            }
            return true;
        })
        this.setState({data:updatedData});
    }

    handleMultipleDelete = () => {
        //console.log('Deleted handled');
        let selectedRowKeys = this.state.selectedRowKeys;
        let originalData = this.state.data;
        let updatedData = originalData.filter((row)=>{
            if(selectedRowKeys.includes(row.id)){
                console.log()
               return false; 
            }
            return true;
        })
        this.setState({data:updatedData});
    }

    rowSelectionFunctions = {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({selectedRowKeys})
        }
    };

    search = (text) => {
         let data = this.state.data;
         const filteredData = data.filter((row) => {
           // console.log(row)
           return row.name.toLowerCase().includes(text.toLowerCase()) || row.email.toLowerCase().includes(text.toLowerCase()) || row.role.toLowerCase().includes(text.toLowerCase());
         })
         // console.log(filteredData);
     
         this.setState({filteredData:filteredData});
    };

    debounceSearch = (event) => {
        const text = event.target.value;
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          // clearTimeout(this.debounceTimeout);
          this.search(text);
        },300);
        // console.log(text);
    };
    

    async componentDidMount(){
        let response = await (await fetch(ipConfig.url)).json();
        if(response){
            this.setState({
                data : response,
                filteredData:response
            })
        }
    }
    render(){
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            ...this.rowSelectionFunctions,
            selectedRowKeys
          };
        const pagination = {
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            onChange:(current) => {
                let oldpagination = this.state.pagination;
                oldpagination.current = current;
                this.setState({pagination:oldpagination});
                //console.log(this.state.pagination);
            }
        }
        return (
            <>
                <Header searchText={this.state.searchText} 
                    handleDelete={this.handleMultipleDelete} 
                    handleChange={this.debounceSearch} handleSearch={this.search} />
                <div className="flex-container">
                    <TableComponent rowSelection={rowSelection} data={this.state.filteredData} 
                        pagination={pagination} handleDelete={this.handleSingleDelete}/>
                </div>
            </>
        );
    }
}

export default Home;