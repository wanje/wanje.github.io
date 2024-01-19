import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/style.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.component('CompName', CompObject)  // 全局组件注册API

app.use(createPinia())
app.use(router)

app.mount('#app')
