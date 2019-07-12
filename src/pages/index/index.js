/**
 * Create by Zwl on 2019/7/2
 * @Description:
 */
import React from 'react';
import './index.less';
import { Row, Col,Table } from 'antd';
import {getDataTotal,getVisitCount} from "../../services/apiList";
import TotalItem from '@components/total/item';
import ReactChart from '@components/chart/echarts';


var option3 = {
    title: {
        text: '话题统计'
    },
    tooltip: {},
    legend: {
        data: ['关注人数', '发表次数'],
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
        indicator: [
            { name: '鬼故事', max: 6500},
            { name: '情感', max: 16000},
            { name: '纪实', max: 30000},
            { name: '励志', max: 38000},
            { name: '玄幻', max: 52000},
            { name: '搞笑', max: 25000}
        ]
    },
    series: [{
        type: 'radar',
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '关注人数'
            },
            {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '发表次数'
            }
        ]
    }]
};

var option4 = {
    title: {
        text: '站内统计'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['新增用户','新增群组','发表次数','访问次数']
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
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'新增用户',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'新增群组',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'发表次数',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'访问次数',
            type:'line',
            smooth: true,
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        }
    ]
};

const columns = [{
    title: 'Head',
    dataIndex: 'head',
}, {
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Fans',
    dataIndex: 'fans',
}];
const data1 = [{
    key: '1',
    head: '/images/1.jpg',
    name: 'Green',
    fans:10,
}, {
    key: '2',
    name: 'Jim Green',
    head: '/images/1.jpg',
    fans:10,
}, {
    key: '3',
    name: 'Joe Black',
    head: '/images/1.jpg',
    fans:10,
},{
    key: '4',
    name: 'Joe Black',
    head: '/images/1.jpg',
    fans:10,
}];
class FlowAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {indexData: {},option2:{}};
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
            }
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
    componentDidMount(){
        this.getIndexData();
        this.getVisitCount();
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
                                <ReactChart options={option4}></ReactChart>
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
                                        <ReactChart options={option3}></ReactChart>
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
                                <Table pagination={false} style={{width:'100%',height:'100%',padding: '20px'}} columns={columns} dataSource={data1} size="middle" />
                            </div>
                        </Col>
                        <Col span={12} className="chart-box">
                            <div className="total-item">
                                <Table pagination={false} style={{width:'100%',height:'100%',padding: '20px'}} columns={columns} dataSource={data1} size="middle" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
}

export default FlowAnalysis;


