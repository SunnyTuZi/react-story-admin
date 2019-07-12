import React from 'react';
import { connect } from "react-redux";
import {getTopicList} from "../../services/apiList";
import { Table } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    filters: [{
        text: 'Joe',
        value: 'Joe',
    }, {
        text: 'Jim',
        value: 'Jim',
    }, {
        text: 'Submenu',
        value: 'Submenu',
        children: [{
            text: 'Green',
            value: 'Green',
        }, {
            text: 'Black',
            value: 'Black',
        }],
    }],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
}, {
    title: 'Address',
    dataIndex: 'address',
    filters: [{
        text: 'London',
        value: 'London',
    }, {
        text: 'New York',
        value: 'New York',
    }],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
}];

function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}


const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
}];

class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {codeImg: ''};
    }

    async getTopicList(){
        let result = await getTopicList({});
        if(result){

        }
    }

    componentDidMount(){
        this.getTopicList();
    }
    render() {
        return (
            <Table columns={columns} dataSource={data} onChange={onChange} />
        );
    }
}

export default connect(null)(TopicList);
