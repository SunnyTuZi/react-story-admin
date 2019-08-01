import React from 'react';
import { connect } from "react-redux";
import './headerItem.less';
import {Layout,Icon,Avatar,Dropdown,Menu} from 'antd';
import {Link} from 'react-router-dom';

const {Header} = Layout;

const userMenu = (
    <Menu>
        <Menu.Item>
            <Link to="/login">注销</Link>
        </Menu.Item>
    </Menu>
);

function mapStateToProps(state) {
    const { adminInfo } = state.admin;
    return {adminInfo};
};

class HeaderItem extends React.Component {

    render() {
        return (
            <Header className="header-box" style={{left:this.props.collapsed ? '79px':'250px', transition:'200ms'}}>
                <div className="menu-icon">
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                        style={{marginLeft: '20px'}}
                    />
                </div>
                <div className="right-continer">
                    <Dropdown overlay={userMenu} placement="bottomLeft">
                        <div>
                            <span className="user-name">{this.props.adminInfo.account}</span>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        </div>
                    </Dropdown>
                </div>
            </Header>
            );
    }
}

export default connect(mapStateToProps)(HeaderItem);

