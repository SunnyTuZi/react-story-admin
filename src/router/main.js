/**
 * Create by Zwl on 2019/7/3
 * @Description:
 */

import React from 'react';
import {Route,Switch } from "react-router-dom";
import FlowAnalysis from '../pages/index/index';

const MainRoute = () => (
    <Switch>
        <Route path="/admin" component={FlowAnalysis} />
    </Switch>
);


export default MainRoute;
