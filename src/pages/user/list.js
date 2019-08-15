/**
 * Create by Zwl on 2019/8/6
 * @Description:
 */

import React from 'react';
import {connect} from "react-redux";
import './list.less';
import {getUserList,updateStoryStatus} from "../../services/apiList";
import {Avatar,Button, Form, Icon, Input, Select, Table,Pagination,Popconfirm  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class userList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            total:0,
            page:1,
            pageSize:5
        };
        this.columns = [
            {
                title: '用户头像',
                width: 100,
                dataIndex: 'head',
                render: (text,record)=>{
                    return(
                        <div className="user-icon">
                            <Avatar src={'/images/' + record.head} alt="" />
                            <span>{record.username}</span>
                        </div>
                    )
                }
            },
            {
                title: '用户姓名',
                dataIndex: 'username',
                width: 100,
            },
            {
                title: '发表故事',
                width: 50,
                dataIndex: 'storysize',
                sorter: (a, b) => a.storysize - b.storysize,
            },
            {
                title: '关注人数',
                width: 50,
                dataIndex: 'fosize',
                sorter: (a, b) => a.fosize - b.fosize,
            },
            {
                title: '粉丝数',
                width: 50,
                dataIndex: 'bfosize',
                sorter: (a, b) => a.bfosize - b.bfosize,
            },
            {
                title: '状态',
                width: 50,
                dataIndex: 'status',
                render: text => text ? '在线' : '禁止'
            },
            {
                title: '操作',
                width: 50,
                dataIndex: '',
                render: (text, record) => {
                    return  (
                        <Popconfirm okText="确认" cancelText="取消" title={record.status?'确定拉黑该用户吗?':'确定恢复该用户身份吗？'} onConfirm={() => this.onUpdateStoryStatus(record)}>
                            <Icon type="poweroff" className={{active:!record.status}} />
                        </Popconfirm>
                    )
                }
            }
        ];
        this.searchKey = {};
    }

    rowSelection = {
        onChange: (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        }
    }

    onUpdateStoryStatus = async (item) =>{
        let storyId = item._id;
        let status = item.status === 0 ? 1 : 0;
        let result = await updateStoryStatus({_id:storyId,status:status});
        if(result){
            this.state.storyList.forEach((item1,index)=>{
                if(item1._id === storyId){
                    item1.status = status;
                }
            });
            this.setState({
                storyList:this.state.storyList
            });
        }
    }

    getUserList = async () => {
        let result = await getUserList({page:this.state.page,pageSize: this.state.pageSize,...this.searchKey});
        if (result) {
            this.setState({
                userList: result.data.list,
                total:result.data.total
            });
        }
    }

    searchStoryList  = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.searchKey = values;
                this.getUserList();
            }
        });
    }

    pageChange = (page) =>{
        this.setState({page:page});
        setTimeout(()=> this.getUserList(),100);

    }

    componentDidMount() {
        this.getUserList();
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        return (
            <div className="topic-table-box">
                <Form layout="inline" onSubmit={this.searchStoryList} className="form-box">
                    <FormItem label="故事名称">
                        {getFieldDecorator('userName', {
                            rules: [{ message: '故事名称' }],
                        })(
                            <Input
                                placeholder="故事名称"
                                style={{width: 200}}
                            />
                        )}

                    </FormItem>
                    <FormItem label="是否违规">
                        {getFieldDecorator('userStatus', {
                            initialValue: ''
                        })(
                            <Select style={{width: 120}}>
                                <Option value="">全部</Option>
                                <Option value="1">否</Option>
                                <Option value="0">是</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" icon="search">搜索</Button>
                    </FormItem>
                </Form>
                <Table columns={this.columns} pagination={false}  rowSelection={this.rowSelection} dataSource={this.state.userList}
                       bordered/>
                {
                    this.state.total ?
                        <Pagination className="pageContiner" defaultCurrent={this.state.page} defaultPageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChange} /> :
                        ''
                }
            </div>

        );
    }
}
const userListModule = Form.create()(userList);
export default connect(null)(userListModule);

