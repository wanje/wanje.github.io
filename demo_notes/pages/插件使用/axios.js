/** axios version: 0.18.0 */
const axios = require('axios');   // 或 import axios from 'axios'

//axios基于ES6的Promise实现，所以若环境不支持就需要使用垫片(https://github.com/stefanpenner/es6-promise)
/**
 * axios(config)
 * */
// 类似jQuery中$ajax()方式用法
/** 配置对象中除了`url`是必须的外没其他配置项都是可选的 */
axios({
  methods: 'post',      //请求方式，默认为get
  url: '/user/12345',   //请求地址
  baseURL: 'http://xxx.com/api/',    //基础路径，若‘url’项设置的不是绝对路径，那么请求时会在其前面加上baseURL
  //提交的数据，只适用于'PUT','POST','PATCH'请求，
  //在未设置`transformRequest`项时其值就只能是字符串、简单对象、ArrayBuffer、URLSearchParams之一，浏览器环境下还可以是FormData、File、Blob之一，node环境下还可以是Stream
  data: {
    firstName: 'w',
    lastName: 'j'
  },
  //`transformRequest`允许请求的数据在发送至服务器之前进行转化，同样只适用于'PUT','POST','PATCH'请求
  transformRequest: [function (data, headers) {   //注意这里是个数组，数组中的最后一个函数必须返回一个字符串或FormData、Stream，或一个`ArrayBuffer`、`Buffer`实例
                                                  //按自己的需求对请求数据进行处理后再发送，data为请求数据对象，headers为请求头
    console.log(headers);
    return data;
  }],
  //`transformResponse`允许对返回的数据传入then/catch之前进行处理
  transformResponse: [function (data) {
    //按需求对数据进行处理
    return data;
  }],
  headers: {'X-Requested-With': 'XMLHttpRequest'},    //`headers`可自定义要发送的请求头
  //`params`是请求连接中的请求参数，必须是一个纯对象(不能嵌套)，或者URLSearchParams对象(即url中包含查询参数的写法：?id=123&name=wj)
  params: {
    id: 123
  },
  //`paramsSerializer`是一个可选的函数，用来控制和序列化请求参数（即上面的params）
  //例如使用：https://www.npmjs.com/package/qs 或 http://api.jquery.com/jquery.param/ 方法将参数序列化处理后再发送
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  responsetype: 'json',   //表明服务器返回的数据类型，这些类型的设置应该是'arraybuffer','blob','document','json','text',stream'之一
  responseEncoding: 'utf8',    //表明解析相应的编码方式，注意其会忽视responseType为stream或者客户端的请求，默认‘utf8’
  timeout: 1000,  //请求超时时间(毫秒)，超时无响应请求将会停止
  withCredentials: false,   //跨域请求是否需要证书，默认值false，Chrome80+中跨域请求携带的cookie会被拦截，设为true可不被拦截
  maxContentLength: 2000,   //定义http返回内容的最大字节容量
  //表明HTTP基础的认证应该被使用，并且提供证书，这个会设置一个`authorization` 头（header），并且覆盖你在header设置的Authorization头信息。
  auth: {
    username: 'janedoe',
    password: 'fsssfsf'
  },
  //代理设置，定义服务器的主机名字和端口号。
  //`auth`表明HTTP基本认证应该跟`proxy`相连接，并且提供证书。
  //这个将设置一个'Proxy-Authorization'头(header)，覆盖原先自定义的。
  proxy: {
    host: '127.0.0.1',  //服务器地址
    port: 9000,   //端口
    auth: {
      username: 'cdd',
      password: '123456'
    }
  },
  //`cancelToken` 定义一个取消标志，能够用来取消请求，具体见后面‘取消请求’举例
  cancelToken: new CancelToken(function (cancel) { }),
  //`adapter`适配器，允许自定义处理请求，这会使测试更简单，返回一个promise，并且提供一个有效的响应
  adapter: function (config) {
    console.log(config);
  },
  //允许处理上传过程的进程事件
  onUploadProgress: function (progressEvent) {
    //本地过程事件发生时想做的事
  },

  //允许处理下载过程的进程事件
  onDownloadProgress: function (progressEvent) {
    //下载过程中想做的事
  },
  //定义promise的resolve和reject状态，参数为http返回的状态码，如果`validateStatus`返回true（或者设置成null/undefined），promise将会resolve；其他的promise将reject。
  validateStatus: function (status) {
    return status >= 200 && stauts < 300; //默认
  }
});

