import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const hashHistory = createWebHashHistory();
console.log('createWebHashHistory()', hashHistory)
//* 通过 createRouter() 方法创建路由实例，组件中用到 $router 或 useRouter() 与这里返回的 router 实例完全一样
//! 路由实例化参数中的路由配置表与vue2中使用方式一样
const router = createRouter({
  //! 通过 createWebHashHistory() 或 createWebHistory() 方法声明要使用的路由模式是 hash 模式还是浏览器原生 history 模式，该两个方法返回了对相关模式的实现
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: hashHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/router',
      name: 'router',
      // route level code-splitting
      // this generates a separate chunk (RouterPage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RouterPage/index.vue')
    },
    {
      path: '/pinia',
      name: 'pinia',
      component: () => import('../views/PiniaPage.vue')
    }
  ]
})

console.log('router', router)
export default router
