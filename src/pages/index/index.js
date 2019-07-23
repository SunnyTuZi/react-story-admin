/**
 * Create by Zwl on 2019/7/2
 * @Description:
 */
import React from 'react';
import './index.less';
import { Row, Col,Table,Avatar  } from 'antd';
import {getDataTotal,getVisitCount,getLineData,getTopicData,getHotUser,getHotTopic} from "../../services/apiList";
import TotalItem from '@components/total/item';
import ReactChart from '@components/chart/echarts';


const userColumns = [{
    title: '用户头像',
    dataIndex: 'head',
    render: (src) => <Avatar  src={'images'+src} alt=""/>
}, {
    title: '用户昵称',
    dataIndex: 'username',
}, {
    title: 'Fans',
    dataIndex: 'fans',
}];

const topicColumns = [{
    title: '话题封面',
    dataIndex: 'topicImg',
    render: (src) => <Avatar  src={'images'+src} alt=""/>
}, {
    title: '话题名称',
    dataIndex: 'topicName',
}, {
    title: '关注人数',
    dataIndex: 'fans',
}];

class FlowAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {indexData: {},option2:{},option3:{},option4:{},hotUser:[],hotTopic:[]};
    }
    async getIndexData(){
        let result = await getDataTotal();
        if(result){
            this.setState({
               indexData:result.data
            });
        }
    }
    async getVisitCount(){
        let result = await getVisitCount();
        if(result){
            var dataObj = result.data;
            var lengend = [],textArr=[],series = [],textArrStatus = false;
            for(let key in dataObj){
                let arr = [];
                for(let key1 in dataObj[key]){
                    arr.push(dataObj[key][key1]);
                    if(!textArrStatus) textArr.push(key1);

                }
                textArrStatus = true;
                series.push({
                    type:'bar',
                    data:arr,
                    coordinateSystem:'polar',
                    name:key,
                    stack:'a'
                });
                lengend.push(key);
            };

            this.setState({option2:{
                title:{text:'访问统计'},
                angleAxis: {
                    type: 'category',
                    data: textArr,
                    z: 10
                },
                grid:{
                    width:'60%'
                },
                radiusAxis: {
                },
                polar: {
                    radius:'60%'
                },
                series: series,
                legend: {
                    show: true,
                    data: lengend,
                    bottom: 10,
                    left:10,
                    orient:'vertical'
                }
            }});
        }
    }

    async getLineData(){
        let result = await getLineData();
        if(result){
            var legend = [],titleArr = [],series = [],status = false, filedObj = {story:'新增故事',group:'新增群组',visit:'新增访客',user:'新增用户'};
            for(let key in result.data){
                legend.push(filedObj[key]);
                let arr = result.data[key];
                let item = [];
                for (let i = 0; i < arr.length; i ++) {
                    if(!status) titleArr.push(arr[i]._id);
                    item.push(arr[i].count);
                }
                let obj = {
                    name:filedObj[key],
                    type:'line',
                    smooth: true,
                    data:item
                }
                series.push(obj);
                status = true;
            }
            this.setState({
                option4:{
                    title: {
                        text: '数据统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:legend
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: titleArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: series
                }
            });
        }
    }

    async getTopicData(){
        let result = await getTopicData();
        if(result){
            let legend = [],serieArr=[],indicatorArr = [],objKey = {storys:'发表次数',tfs:'关注人数'},dataObj = {};
            let dataArr = result.data;
            for (let i = 0; i <dataArr.length ; i ++) {
                let item = dataArr[i];
                indicatorArr.push({name:item.topicName,max:5});
                for(let key in objKey){
                    dataObj[objKey[key]] = dataObj[objKey[key]] || [];
                    dataObj[objKey[key]].push(item[key]);
                }
            }
            for(let key in dataObj){
                legend.push(key);
                serieArr.push({
                   name:key,
                   value: dataObj[key]
                });
            }
            this.setState({
                option3:{
                    title: {
                        text: '话题统计'
                    },
                    tooltip: {},
                    legend: {
                        data: legend,
                        bottom: 10,
                        left:10,
                        orient:'vertical'
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        radius:'60%',
                        indicator: indicatorArr
                    },
                    series: [{
                        type: 'radar',
                        data : serieArr
                    }]
                }
            })
        }
    }

    async getHotUser(){
        let result = await getHotUser();
        if(result){
            this.setState({
                hotUser:result.data
            })
        }
    }

    async getHotTopic(){
        let result = await getHotTopic();
        if(result){
            this.setState({
                hotTopic:result.data
            })
        }
    }

    componentDidMount(){
        this.getIndexData();
        this.getVisitCount();
        this.getLineData();
        this.getTopicData();
        this.getHotUser();
        this.getHotTopic();
    }

    render() {
        return (
            <section className="continer-box">
                <div className="chart-box-1 chat-list">
                    <Row gutter={20}>
                        <Col span={6} className="chart-box">
                            <div className="total-item">
                                <TotalItem iconType='team' color='#87d068' title='用户总数' num={this.state.indexData.userTotal}></TotalItem>
                            </div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <div className="total-item">
                                <TotalItem iconType='book' color='#30abe2' title='故事总数' num={this.state.indexData.storyTotal}/>
                            </div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <div className="total-item">
                                <TotalItem iconType='notification' color='#3dd2bb' title='话题总数' num={this.state.indexData.topicTotal}></TotalItem>
                            </div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <div className="total-item">
                                <TotalItem iconType='contacts' color='#f58462' title='历史群组' num={this.state.indexData.groupTotal}></TotalItem>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="chat-box-2 chat-list">
                    <Row gutter={20}>
                        <Col span={18} className="chart-box">
                            <div className="total-item">
                                <ReactChart options={this.state.option4}></ReactChart>
                            </div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <Row className="row-flex">
                                <Col span={24} className="row-flex-item">
                                    <div className="total-item">
                                        <ReactChart options={this.state.option2}></ReactChart>
                                    </div>
                                </Col>
                                <Col span={24} className="row-flex-item">
                                    <div className="total-item">
                                        <ReactChart options={this.state.option3}></ReactChart>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="chat-box-3 chat-list">
                    <Row gutter={20}>
                        <Col span={12} className="chart-box">
                            <div className="total-item">
                                <Table pagination={false} style={{width:'100%',height:'100%',padding: '20px'}} columns={userColumns} dataSource={this.state.hotUser} size="middle" />
                            </div>
                        </Col>
                        <Col span={12} className="chart-box">
                            <div className="total-item">
                                <Table pagination={false} style={{width:'100%',height:'100%',padding: '20px'}} columns={topicColumns} dataSource={this.state.hotTopic} size="middle" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
}

export default FlowAnalysis;


