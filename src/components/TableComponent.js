import { Table } from "antd";
import React from "react";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";



export default function TableComponent(props) {
    const columns = [
        
        {
          title: 'Name',
          dataIndex: 'name',
          width: '20%',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            render: (_,record) => {
                return (
                    <div>
                        <span class="icon-padding">
                            <EditOutlined />
                        </span>
                        <span class="icon-padding">
                            <DeleteOutlined onClick= {() => {props.handleDelete(record)}}/>
                        </span>
                    </div>
                )
            }
        }
      ];
    return (
        <>
            <Table rowKey={(record) => record.id} rowSelection={props.rowSelection}
            dataSource={props.data} columns={columns} pagination={props.pagination} s/>
            </>
        
  );
}