//axios返回一个Promise
axios({
  methods: 'get',
  url: '/user/12345',

}).then(function (response) {
  /** 成功回调 */
  //response为响应信息对象，response.data可访问返回的数据
  //response对象包含的内容如下对象所示
  console.log(response, {
    data: {},   //`data`是服务器返回的请求数据
    status: 200,  //`status`是服务器返回的http状态码
    statusText: 'ok',   //`statusText`是服务器返回的http状态信息
    headers: {},    //`headers`是服务器返回中携带的headers
    config: {},    //`config`是发起该请求的axios的配置对象
    request: {}   //`request`是获取当前响应的原生请求对象，它是node环境中最后一次的 ClientRequest实例（redirect中），或是浏览器环境中的XMLHttpREquest实例
  });

}).catch(function (error) {
  /** 失败回调 */
  console.log(error);   //直接打印error得到的只是普通错误描述，下面附在error上的属性值要单独访问
  //error包含错误信息，可以使用validateStatus配置项自定义HTTP状态码的错误范围
  if (error.response) {
    //请求被建立，且服务器返回一个状态码，它们默认在2xx之外
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

  } else if (error.request) {
    //请求被建立，但没有收到响应
    //`error.request`是一个浏览器的XMLHttpRequest实例，或node中的http.ClientRequest实例。
    console.log(error.request)

  } else {
    //有些错误是在建立请求过程中触发的
    console.log('Error', error.message);
  }
  console.log(error.config);
});

/**
 * axios(url [,config])
 * */
axios('/user/12345/');  //默认发起一个get请求

/**
 * 各请求方法的简写
 * */
// axios.request(config)
// axios.get(url [,config])
// axios.delete(url [,config])
// axios.head(url [,config])
// axios.options(url [,config])
// axios.post(url [,data [,config]])
// axios.put(url [,data [,config]])
// axios.patch(url [,data [,config]])

/**
 * 并发方法
 * axios.all(请求队列)
 * axios.spread(callback)
 * */
// 创建一个请求队列
let ps = [1, 2].map(function (val) {
  return axios.get('/user/' + val);
  // return axios.get('/user/' + val).catch(function (error) {
  //   console.error(error);   //若要使某个请求出错时不阻断其他请求，则可以为每个请求单独设置catch捕获错误而不抛出到外部
  // });
});
// axios.all()方法类似Promise.all()方法，当所有请求都成功才会调用成功回调
axios.all(ps).then(function (resArr) {
  // 都成功后返回的数据也是一个数据队列，顺序与前面的请求队列一致
});
axios.all(ps).then(
    // axios.spread()方法的作用是将返回的成功数据队列拆分成单独的项
    axios.spread(function (res1, res2) {
      // 这里res1、res2分别对应着ps中两个请求的响应对象（可以这样理解：resArr == [res1, res2]）
    })
);

/**
 * 自定义创建axios实例
 * axios.create([config])
 * */
let cusInstance = axios.create({
  baseURL: 'http://xxx.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
// 上面列出的各请求方法的简写也都能应用在自定义创建的实例上
cusInstance.get('/user/12345');

/**
 * 使用公共默认配置，这些配置将在所有请求配置中生效
 * */
/* 全局默认配置 */
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* 为自定义的axios实例设置默认配置 */
cusInstance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
/** 相同配置项的优先级：具体请求中的config > 自定义实例默认配置 > 自定义全局默认配置 > axios库提供的初始默认配置 */

/**
 * 设置拦截器
 * 可以在‘请求’或‘响应’被‘then’或‘catch’处理之前对它们进行拦截，按需作处理后再返回给后续回调使用
 * */
//添加request请求拦截器
axios.interceptors.request.use(function (config) {
  //在请求发送之前做一些事，默认接收请求配置对象
  return config;

}, function (error) {
  //当出现请求错误时做一些事，该回调可选
  return Promise.reject(error);
});

//添加response响应拦截器
axios.interceptors.response.use(function (response) {
  //对返回的数据进行一些处理
  return response;
}, function (error) {
  //对返回的错误进行一些处理，该回调可选
  return Promise.reject(error);
});

//为自定义实例添加拦截器
cusInstance.interceptors.request.use(function (config) {
});

/**
 * 移除拦截器，使用eject，类似定时器的使用方式
 * */
let myInterceptor = axios.interceptors.request.use(function(config) {});   //设置拦截器并保存在变量中
axios.interceptors.request.eject(myInterceptor);    //移除指定拦截器

/**
 * 取消请求
 * */
// 使用CancelToken.source工厂函数去创建一个cancel token，而后使用cancel token取消指向该token的请求（工作方式类似于创建一个定时器和清除定时器）
const CancelToken = axios.CancelToken;
let source = CancelToken.source();  //创建一个token

axios.get('/user/12345', {
  cancelToken: source.token   //设置取消请求token，同一个token可用于多个请求，取消时就会同时取消相同token的请求
}).catch(function (error) {
  if (axiso.isCancel(error)) {
    console.log('请求被取消', error.message);
  } else {
    //handle error
  }
});

//取消请求(信息参数可自定义)
source.cancel("操作被用户取消");

/**
 * 使用 application/x-www-form-urlencoded 格式传递数据（平时使用 application/json 较多，默认情况下axios也采用json格式）
 * 可以使用‘qs’库(类似node中的‘querystring’模块)来在json格式数据与url格式数据(url中?后面用=和&连接的格式)间相互转换（参考https://blog.csdn.net/weixin_43417444/article/details/83060833）
 *
 * */
let Qs = require('qs');   //或 import Qs from 'qs';
axios.post('/foo', Qs.stringify({'bar':123}));
axios({
  method:'POST',
  headers:{
    'content-type':'application/x-www-from-urlencoded;charset=UTF-8'
  },
  url: '/foo',
  data: Qs.stringify(data)
});