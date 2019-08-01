import React from 'react';
import './menuItem.less';
import {Layout, Menu ,Icon} from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const MenuList = [
    {
        id:1,
        name:'流量分析',
        path:'/admin/index'
    },{
        id:2,
        name:'故事管理',
        path:'/',
        chlid:[
            {
                id:21,
                name:'数据管理',
                path:'/admin/storyList'
            },{
                id:22,
                name:'流量分析',
                path:'/'
            }
        ]
    },{
        id:3,
        name:'话题管理',
        path:'/',
        chlid:[
            {
                id:31,
                name:'数据管理',
                path:'/admin/topicList'
            },{
                id:32,
                name:'流量分析',
                path:'/'
            }
        ]
    },
    {
        id:4,
        name:'广场管理',
        path:'/',
        chlid:[
            {
                id:41,
                name:'数据管理',
                path:'/'
            },{
                id:42,
                name:'流量分析',
                path:'/'
            }
        ]
    },
    {
        id:5,
        name:'用户管理',
        path:'/',
        chlid:[
            {
                id:51,
                name:'数据管理',
                path:'/'
            },{
                id:52,
                name:'流量分析',
                path:'/'
            }
        ]
    }
];


class MenuItem extends React.Component {
    state = {
        menuList:MenuList
    }
    render() {
        const renderParent = (item) =>{
            if(item.chlid){
                return renderChlid(item);
            }else{
                return (
                    <Menu.Item key={item.id}>
                        <Link to={item.path}>
                            <Icon type="user" />
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        }
        const renderChlid = (item) =>{
            return (
                <SubMenu key={item.id} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
                    {
                        item.chlid.map((item1)=>{
                            return renderParent(item1)
                        })
                    }
                </SubMenu>
            )
        }

        const menuHtml = MenuList.map((item)=>{
            return renderParent(item);
        });
        return (
            <Sider
                width="250px"
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                className="ant-layout-sider-light"
            >

                <div className="logo-box" >
                    <div className="logo-text">
                        {this.props.collapsed ? '':'故事汇总后台'}</div>
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    {menuHtml}
                </Menu>
            </Sider>
        );
    }
}

export default MenuItem;

