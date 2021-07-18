import React from "react";
import {Button} from "antd";
import Search from "./Search"
import "./Header.css"

export default function Header(props) {

    return (
        <>
        <div className="header">
            <Button onClick={props.handleDelete}>Delete selected</Button>
            <div className="searchBar">
                <Search searchText={props.searchText} className="searchBar" handleChange={props.handleChange} handleSearch={props.handleSearch}/>
            </div> 
        </div>
        </>
  );
}