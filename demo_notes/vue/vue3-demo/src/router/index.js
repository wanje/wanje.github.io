import { createRouter, createWebHashHistory } from 'vue-router'
import { inject } from 'vue';
import HomePage from '../views/HomePage.vue'

const hashHistory = createWebHashHistory();
console.log('createWebHashHistory()', hashHistory)
//* 通过 createRouter() 方法创建路由实例，组件中用到 $router 或 useRouter() 与这里返回的 router 实例完全一样
//! 路由实例化参数中的路由配置表与vue2中使用方式一样
const router = createRouter({
  //! 通过 createWebHashHistory() 或 createWebHistory() 方法声明要使用的路由模式是 hash 模式还是浏览器原生 history 模式，该两个方法返回了对相关模式的实现
  //! 另有 memory 模式由 createMemoryHistory() 方法声明，但因其不会有历史记录故几乎不会使用
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
});

//! 在 VueRouter4+ 版本的导航守卫钩子中，原本部分钩子函数包含的第三个参数`next`现在是可选的，若要使用该参数则用法不变，若不使用next（推荐），
//! 则该导航守卫是通过钩子是否返回值或返回值的类型来确定是否重定向（实际就是将原来传给`next()`的参数直接用于钩子函数return了），
//! 返回false则取消当前导航，若不返回或返回undefined或true则表示继续导航，若返回一个新的路径字符串或路径对象，则表示是重定向到对应路由，
//! 在组件内`beforeRouteEnter`守卫中还可以返回一个函数（只有该守卫下有此用法），表示继续当前导航的同时可以在该函数回调中访问其默认接收的当前组件实例（因该组件内导航守卫触发时组件实例还未创建，无法像其他组件内守卫通过`this`获取当前组件实例）

router.beforeEach(() => {
  // Vue3.3+ 可以在导航钩子中通过`inject()`注入应用层`provide()`提供的全局数据
  const global = inject('globalKey');
  console.log('router[beforeEach]', global);
})

/** 导航解析完整流程
 * 1、导航被触发
 * 2、在失活的组件里调用离开守卫 beforeRouteLeave
 * 3、调用全局的 beforeEach 前置守卫，即开始进入各导航处理流程前
 * 4、在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)
 * 5、在路由配置里调用 beforeEnter
 * 6、解析异步路由组件
 * 7、在被激活的组件里调用 beforeRouteEnter
 * 8、调用全局的 beforeResolve 解析守卫 (2.5+)
 * 9、导航被确认
 * 10、调用全局的 afterEach 钩子
 * 11、触发 DOM 更新
 * 12、调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为该回调函数的参数传入
 * */

console.log('router', router)
export default router
