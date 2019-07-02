import React from 'react';
import './App.less';

import MenuItem from './components/menu/menuItem';
import HeaderItem from './components/header/headerItem';
import {Layout} from 'antd';
const {Content} = Layout;

class App extends React.Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: ! this.state.collapsed,
        });
    }
    render() {
        return (
            <div className="App">
                <Layout className="layout-box">
                    <MenuItem className="slider"/>
                    <Layout className="layout-content">
                        <HeaderItem className="heaeder"/>
                        <Content className="content">
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
