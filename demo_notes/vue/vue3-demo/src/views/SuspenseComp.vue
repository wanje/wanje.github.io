<script setup>
  
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/SuspenseComp.vue">异步依赖过渡回退：Suspense</a></h2>
    <p><code>&lt;Suspense></code> 是一个内置组件，用于处理内部多个异步依赖组件的加载，它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。</p>
    <p>
      <code>&lt;Suspense></code> 可以等待的异步依赖有两种：<br>
      1、带有异步`setup()`钩子的组件：选项式 <code>async setup() { ... }</code>，及使用语法糖 <code>&lt;script setup></code> 时有顶层 <code>await</code> 表达式的组件(此时省去了`async`关键字)<br>
      2、异步组件<code>(defineAsyncComponent)</code>：异步组件默认就是“suspensible”的，其默认会被当作上层组件上 <code>&lt;Suspense></code> 的一个异步依赖，此时加载状态是由 <code>&lt;Suspense></code> 控制，
      而该异步组件自己的加载、报错、延时和超时等选项都将被忽略，除非在该异步组件的声明选项中指定 <code>suspensible: false</code> 表明不用 Suspense 控制，完全有其内部自行控制相关回退状态
    </p>
    <p>
      <code>&lt;Suspense></code> 组件有两个插槽：默认/应该加载的内容<code>#default</code> 和后备过渡的内容 <code>#fallback</code>，两个插槽都只允许一个直接子节点，在可能的时候都将显示默认槽中的节点，否则将显示后备槽中的节点。<br>
      1、在初始渲染时，Suspense 将在内存中渲染默认插槽内容；<br>
      2、若在此过程中遇到任何异步依赖，则会进入挂起状态，此时就展示后备内容；<br>
      3、当所有遇到的异步依赖都完成后，Suspense 会进入完成状态，此时就又展示默认插槽内容；<br>
      4、若初次渲染时没有遇到异步依赖(即是同步内容)，就直接进入完成状态而展示该同步默认内容；<br>
      5、进入完成状态后，只有当默认插槽的根节点被替换时，Suspense 才会回到挂起状态（若只是内部或更深嵌套组件变动不会），组件树中新的更深层次的异步依赖不会造成 Suspense 回退到挂起状态；
    </p>
    <img src="@/assets/suspense1.jpg" alt="defineAsyncComponent" width="380" class="block" />
    <p>与其他组件结合使用，应注意嵌套关系</p>
    <img src="@/assets/suspense2.jpg" alt="defineAsyncComponent" width="400" class="block" />
  </div>
</template>

<style lang="scss" scoped>

</style>
