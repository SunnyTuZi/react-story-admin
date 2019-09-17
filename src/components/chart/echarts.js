import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/map';
import  'echarts/lib/chart/radar';
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/angleAxis';
import 'echarts/lib/component/radar';
import 'echarts/lib/component/legend';


class ReactChart extends React.Component {
    constructor(props) {
        super(props);
        this.chart = null;
    }
    componentWillUpdate(){
        this.chart = echarts.init(this.refDom)
        this.chart.setOption(this.props.options);
        window.addEventListener('resize',()=>{
            this.chart.resize();
        });
    }

    componentDidUpdate(){
        if(this.chart){
            this.chart.setOption(this.props.options);
        }

    }
    render() {
        return (
            <div className="chart-box" style={{width:'100%',height:'100%'}} ref={ref => this.refDom = ref}>
            </div>
        );
    }
}
export default ReactChart;
