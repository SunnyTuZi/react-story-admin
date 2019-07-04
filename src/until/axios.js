/**
 * Create by Zwl on 2019/7/03
 * @Description: 接口请求拦截器
 */


import axios from 'axios';
import {getStore, setStore} from "./localStorage";
import {message} from 'antd';

const _axios = axios.create({
    headers: {'content-type': 'application/json;charset=UTF-8'}
});

//请求失败统一处理
const commonError = (error) => {
    let res = error.response;
    if (res.status === 401) {
        if (getStore('token')) {
            if (res.data.msg) {
                message.error(res.data.msg);
            }
        } else {
            message.error('请先登陆');
        }
        setStore('token', '');
    }
    return error
}

// 添加一个请求拦截器
_axios.interceptors.request.use(function (config) {
    const token = getStore('token');
    config.headers.common[ 'Authorization' ] = 'Bearer ' + token;
    return config;
}, function (error) {
    commonError(error)
});


// 添加一个响应拦截器
_axios.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        message.error('服务器错误，请稍后重试~');
    } else {
        if (response.data.code !== 1) {
            message.error(response.data.msg);
            return null;
        } else {
            if (response.data.msg) {
                message.error(response.data.msg);
                return null;
            }
        }
    }
    return response.data;
}, function (error) {
    commonError(error);
});


export default _axios;

