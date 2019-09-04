import React from 'react';
import {connect} from "react-redux";
import './analysis.less';
import {getStoryLine,getHotStoryToday,getTopStory} from "../../services/apiList";
import {Row, Col,Table,Avatar } from 'antd';
import ReactChart from '@components/chart/echarts';

const storyColumns = [{
    title: '作者',
    dataIndex: 'head',
    render: (text,record)=>{
        return(
            <div className="user-icon">
                <Avatar src={'/images/' + record.head} alt="" />
                <div>{record.author}</div>
            </div>
        )
    }
}, {
    title: '故事名称',
    dataIndex: 'storyName',
}, {
    title: '收藏人数',
    dataIndex: 'likeSize',
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

    async getStoryLineData(){
        let titleArr = [],dataArr = [];
        let result = await getStoryLine();
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
                        text:'最近一年的故事发表'
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
        let result = await getHotStoryToday();
        if(result){
            let badsArr = [],goodsArr= [] ,titleArr = [],len = result.data.length;
            for(let i=0;i<len;i++){
                let item = result.data[i];
                titleArr.push(item.storyName);
                badsArr.push(item.badSize);
                goodsArr.push(item.goodSize);
            }
            this.setState({
               hotChatOption:{
                   title:{
                       text:'今天热点故事'
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
                   xAxis: {
                       type: 'category',
                       data: titleArr
                   },
                   yAxis: {
                       type: 'value'
                   },
                   legend: {
                       data: ['顶','踩'],
                   },
                   series: [{
                       name:'顶',
                       data: goodsArr,
                       type: 'bar'
                   },{
                       name:'踩',
                       data: badsArr,
                       type: 'bar'
                   }]
               }
            })
        }
    }

    async getTopStory(){
        let result = await getTopStory();
        if(result){
            this.setState({
                topStory:result.data
            })
        }
    }

    componentDidMount(){
        this.getStoryLineData();
        this.getHotStoryToday();
        this.getTopStory();
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
