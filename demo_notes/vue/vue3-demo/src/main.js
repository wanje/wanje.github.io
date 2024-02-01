import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/style.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.component('CompName', CompObject)  // 全局组件注册API

// app.provide('key', '来自应用层provide的数据')  // 应用层提供依赖，可被该应用实例下所有组件inject注入访问

app.use(createPinia())
app.use(router)

app.mount('#app')
