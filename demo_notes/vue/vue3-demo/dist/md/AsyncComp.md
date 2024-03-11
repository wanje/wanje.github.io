```html
<script setup>

</script>

<template>
  <div class="">
    <h2><a target="_blank" href="./md/AsyncComp.md">异步组件：defineAsyncComponent</a></h2>
    异步组件本身内容的声明定义与普通组件并没有区别，区别只在于使用 <code>defineAsyncComponent()</code> 方法包装了一下普通组件加载过程，使得组件在需要的时候才异步加载执行，并提供加载中的过渡和回退机制，
    其类似路由懒加载，可对欲包装的组件进行代码分割形成单独的js文件，需要时再载入，而在同步代码中注册成全局组件或局部组件时，注册的实际是包装组件，此时实际组件并未载入。
    <p>
      <code>defineAsyncComponent()</code> 方法接收一个返回 Promise 的加载函数，这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用，也可以调用 reject(reason) 表明加载失败，这需要全都自己手动处理。
      <span class="color-orange">因 ES 模块动态导入 <code>import()</code> 也是返回一个 Promise，故大多情况下都是搭配它一起实现，就像路由懒加载一样</span>
    </p>
    <p>全量使用(截图中少了 <code>suspensible</code> 和 <code>onError</code> 选项，除了 <code>loader</code> 其他选项都是可选的)：<br>
      <code>suspensible</code> 布尔选项用于设置该异步组件的相关回退处理是否允许由上层组件树中的 <code>&lt;Suspense></code> 组件统一处理(默认是，此时该异步组件的相关设置将无效)，若设为`false`则始终组件内自己控制相关加载状态<br>
      <code>onError</code> 回调函数选项用于设置出错时的其他操作回调
      <img src="@/assets/defineAsyncComponent.jpg" alt="defineAsyncComponent" width="400" class="block" /> 此时就可以将 AsyncComp 变量像普通组件使用即可，
      <span class="color-orange">展示加载组件前有默认200ms延迟的原因是若在网络状况较好时，加载可能很快，若此时还显示加载过渡组件可能会产生闪烁反而影响用户体验，所以设置了该延迟，若在该延迟时间内组件就加载完了也就不用显示加载过渡组件了</span>
    </p>
    <p>当不需要设置加载和错误状态时（即只需要loader），则可以直接简写传入导入函数：<code>defineAsyncComponent(() => import('./Foo.vue'))</code></p>
    <p>与普通组件一样进行全局注册：<code>app.component('FooComp', defineAsyncComponent(() => import('./Foo.vue')))</code></p>
    <p>异步组件还可以搭配vue3内置的 <code>&lt;Suspense></code> 组件使用（默认相关加载回退处理会由上层组件树中的 <code>&lt;Suspense></code> 接管，可将 <code>suspensible</code> 选项设为`false`来完全自主控制）。</p>
  </div>
</template>

<style lang="scss" scoped>

</style>

```