import { Table,Popconfirm,Form,Button } from "antd";
import React from "react";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import EditableCell from './EditableCell'

export default function TableComponent(props) {
    
    const [form] = Form.useForm();
    
    const edit = (record)=>{
      form.setFieldsValue({
        name: '',
        email: '',
        ...record,
      });
      props.setEditingKey(record.id);
    }

    const save = async (recordKey) => {
      try{
        const row = await form.validateFields();
        
        props.save(recordKey,row);
      }catch(errInfo){
        console.log('Validate Failed:', errInfo);
      }
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          editable:true,
          width: '20%',
        },
        {
          title: 'Email',
          editable:true,
          dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            dataIndex: 'Actions',
            render: (_,record) => {
                const editable = props.isEditing(record);
                return editable ? (
                    <span>
                      <Button
                        type="link"
                        onClick={() => { save(record.id,form); }}
                      >
                        Save
                      </Button>
                      <Popconfirm title="Sure to cancel?" onConfirm={props.cancel}>
                        <Button type="link">Cancel</Button>
                      </Popconfirm>
                    </span> ) : (
                    <div>
                        {props.editingKey === 0 ? (
                        <span className="icon-padding">
                            <EditOutlined  onClick={() => {edit(record)}}/>
                        </span> ): (<span></span>) }
                        <span className="icon-padding">
                        <Popconfirm title="Sure to Delete?" onConfirm={() => {props.handleDelete(record)}}>
                          <DeleteOutlined />
                        </Popconfirm>
                        </span>
                        
                    </div>
                )
            }
        }
      ];
      const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: props.isEditing(record),
          }),
        };
      });
   
    return (
        
        <Form form={form} component={false}>
            <Table  rowKey={(record) => record.id} rowSelection={props.rowSelection}
            dataSource={props.data} columns={mergedColumns} pagination={props.pagination} components={{
              body: {
                cell: EditableCell,
              }
            }} />
        </Form>
        
  );
}