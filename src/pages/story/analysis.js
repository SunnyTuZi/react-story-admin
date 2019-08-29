import React from 'react';
import {connect} from "react-redux";
import './list.less';
import {getStoryBar} from "../../services/apiList";
import {Row, Col} from 'antd';
import ReactChart from '@components/chart/echarts';


class storyAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyList: [],
            total:0,
            page:1,
            pageSize:5,
            barOption:{}
        };

    }

    async getStoryBarData(){
        let titleArr = [],dataArr = [];
        let result = await getStoryBar();
        if(result){
            let datas = result.data;
            for(let i = datas.length-1;i>=0;i--){
                let item = datas[i];
                titleArr.push(item._id);
                dataArr.push(item.count);
            }

            this.setState({
                barOption:{
                    title:{
                        text:'一年-故事发表数'
                    },
                    xAxis: {
                        type: 'category',
                        data: titleArr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: dataArr,
                        type: 'bar'
                    }]
                }
            })
        }
    }

    componentDidMount(){
        this.getStoryBarData()
    }

    render() {
        return (
            <section className="continer-box">
                <Row gutter={20}>
                    <Col span={16}>
                        <div className="chart-box">
                            <ReactChart options={this.state.barOption}></ReactChart>
                        </div>
                        <div className="chart-box"></div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </section>
        );
    }
}
export default connect(null)(storyAnalysis);
