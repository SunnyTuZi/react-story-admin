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
export const checkToken = (data) => postAjax('/api/admin/checkToken',data);

/**
 * 登陆
 * @param data
 * @returns {Promise<*>}
 */
export const login = (data) => postAjax('/api/admin/login',data);

/**
 * 获取验证码图片
 * @returns {Promise<T|*>}
 */
export const getCode = () => getAjax('/api/user/getCode',{});

/**
 * 获取总数据
 * @returns {Promise<T|*>}
 */
export const getDataTotal = () => getAjax('/api/admin/getDataTotal',{});

/**
 * 访问量统计
 * @returns {Promise<T|*>}
 */
export const getVisitCount = () => getAjax('/api/visit/getVisitCount',{});

/**
 * 话题列表
 * @returns {Promise<T|*>}
 */
export const getTopicList = (data) => getAjax('/api/admin/getTopicList',data);

/**
 * 首页折线列表
 * @returns {Promise<T|*>}
 */
export const getLineData = (data) => getAjax('/api/admin/getLineData',data);

/**
 * 上传图片
 * @returns {Promise<T|*>}
 */
export const uploadHead = (data) => postAjax('/api/admin/upload',data);

/**
 * 添加话题
 * @returns {Promise<T|*>}
 */
export const addTopic = (data) => postAjax('/api/topic/addTopic',data);

/**
 * 修改话题
 * @returns {Promise<T|*>}
 */
export const updateTopic = (data) => postAjax('/api/admin/updateTopic',data);

/**
 * 获取话题雷达
 * @returns {Promise<T|*>}
 */
export const getTopicData = (data) => getAjax('/api/admin/getTopicData',data);

/**
 * 获取热门用户
 * @returns {Promise<T|*>}
 */
export const getHotUser = (data) => getAjax('/api/admin/getHotUser',data);

/**
 * 获取热门用户
 * @returns {Promise<T|*>}
 */
export const getHotTopic = (data) => getAjax('/api/admin/getHotTopic',data);

/**
 * 获取故事列表
 * @returns {Promise<T|*>}
 */
export const getStoryList = (data) => getAjax('/api/admin/getStoryList',data);

/**
 * 修改故事状态
 * @returns {Promise<T|*>}
 */
export const updateStoryStatus = (data) =>postAjax('/api/admin/updateStoryStatus',data);

/**
 * 获取用户列表
 * @returns {Promise<T|*>}
 */
export const getUserList = (data) => getAjax('/api/admin/getUserList',data);

/**
 * 获取群组列表
 * @returns {Promise<T|*>}
 */
export const getGroupList = (data) => getAjax('/api/admin/getGroupList',data);

/**
 * 修改群组状态
 * @returns {Promise<T|*>}
 */
export const updateGroupStatus = (data) => getAjax('/api/admin/updateGroupStatus',data);













