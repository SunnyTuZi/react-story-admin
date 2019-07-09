/**
 * Create by Zwl on 2019/7/8
 * @Description:
 */

import React from 'react';
import './index.less';

import {Icon} from 'antd';

class TotalItem extends React.Component {
    render() {
        return (
            <div className="total-box">
                <Icon style={{color:this.props.color}} type={this.props.iconType} className="icon-box"></Icon>
                <div className="item-con">
                    <p className="text">{this.props.title}</p>
                    <p className="num">{this.props.num}</p>
                </div>
            </div>
        );
    }
}

export default TotalItem;
