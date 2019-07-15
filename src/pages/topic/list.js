import React from 'react';
import { connect } from "react-redux";
import './list.less';
import {getTopicList} from "../../services/apiList";
import { Table,Form, Input, Select, Button } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

const columns = [{
    title: '话题封面',
    dataIndex: 'topicImg',
    width:100,
    render: text => <img className="topic-img" src={'/images'+text} />
},{
    title: '话题名称',
    width:100,
    dataIndex: 'topicName',
}, {
    title: '话题简介',
    width:200,
    dataIndex: 'topicInfo',
},
{
    title: '关注人数',
    width:50,
    dataIndex: 'size',
    sorter: (a, b) => a.size - b.size,
},
{
    title: '状态',
    width:50,
    dataIndex: 'status',
    render: text => text ? '在线':'禁止'
},
{
    title: '创建时间',
    width:150,
    dataIndex: 'createDate',
    render: date => new Date(date).format('yyyy-MM-dd mm:hh:ss'),
    sorter: (a, b) => new Date(a.createDate).getTime() - new Date(a.createDate).getTime(b.createDate)
}
];

const rowSelection = {
    onChange:(pagination, filters, sorter)=> {
        console.log('params', pagination, filters, sorter);
    }
}

class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {codeImg: '',topicList:[]};
    }

    async getTopicList(){
        let result = await getTopicList({});
        if(result){
            this.setState({
                topicList:result.data
            });
        }
    }

    componentDidMount(){
        this.getTopicList();
    }
    render() {
        return (
            <div className="topic-table-box">
                <Form layout="inline" onSubmit={this.handleSubmit} className="form-box">
                    <FormItem label="话题名称">
                        <Search
                            placeholder="input search text"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                        />
                    </FormItem>
                    <FormItem label="是否禁用">
                        <Select defaultValue="" style={{ width: 120 }} >
                            <Option value=""></Option>
                            <Option value="0">是</Option>
                            <Option value="1">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" shape="搜索" icon="search" />
                    </FormItem>
                </Form>
                <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.topicList} bordered  />
            </div>

        );
    }
}

export default connect(null)(TopicList);
