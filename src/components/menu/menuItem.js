import React from 'react';
import {Layout, Menu ,Icon} from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

class MenuItem extends React.Component {
    state = {
        current: 'mail',
    }
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="user" />
                            <span>流量分析</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/login">
                            <Icon type="user" />
                            <span>故事</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/index">
                            <Icon type="user" />
                            <span>话题</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default MenuItem;

