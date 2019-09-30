# 前言

这是故事汇的管理后台，根据故事汇的数据统计成表单和图形展示，还可以进行一些数据的管理操作。


## 技术栈

react + react-router + redux + webpack + ES6/7 + axios + less + flex + echart + antd


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
git clone https://github.com/SunnyTuZi/react-story-admin

cd react-story-admin

npm install 或 yarn(推荐)

npm run start

访问地址：http://localhost:8800/

```
## 关于接口数据

由于本系统用的不是静态数据，所以要跑起来的话，还需要搭配后台运行。[后台项目传送地址](https://github.com/SunnyTuZi/koa2-story.git)。

同时我们也提供了基于`vue&mint-ui`搭建的[前端页面传送地址](https://github.com/SunnyTuZi/vue2-story.git)

学习不是一天两天的事，希望大家多点耐心哟～


# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目


# 目标功能
- [x] 登陆 -- 完成
- [x] 总流量分析 -- 完成
- [x] 故事列表 -- 完成
- [x] 故事流量分析 -- 完成
- [x] 话题列表 -- 完成
- [x] 话题添加 -- 完成
- [x] 话题修改 -- 完成
- [x] 话题流量分析 -- 完成
- [x] 广场列表 -- 完成
- [x] 广场流量分析 -- 未完成
- [x] 用户列表 -- 完成
- [x] 用户流量分析-- 未完成


# 总结

1、这也算是初稿，自己完成的一个东西，可能页面不好看，或者功能不完善，也会有bug,也请大家多多体谅。


# 最终目标

1、用koa2构建的后台系统。[地址在这里](https://github.com/SunnyTuZi/koa2-story.git)

2、用vue构建的前端管理页面 [地址在这里](https://github.com/SunnyTuZi/vue2-story.git)

所以我的目的是构建一个横跨前后端，vue2和react的项目，让大家可以多样化学习

。。。敬请期待




# 部分截图


### 总流量分析页

<img src="https://github.com/SunnyTuZi/vue2-story/blob/master/showImages/index.jpg" width="100%"/>

### 故事管理

<img src="https://github.com/SunnyTuZi/vue2-story/blob/master/showImages/storyList.jpg" width="100"/>
<img src="https://github.com/SunnyTuZi/vue2-story/blob/master/showImages/storyChart.jpg" width="100"/>

### 话题管理

<img src="https://github.com/SunnyTuZi/vue2-story/blob/master/showImages/topicList.jpg" width="100"/>
<img src="https://github.com/SunnyTuZi/vue2-story/blob/master/showImages/topicChart.jpg" width="100"/>


# 项目布局

```
.
├── config-overrides.js                         // 打包配置文件
├── showImages                                  // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 公用组件
│   │   ├── chart
│   │   │   ├── echarts.js                      // 公用echart组件
│   │   ├── menu
│   │   │   ├── menuItem.js                     // 公用菜单
│   │   ├── header
│   │   │   ├── headerItem.js                   // 公用头部
│   │   ├── total
│   │   │   ├── item.js                         // 分类统计组件
│   ├── pages
│   │   ├── bubble
│   │   │   ├── list.js                         // 聊天分组列表
|   |   |   ├── Chat.vue                        // 群组聊天
│   │   │   └── List.vue                        // 分组列表
│   │   ├── index
│   │   │   └── index.js                        // 总流量分析页面
│   │   ├── login
│   │   │   └── login.js                        // 登陆页
│   │   ├── story
│   │   │   ├── list.js                         // 故事表单
|   |   |   ├── analysis.js                     // 故事流量分析
│   │   ├── topic
│   │   │   |── list.js                         // 话题表单
│   │   │   |── analysis.js                     // 话题流量分析
│   │   ├── user
│   │   │   └── index.js                        // 用户表单
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── apiList.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   ├── redux                                   // vuex的状态管理
│   │   ├── actions.js                          // 配置actions
│   │   ├── reducers
|   │   ├    ├── index.js                       //combineReducers
|   │   ├    └── admin.js                       //设置store
│   │   ├── actionsTypes.js                     // 定义常量名
│   │   └── store.js                            // 创建store
│   ├── until
│   │   ├── axios.js                            // axios再次封装
│   │   ├── common.js                           // 公共js函数
│   │   └── localStorage.js                     // 据本地储存公共函数
│   ├── setupProxy.js                           //代理配置
│   └── App.js                                  //入口文件
.

```
# License
