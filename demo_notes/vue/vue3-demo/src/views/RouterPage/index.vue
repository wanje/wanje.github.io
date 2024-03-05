<script>
import { useRouter, useRoute } from "vue-router";

export default {
  name: 'RouterPage',
  setup() {
    // 组合式中获取路由器实例和当前路由对象
    const router = useRouter();
    const route = useRoute();
    console.log('路由器及当前路由对象', router, route);

    // 组件内导航守卫的组合式API同组件生命周期钩子钩子类似，就是`on`+钩子名的小驼峰形式
    // onBeforeRouteEnter、onBeforeRouteUpdate、onBeforeRouteLeave
  },
  beforeRouteEnter() {
    return (vm) => {
      console.log('beforeRouteEnter', vm)
    }
  },
  methods: {
    refresh() {
      // 选项式组件中仍然可通过 $router 和 $route 访问路由器和当前路由对象
      this.$router.go();
    }
  }
}
</script>

<template>
  <div class="router">
    <h2><a target="_blank" href="../src/router/index.js">路由 Vue-Router</a></h2>
    <p><code>createRouter(configObj)</code> 创建路由器实例，参数configObj与vue2中使用基本无异，只是原`mode`选项换成了 <code>history</code>，
      且其值也不是`hash`和`history`两个字符串之一，而是通过 <code>createWebHashHistory()</code> 和 <code>createWebHistory()</code> 两个方法返回的对应模式下的相关操作实现对象
    </p>
    <button @click="$router.go()">template模板中不管在选项式组件还是组合式组件下都可以访问 $router 和 $route</button>
    <p class="color-orange">Vue3下除了创建路由实例和在组合式API组件下获取路由实例和当前路由对象的方式与Vue2下稍有不同外，其他内置组件、编程式导航、导航守卫等与Vue2下使用方式都一样。</p>
    <p><code>useRouter()</code> 用于组合式下获取 router 路由器实例，等同于选项式组件和template模板下的 <code>$router</code></p>
    <p><code>useRoute()</code> 用于组合式下获取 route 当前路由对象，等同于选项式组件和template模板下的 <code>$route</code></p>
    <p><code>onBeforeRouteEnter()</code> 组件内前置导航守卫钩子的组合式API</p>
    <p><code>onBeforeRouteUpdate()</code> 组件内路由更新导航守卫钩子(路由更新但当前组件被复用的情况)的组合式API</p>
    <p><code>onBeforeRouteLeave()</code> 组件内离开当前路由组件的导航守卫钩子的组合式API</p>
    <p>在 <span class="color-orange">VueRouter4+</span> 版本的导航守卫钩子中，<span class="color-orange">部分有第三个参数 next 的，现在该参数是可选的</span>，若要使用该参数则用法不变，若不使用 next（推荐），
      则该导航守卫是<span class="color-orange">通过钩子是否返回值或返回值的类型来确定是否重定向（实际就是将原来传给 <code>next()</code> 的参数直接用于钩子函数return了）</span>，
      返回false则取消当前导航，若不返回或返回undefined或true则表示继续导航，若返回一个新的路径字符串或路径对象，则表示是重定向到对应路由，
      在<span class="color-orange">组件内`beforeRouteEnter`守卫中还可以返回一个函数（只有该守卫下有此用法）</span>，表示继续当前导航的同时可以在该函数回调中访问其默认接收的当前组件实例
      （因该组件内导航守卫触发时组件实例还未创建，无法像其他组件内守卫通过`this`获取当前组件实例）
    </p>
    <div class="router-nest">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss">
.router {
  &-nest {
    background: #111;

    &::before {
      content: '嵌套路由视图区域';
      color: #33a06f;
    }
  }
}
</style>
