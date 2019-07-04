/**
 * Create by Zwl on 2019/7/2
 * @Description:
 */

import React from 'react';
import './index.less';
import { Row, Col } from 'antd';

class FlowAnalysis extends React.Component {
    render() {
        return (
            <section className="continer-box">
                <div className="chart-box-1 chat-list">
                    <Row gutter={20}>
                        <Col span={6} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                    </Row>
                </div>
                <div className="chat-box-2 chat-list">
                    <Row gutter={20}>
                        <Col span={18} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                        <Col span={6} className="chart-box">
                            <Row className="row-flex">
                                <Col span={24} className="row-flex-item">
                                    <div className="total-item"></div>
                                </Col>
                                <Col span={24} className="row-flex-item">
                                    <div className="total-item"></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="chat-box-3 chat-list">
                    <Row gutter={20}>
                        <Col span={12} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                        <Col span={12} className="chart-box">
                            <div className="total-item"></div>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
}

export default FlowAnalysis;


