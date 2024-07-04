import { createApp } from 'vue'

import './styles/style.scss'

import App from './App.vue'
import pinia from './stores'
import router from './router'

const app = createApp(App)

// app.component('CompName', CompObject)  //* 全局组件注册API

// app.directive('name', object | function)  //* 全局指令注册API

app.provide('globalKey', '来自应用层provide的数据');  //* 应用层提供依赖，可被该应用实例下所有组件inject注入访问

/**
 * * app.config.errorHandler 应用级错误处理钩子
 * @param {*} err 错误对象
 * @param {*} instance 触发该错误的组件实例
 * @param {*} info 说明错误来源类型的字符串(生产环境下为一个映射代码)
 */
app.config.errorHandler = (err, instance, info) => {
  // 可向追踪服务报告错误
  console.error('app errorHandler', err, instance, info);
}

/**
 * * app.config.globalProperties 全局属性注册
 * 通过该对象可以注册应用内所有组件实例都可访问到的全局属性（类似vue2中的 Vue.prototype）
 * !!若与组件内的同名属性冲突，则组件内同名属性优先级更高
 * 比如这里的 $request 就可以在所有组件实例内通过 this.$request 访问到
 */
app.config.globalProperties.$request = (url, option) => fetch(url, option);

// app.use(installObject | installFunction, options); //* 插件安装

// 通过一个Pinia根实例（含有install安装函数）安装Pinia，此时Pinia会在内部将pinia实例注入到应用app中
app.use(pinia)
// 该步在安装 VueRouter 的同时会将 router 根实例注入到应用 app 下的每个组件实例中，
//! 使得每个组件内仍然可以像vue2中那样通过`this.$router`和`this.$route`访问路由器和当前路由对象（通过上的全局属性注册）
//!（这两个 $ 属性在template模板中都可访问，但script脚本中仅限选项式API组件下访问，组合式API组件可通过`useRouter`和`useRoute`两个API来获取）
app.use(router)

app.mount('#app')
