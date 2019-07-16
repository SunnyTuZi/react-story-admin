/**
 * Create by Zwl on 2019/5/9
 * @Description: 接口清单
 */


import axios from '../until/axios';

/**
 * 统一post请求
 * @param url
 * @param data
 * @returns {Promise<void>}
 */
const postAjax = async (url,data) =>{
  return await axios.post(url,data).then(
    (result) =>{
      return result;
    }
  )
}
/**
 * 统一get请求
 * @param url
 * @param data
 * @returns {Promise<T | *>}
 */
const getAjax = async(url,data) =>{
  return await axios.get(url,{params:data}).then(
    (result) =>{
      return result;
    }
  )
}

/**
 * 检验token
 * @returns {Promise<T|*>}
 */
export const checkToken = (data) => postAjax('api/admin/checkToken',data);

/**
 * 登陆
 * @param data
 * @returns {Promise<*>}
 */
export const login = (data) => postAjax('./api/admin/login',data);

/**
 * 获取验证码图片
 * @returns {Promise<T|*>}
 */
export const getCode = () => getAjax('./api/user/getCode',{});

/**
 * 获取总数据
 * @returns {Promise<T|*>}
 */
export const getDataTotal = () => getAjax('api/admin/getDataTotal',{});

/**
 * 访问量统计
 * @returns {Promise<T|*>}
 */
export const getVisitCount = () => getAjax('api/visit/getVisitCount',{});

/**
 * 话题列表
 * @returns {Promise<T|*>}
 */
export const getTopicList = (data) => getAjax('/api/topic/getTopicList',data);

/**
 * 首页折线列表
 * @returns {Promise<T|*>}
 */
export const getLineData = (data) => getAjax('/api/admin/getLineData',data);










