import { createApp } from 'vue'

import './styles/style.scss'

import App from './App.vue'
import pinia from './stores'
import router from './router'

const app = createApp(App)

// app.component('CompName', CompObject)  // 全局组件注册API

// app.directive('name', object | function)  // 全局指令注册API

// app.provide('key', '来自应用层provide的数据')  // 应用层提供依赖，可被该应用实例下所有组件inject注入访问

// 应用级错误处理
app.config.errorHandler = (err, instance, info) => {
  // 接收的三个参数分别为：错误对象、触发该错误的组件实例、说明错误来源类型的字符串(生产环境下为一个映射代码)
  // 可向追踪服务报告错误
  console.error('app errorHandler', err, instance, info);
}

// app.use(installObject | installFunction, options)  // 插件安装
app.use(pinia)  // 通过一个Pinia根实例（含有install安装函数）安装Pinia，此时Pinia会在内部将pinia实例注入到应用app中
app.use(router)

app.mount('#app')
