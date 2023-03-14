import request from './request'
import Qs from 'qs'

// 获取用户信息
export const getUserInfo = function(params) {
  return request.get('/dform/getUserInfo', params)
  // return request.get('/mock/getUserInfo.json', params)
}

// 获取pv、uv统计
export const getPUV = function(params) {
  return request.get('/dform/index/getIndex', Qs.stringify(params))
}

// 获取框架列表
export const getFrameList = function(params) {
  return request.post('/dform/frameDaquan/select', Qs.stringify(params))
}

// 根据关键词搜索框架
export const getSchFrame = function(params) {
  return request.post('/dform/frameDaquan/search', Qs.stringify(params))
}
