/**
 * Create by Zwl on 2019/7/1
 * @Description:
 */

import React from 'react';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import App from '../App';
import Login from '../pages/login/login';

const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login}/>
            <Route path="/admin" component={App} />
        </Switch>
    </Router>
);
export default BasicRoute;
