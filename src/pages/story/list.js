import React from 'react';
import {connect} from "react-redux";
import './list.less';
import {getStoryList,updateStoryStatus} from "../../services/apiList";
import {Avatar,Button, Form, Icon, Input, Select, Table,Pagination,Popconfirm  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class storyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyList: [],
            total:0,
            page:1,
            pageSize:5
        };
        this.columns = [
            {
                title: '故事名称',
                dataIndex: 'storyName',
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
                title: '评论人数',
                width: 50,
                dataIndex: 'coms',
                sorter: (a, b) => a.coms - b.coms
            },
            {
                title: '收藏人数',
                width: 50,
                dataIndex: 'likes',
                sorter: (a, b) => a.likes - b.likes
            },
            {
                title: '点赞人数',
                width: 50,
                dataIndex: 'goods',
                sorter: (a, b) => a.goods - b.goods
            },
            {
                title: '差评人数',
                width: 50,
                dataIndex: 'bads',
                sorter: (a, b) => a.bads - b.bads
            },
            {
                title: '状态',
                width: 50,
                dataIndex: 'status',
                render: text => text ? '在线' : '禁止'
            },
            {
                title: '发表时间',
                width: 150,
                dataIndex: 'createDate',
                render: date => new Date(date).format('yyyy-MM-dd mm:hh:ss'),
                sorter: (a, b) => new Date(a.createDate).getTime() - new Date(a.createDate).getTime(b.createDate)
            },
            {
                title: '操作',
                width: 50,
                dataIndex: '',
                render: (text, record) => {
                    return  (
                        <Popconfirm okText="确认" cancelText="取消" title={record.status?'确定设为违规吗?':'确定设为开放吗？'} onConfirm={() => this.onUpdateStoryStatus(record)}>
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

    getStoryList = async () => {
        let result = await getStoryList({page:this.state.page,pageSize: this.state.pageSize,...this.searchKey});
        if (result) {
            this.setState({
                storyList: result.data.list,
                total:result.data.total
            });
        }
    }

    searchStoryList  = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.searchKey = values;
                this.getStoryList();
            }
        });
    }

    pageChange = (page) =>{
        this.setState({page:page});
        setTimeout(()=> this.getStoryList(),100);

    }

    componentDidMount() {
        this.getStoryList();
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        return (
            <div className="topic-table-box">
                <Form layout="inline" onSubmit={this.searchStoryList} className="form-box">
                    <FormItem label="故事名称">
                        {getFieldDecorator('storyName', {
                            rules: [{ message: '故事名称' }],
                        })(
                            <Input
                                placeholder="故事名称"
                                style={{width: 200}}
                            />
                        )}

                    </FormItem>
                    <FormItem label="是否违规">
                        {getFieldDecorator('storyStatus', {
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
                <Table columns={this.columns} pagination={false}  rowSelection={this.rowSelection} dataSource={this.state.storyList}
                       bordered/>
                <Pagination className="pageContiner" defaultCurrent={this.state.page} defaultPageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChange} />
            </div>

        );
    }
}
const storyListModule = Form.create()(storyList);
export default connect(null)(storyListModule);
