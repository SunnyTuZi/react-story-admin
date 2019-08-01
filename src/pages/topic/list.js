import React from 'react';
import {connect} from "react-redux";
import './list.less';
import {addTopic, getTopicList, uploadHead,updateTopic} from "../../services/apiList";
import {Avatar, Button, Form, Icon, Input, Modal, Select, Table, Upload,Radio,Pagination } from 'antd';

const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


const CollectionCreateForm = Form.create()(
    (props) => {
        const {visible, onCancel, onCreate, form, formData, handleChange} = props;
        const {getFieldDecorator} = form;
        return (
            <Modal title="添加话题"
                   okText="确认"
                   cancelText="取消"
                   visible={visible}
                   onCancel={onCancel}
                   onOk={onCreate}
                   className="topicAddModal"
            >
                <Form layout="inline">
                    <div className="form-item">
                        <FormItem label="话题封面" labelCol={{style: {width: '100px', textAlign: 'right'}}}>
                            <Upload
                                className="avatar-uploader"
                                name="avatar"
                                showUploadList={false}
                                onChange={handleChange}

                            >
                                {
                                    formData.topicImg ?
                                        <Avatar size="large" shape="square" src={'/images/' + formData.topicImg} alt=""
                                                className="avatar"/> :
                                        <Icon type="plus" className="avatar-uploader-trigger"/>
                                }
                            </Upload>
                            {getFieldDecorator('topicImg', {
                                initialValue: formData.topicImg,
                                rules: [ {required: true, message: '请上传图片封面！'} ],
                            })(
                                <Input type="hidden"/>
                            )}

                        </FormItem>
                    </div>
                    <div className="form-item">
                        <FormItem label="话题名称" labelCol={{style: {width: '100px', textAlign: 'right'}}}>
                            {getFieldDecorator('topicName', {
                                rules: [ {required: true, message: '请输入话题名称！'} ],
                                initialValue: formData.topicName
                            })(
                                <Input style={{width: 300}} placeholder="请输入话题名称"/>
                            )}
                        </FormItem>
                    </div>
                    <div className="form-item">
                        <FormItem label="话题简介" labelCol={{style: {width: '100px', textAlign: 'right'}}}>
                            {getFieldDecorator('topicInfo', {
                                rules: [ {required: true, message: '请输入话题简介！'} ],
                                initialValue: formData.topicInfo
                            })(
                                <TextArea rows={4} style={{width: 300}} placeholder="请输入话题简介"/>
                            )}

                        </FormItem>
                    </div>
                    <div className="form-item">
                        <FormItem label="状态" labelCol={{style: {width: '100px', textAlign: 'right'}}}>
                            {getFieldDecorator('status', {
                                rules: [ {required: true, message: '请选择状态！'} ],
                                initialValue:formData.status
                            })(
                                <RadioGroup>
                                    <Radio value={0}>禁用</Radio>
                                    <Radio value={1}>启用</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
);

class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeImg: '',
            topicList: [],
            visible: false,
            imageUrl: '',
            formStatus:0,
            total:0,
            page:1,
            pageSize:5,
            formData: {
                topicImg:'',
                topicInfo:'',
                topicName:'',
                status:''
            },
        };
        this.searchKey = {};
        this.columns = [ {
            title: '话题封面',
            dataIndex: 'topicImg',
            width: 100,
            render: text => <img alt="" className="topic-img" src={'/images/' + text}/>
        }, {
            title: '话题名称',
            width: 100,
            dataIndex: 'topicName',
        }, {
            title: '话题简介',
            width: 200,
            dataIndex: 'topicInfo',
        },
            {
                title: '关注人数',
                width: 50,
                dataIndex: 'size',
                sorter: (a, b) => a.size - b.size,
            },
            {
                title: '状态',
                width: 50,
                dataIndex: 'status',
                render: text => text ? '在线' : '禁止'
            },
            {
                title: '创建时间',
                width: 150,
                dataIndex: 'createDate',
                render: date => new Date(date).format('yyyy-MM-dd mm:hh:ss'),
                sorter: (a, b) => new Date(a.createDate).getTime() - new Date(a.createDate).getTime(b.createDate)
            },
            {
                title: '操作',
                width: 50,
                dataIndex: '',
                render: (text,record) => {
                    return(
                        <Icon type="edit" onClick={this.editByTopic(record)}/>
                    )
                }
            }
        ];
    }

    rowSelection = {
        onChange: (pagination, filters, sorter) => {
            console.log('params', pagination, filters, sorter);
        }
    }

    editByTopic = (record) =>{
        return ()=>{
            this.setState({
                visible: !this.state.visible,
                formData: record,
                formStatus:1
            });
            if(!this.state.visible){
                this.topicForm.resetFields();
            }
        }
    }


    showAddTopicBox = () => {
        this.setState({
            formStatus:0,
            visible: ! this.state.visible
        });

    }

    getTopicList = async () => {
        let result = await getTopicList({page:this.state.page,pageSize: this.state.pageSize,...this.searchKey});
        if (result) {
            this.setState({
                topicList: result.data.list,
                total:result.data.total
            });
        }
    }

    searchTopicList  = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.searchKey = values;
                this.getTopicList();
            }
        });
    }

    handleChange = async (info) => {
        let data = new FormData();
        data.append('file', info.file.originFileObj);
        if(info.file.status === 'error'){
            let result = await uploadHead(data);
            if (result) {
                this.setState({
                    formData: Object.assign(this.state.formData,{topicImg:result.imgUrl})
                })
            }
        }

    }

    handleSubmit = () => {
        const form = this.topicForm;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }

            let result = '';
            if(!this.state.formStatus){
                result =  await addTopic(values);
            }else{
                values._id = this.state.formData.key;
                result =  await updateTopic(values);
            }
            if (result) {
                this.setState({
                    visible: false,
                    formData:{}
                });
                form.resetFields();
                this.getTopicList();
            }
        });
    }


    componentDidMount() {
        this.getTopicList();
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        return (
            <div className="topic-table-box">
                <Form layout="inline"  onSubmit={this.searchTopicList} className="form-box">
                    <FormItem label="话题名称">
                        {getFieldDecorator('topicNameKey', {
                        })(
                            <Input
                                placeholder="话题名称"
                                style={{width: 200}}
                            />
                        )}
                    </FormItem>
                    <FormItem label="是否启用">
                        {getFieldDecorator('topicStatus', {
                            initialValue: ''
                        })(
                            <Select  style={{width: 120}}>
                                <Option value="">全部</Option>
                                <Option value="0">否</Option>
                                <Option value="1">是</Option>
                            </Select>
                        )}

                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" icon="search">搜索</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.showAddTopicBox}>
                            <Icon type="plus-circle-o"/>添加话题
                        </Button>
                    </FormItem>
                </Form>
                <Table columns={this.columns}  pagination={false}  rowSelection={this.rowSelection} dataSource={this.state.topicList}
                       bordered/>
                <Pagination className="pageContiner"  defaultCurrent={this.state.page} defaultPageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChange} />
                <CollectionCreateForm
                    ref={form => this.topicForm = form}
                    visible={this.state.visible}
                    onCancel={this.showAddTopicBox}
                    onCreate={this.handleSubmit}
                    handleChange={this.handleChange}
                    formData={this.state.formData}
                />
            </div>

        );
    }
}
const TopicListModel = Form.create()(TopicList);
export default connect(null)(TopicListModel);
