/**
 * Create by Zwl on 2019/7/3
 * @Description:
 */

import React from 'react';
import {Route,Switch } from "react-router-dom";
import FlowAnalysis from '../pages/index/index';
import TopicList from '../pages/topic/list';

const MainRoute = () => (
    <Switch>
        <Route path="/admin" component={FlowAnalysis} />
        <Route path="/topicList" component={TopicList} />
    </Switch>
);


export default MainRoute;
