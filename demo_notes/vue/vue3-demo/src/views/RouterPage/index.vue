<script>
import { useRouter, useRoute } from "vue-router";

export default {
  name: 'RouterPage',
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log('路由器及当前路由对象', router, route);
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
  </div>
</template>

<style>

</style>
