import React from 'react';
import {connect} from "react-redux";
import './analysis.less';
import {getTopicFollowData,getTop5TopiByStory,getHotTopic} from "../../services/apiList";
import {Row, Col,Table,Avatar } from 'antd';
import ReactChart from '@components/chart/echarts';

const storyColumns = [{
    title: '话题封面',
    dataIndex: 'head',
    render: (text,record)=>{
        return(
            <div className="user-icon">
                <Avatar src={'/images/' + record.topicImg} alt="" />
            </div>
        )
    }
}, {
    title: '话题名称',
    dataIndex: 'topicName',
}, {
    title: '关注人数',
    dataIndex: 'fans',
}];

class storyAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyList: [],
            total:0,
            page:1,
            pageSize:5,
            topStory:[],
            lineOption:{},
            hotChatOption:{}
        };

    }

    async getTopicFollowData(){
        let titleArr = [],dataArr = [];
        let result = await getTopicFollowData();
        if(result){
            let datas = result.data;
            for(let i = datas.length-1;i>=0;i--){
                let item = datas[i];
                titleArr.push(item._id);
                dataArr.push(item.count);
            }

            this.setState({
                lineOption:{
                    title:{
                        text:'最近一年的话题关注量'
                    },
                    xAxis: {
                        type: 'category',
                        data: titleArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    series: [{
                        name:'发表数量',
                        data:dataArr,
                        type: 'line',
                        smooth: true
                    }]
                }
            })
        }
    }

    async getHotStoryToday(){
        let result = await getTop5TopiByStory();
        if(result){
            let dataArr = [], lengendArr = [],len = result.data.length;
            for(let i=0;i<len;i++){
                let item = result.data[i];
                lengendArr.push(item.topicName);
                dataArr.push({name:item.topicName,value:item.size});
            }
            this.setState({
               hotChatOption: {
                   title: {
                       text: '话题发布量',
                       x: 'center'
                   },
                   tooltip: {
                       trigger: 'item',
                       formatter: "{a} <br/>{b} : {c} ({d}%)"
                   },
                   legend: {
                       x: 'center',
                       y: 'bottom',
                       data: lengendArr
                   },
                   toolbox: {
                       show: true,
                       feature: {
                           mark: {show: true},
                           dataView: {show: true, readOnly: false},
                           magicType: {
                               show: true,
                               type: [ 'pie', 'funnel' ]
                           },
                           restore: {show: true},
                           saveAsImage: {show: true}
                       }
                   },
                   calculable: true,
                   series: [
                       {
                           name: '半径模式',
                           type: 'pie',
                           radius: [ 20, 110 ],
                           center: [ '50%', '50%' ],
                           roseType: 'radius',
                           label: {
                               normal: {
                                   show: true
                               },
                               emphasis: {
                                   show: true
                               }
                           },
                           lableLine: {
                               normal: {
                                   show: false
                               },
                               emphasis: {
                                   show: true
                               }
                           },
                           data: dataArr
                       } ]
               }
            });
        }
    }

    async getHotTopic(){
        let result = await getHotTopic({pageSize:10});
        if(result){
            this.setState({
                topStory:result.data
            })
        }
    }

    componentDidMount(){
        this.getTopicFollowData();
        this.getHotStoryToday();
        this.getHotTopic();
    }

    render() {
        return (
            <section className="continer-box analysis-box">
                <Row gutter={20}>
                    <Col span={16}>
                        <div className="chart-box">
                            <ReactChart options={this.state.lineOption}></ReactChart>
                        </div>
                        <div className="chart-box">
                            <ReactChart options={this.state.hotChatOption}></ReactChart>
                        </div>
                    </Col>
                    <Col span={8} className="table-chart">
                        <Table pagination={false} style={{width:'100%',height:'100%',padding: '20px'}} columns={storyColumns} dataSource={this.state.topStory} size="middle" />
                    </Col>
                </Row>
            </section>
        );
    }
}
export default connect(null)(storyAnalysis);
