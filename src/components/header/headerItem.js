import React from 'react';
import {Layout,Icon} from 'antd';

const {Header} = Layout;



class HeaderItem extends React.Component {
    state = {
        current: 'mail',
    }
    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    style={{marginLeft: '20px'}}
                />
            </Header>
            );
    }
}

export default HeaderItem;

