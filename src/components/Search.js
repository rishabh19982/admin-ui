import { Input} from "antd";
import React from "react";

export default function Search(props) {

    return (
        <>
          <Input.Search placeholder="input search text" onSearch={props.handleSearch} onChange={props.handleChange} enterButton /> 
        </>
  );
}