/**
 * Create by Zwl on 2019/7/1
 * @Description:
 */


import React from 'react';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import App from '../App';
import Login from '../pages/login/login';
import FlowAnalysis from '../pages/index/index';


const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login}/>
        </Switch>
    </Router>
);


export default BasicRoute;
