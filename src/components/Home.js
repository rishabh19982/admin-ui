
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
            selectedRowKeys:[],
            editingKey: 0
        }
        
    }

    cancel = () => {
        this.setState({editingKey:0});
    }

    isEditing = (record) => {
        return record.id === this.state.editingKey;
    }

    setEditingKey = (recordKey) => {
        this.setState({editingKey:recordKey});
    }
    handleDeleteMain = (selectedRowKeys) => {
        let originalData = this.state.data;
        let filteredData = this.state.filteredData;
        let updatedData = originalData.filter((row)=>{
            if(selectedRowKeys.includes(row.id)){
               return false; 
            }
            return true;
        })
        let updatedfileredData = filteredData.filter((row)=>{
            if(selectedRowKeys.includes(row.id)){
               return false; 
            }
            return true;
        })
        this.setState({data:updatedData,filteredData:updatedfileredData});
    }

    handleSingleDelete = (record) => {
        let selectedRowKeys = [];
        selectedRowKeys.push(record.id);
        this.handleDeleteMain(selectedRowKeys);
    }

    handleMultipleDelete = () => {
        let selectedRowKeys = this.state.selectedRowKeys;
        this.handleDeleteMain(selectedRowKeys);    }

    save = (recordKey,row)=>{
        let data = [...this.state.data];
        let filteredData = [...this.state.filteredData];
        let index = data.findIndex((item) => item.id === recordKey);
        let filteredDataIndex = filteredData.findIndex((item) => item.id === recordKey);
       
        if(index > -1){
            const item = data[index];
            data.splice(index, 1, { ...item, ...row });
            
        }
        if(filteredDataIndex > -1){
            const item = filteredData[filteredDataIndex];
            filteredData.splice(filteredDataIndex, 1, { ...item, ...row });
            
        }
        this.setState({filteredData:filteredData,data:data,editingKey:0});   
    }

    rowSelectionFunctions = {
        onChange: (selectedRowKeys) => {
          this.setState({selectedRowKeys:selectedRowKeys})
        }
    };

    search = (text) => {
         let data = this.state.data;
         const filteredData = data.filter((row) => {
           return row.name.toLowerCase().includes(text.toLowerCase()) || row.email.toLowerCase().includes(text.toLowerCase()) || row.role.toLowerCase().includes(text.toLowerCase());
         })
         this.setState({filteredData:filteredData});
    };

    debounceSearch = (event) => {
        const text = event.target.value;
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.search(text);
        },300);
        
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
            }
        }
        return (
            <>
                <Header searchText={this.state.searchText} 
                    handleDelete={this.handleMultipleDelete} 
                    handleChange={this.debounceSearch} handleSearch={this.search} />
                <div className="flex-container">
                    <TableComponent rowSelection={rowSelection} data={this.state.filteredData} 
                        pagination={pagination} handleDelete={this.handleSingleDelete} save={this.save}
                        cancel={this.cancel} isEditing={this.isEditing} editingKey={this.state.editingKey}
                        setEditingKey={this.setEditingKey} 
                        />
                </div>
            </>
        );
    }
}

export default Home;