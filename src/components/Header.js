import React from "react";
import {Button} from "antd";
import Search from "./Search"
import "./Header.css"

export default function Header(props) {

    return (
        <>
        <div className="header">
            <Button type="primary" onClick={props.handleDelete} id="delete-btn" danger>Delete selected</Button>
            <div className="search-bar">
                <Search searchText={props.searchText} handleChange={props.handleChange} handleSearch={props.handleSearch}/>
            </div> 
        </div>
        </>
  );
}