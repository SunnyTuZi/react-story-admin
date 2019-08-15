/**
 * Create by Zwl on 2019/7/3
 * @Description:
 */

import React from 'react';
import {Route,Switch } from "react-router-dom";
import FlowAnalysis from '../pages/index/index';
import TopicList from '../pages/topic/list';
import StoryList from '../pages/story/list';
import UserList from '../pages/user/list';

const MainRoute = () => (
    <Switch>
        <Route path="/admin/index" component={FlowAnalysis} />
        <Route path="/admin/topicList" component={TopicList} />
        <Route path="/admin/storyList" component={StoryList} />
        <Route path="/admin/UserList" component={UserList} />
    </Switch>
);


export default MainRoute;
