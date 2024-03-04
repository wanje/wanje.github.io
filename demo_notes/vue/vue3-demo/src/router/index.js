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
  //! 以下 strict、sensitive 两个配置项也可以单独应用于单个路由，以针对性设置
  // strict: true, // 是否全局启用严格匹配，默认为 false，即忽略路径最后是否有反斜杠`/`，严格模式下要求不带斜杠才能匹配
  // sensitive: true,  // 是否全局启用大小写敏感，默认 false，即路径匹配不区分大小写，否则要区分
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/pinia',
      name: 'pinia',
      component: () => import('../views/PiniaPage.vue')
    },
    {
      path: '/router',
      name: 'router', //! 这里提供了name(即命名路由)，当通过命名路由的方式导航时($router.push({name: router}))只匹配到父路由就不会显示下面空路由下的默认回退内容
      // 路由级代码分割，将该路由对应的组件代码分割为单独的 chunk 文件(RouterPage.[hash].js)，从而实现懒加载（访问该路由时才加载）
      component: () => import('../views/RouterPage/index.vue'),
      children: [
        {
          //! 可以提供一个空的嵌套路径用于未匹配到子路径时的默认回退展示内容（允许只匹配到父路径时也可有效展示的场景下适用）
          path: '',
          name: 'routerDefault',
          component: () => import('../views/RouterPage/PageDefault.vue')
        },
        {
          path: 'a',
          name: 'routerA',
          component: () => import('../views/RouterPage/PageA.vue')
        }
      ]
    }
  ]
})

console.log('router', router)
export default router
