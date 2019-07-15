import React from 'react';
import { connect } from "react-redux";
import './App.less';
import './until/common';
import MenuItem from './components/menu/menuItem';
import HeaderItem from './components/header/headerItem';
import MainRoute from './router/main';
import {Layout} from 'antd';
import {getStore} from "./until/localStorage";
import {checkToken} from "./services/apiList";
import {withRouter} from 'react-router-dom';
const {Content} = Layout;

function mapStateToProps(state) {
    const { adminInfo } = state.admin;
    return {adminInfo};
};

class App extends React.Component {
    async checkTokenStatu(){
        var token = getStore('token');
        if(token){
            let result = await checkToken({token});
            if(result){
                this.props.history.push('/admin');
            }else{
                this.props.history.push('/login');
            }
        }else{
            this.props.history.push('/login');
        }
    }
    componentDidMount(){
        this.checkTokenStatu();
    }
    render() {
        return (
            <div className="App">
                <Layout className="layout-box">
                    <MenuItem className="slider"/>
                    <Layout className="layout-content">
                        <HeaderItem className="heaeder"/>
                        <Content className="content">
                            <MainRoute />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
const AppCom = withRouter(App);
export default connect(mapStateToProps)(AppCom);
