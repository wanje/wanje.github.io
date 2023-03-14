import axios from 'axios'
import { message } from 'antd';

// 可在scripts命令行中设置以`REACT_APP_`开头的额外环境变量，须注意该方式设置的变量只能在执行shell时被读取到，平时在js中是不能读取到的
// axios.defaults.baseURL = process.env.REACT_APP_BASE_API;
// axios.defaults.withCredentials = true;
// axios.defaults.timeout = 1000;
// request interceptor
axios.interceptors.request.use(
  config => config,
  error => {
    // Do something with request error
    console.error(error); // for debug
    message.error(error.message);
    Promise.reject(error)
  }
);

// response interceptor
axios.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     message.error(res.message);
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 Modal 和 icon图标
  //       // import { Modal } from 'antd'
  //       // import { ExclamationCircleOutlined } from '@ant-design/icons';
  //       Modal.confirm({
  //         title: '确定登出',
  //         content: '你已被登出，可以取消继续留在该页面，或者重新登录',
  //         okText: '重新登录',
  //         okText: '重新登录',
  //         cancelText: '取消',
  //         icon: <ExclamationCircleOutlined />
  //       }).then(() => {
  //         location.reload()
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.error('err' + error); // for debug
    // message.error(error.message);
    return Promise.reject(error)
  }
)

export default axios
