import React from 'react';
import {connect} from "react-redux";
import './list.less';
import {getGroupList,updateGroupStatus} from "../../services/apiList";
import {Avatar,Button, Form, Icon, Input, Select, Table,Pagination,Popconfirm  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class groupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            total:0,
            page:1,
            pageSize:5
        };
        this.columns = [
            {
                title: '群组名称',
                dataIndex: 'groupName',
                width: 100,
            }, {
                title: '作者',
                width: 100,
                dataIndex: 'username',
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
                title: '限制人数',
                width: 50,
                dataIndex: 'staff',
                sorter: (a, b) => a.staff - b.staff
            },

            {
                title: '状态',
                width: 50,
                dataIndex: 'status',
                render: text => text ? '在线' : '过期'
            },
            {
                title: '创建时间',
                width: 150,
                dataIndex: 'createDate',
                render: date => new Date(date).format('yyyy-MM-dd mm:hh:ss'),
                sorter: (a, b) => new Date(a.createDate).getTime() - new Date(a.createDate).getTime(b.createDate)
            }
            // {
            //     title: '操作',
            //     width: 50,
            //     dataIndex: '',
            //     render: (text, record) => {
            //         return  (
            //             <Popconfirm okText="确认" cancelText="取消" title="确定直接关闭该群组吗" onConfirm={() => this.onUpdateGroupStatus(record)}>
            //                 <Icon type="poweroff" className={{active:!record.status}} />
            //             </Popconfirm>
            //         )
            //     }
            // }
        ];
        this.searchKey = {};
    }

    rowSelection = {
        onChange: (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        }
    }

    onUpdateGroupStatus = async (item) =>{
        let groupId = item._id;
        let status = item.status === 0 ? 1 : 0;
        let result = await updateGroupStatus({_id:groupId});
        if(result){
            this.state.groupList.forEach((item1,index)=>{
                if(item1._id === groupId){
                    item1.status = status;
                }
            });
            this.setState({
                groupList:this.state.groupList
            });
        }
    }

    getGroupList = async () => {
        let result = await getGroupList({page:this.state.page,pageSize: this.state.pageSize,...this.searchKey});
        if (result) {
            this.setState({
                groupList: result.data.list,
                total:result.data.total
            });
        }
    }

    searchStoryList  = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.searchKey = values;
                this.getGroupList();
            }
        });
    }

    pageChange = (page) =>{
        this.setState({page:page});
        setTimeout(()=> this.getGroupList(),100);

    }

    componentDidMount() {
        this.getGroupList();
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        return (
            <div className="topic-table-box">
                <Form layout="inline" onSubmit={this.searchStoryList} className="form-box">
                    <FormItem label="群组名称">
                        {getFieldDecorator('groupNameKey', {
                            rules: [{ message: '群组名称' }],
                        })(
                            <Input
                                placeholder="故事名称"
                                style={{width: 200}}
                            />
                        )}

                    </FormItem>
                    <FormItem label="是否在线">
                        {getFieldDecorator('status', {
                            initialValue: ''
                        })(
                            <Select style={{width: 120}}>
                                <Option value="">全部</Option>
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" icon="search">搜索</Button>
                    </FormItem>
                </Form>
                <Table columns={this.columns} pagination={false}  rowSelection={this.rowSelection} dataSource={this.state.groupList}
                       bordered/>
                <Pagination className="pageContiner" defaultCurrent={this.state.page} defaultPageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChange} />
            </div>

        );
    }
}
const groupListModule = Form.create()(groupList);
export default connect(null)(groupListModule);
