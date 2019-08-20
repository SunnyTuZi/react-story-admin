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
import BubbleList from '../pages/bubble/list';

const MainRoute = () => (
    <Switch>
        <Route path="/admin/index" component={FlowAnalysis} />
        <Route path="/admin/topicList" component={TopicList} />
        <Route path="/admin/storyList" component={StoryList} />
        <Route path="/admin/userList" component={UserList} />
        <Route path="/admin/bubbleList" component={BubbleList} />
    </Switch>
);


export default MainRoute;
