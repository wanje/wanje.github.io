```html
<script setup>
  
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="./md/SuspenseComp.md">异步依赖过渡回退：Suspense</a></h2>
    <p><code>&lt;Suspense></code> 是一个内置组件，用于处理内部多个异步依赖组件的加载，它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。</p>
    <p>
      <code>&lt;Suspense></code> 可以等待的异步依赖有两种：<br>
      1、带有异步`setup()`钩子的组件：选项式 <code>async setup() { ... }</code>，及使用语法糖 <code>&lt;script setup></code> 时有顶层 <code>await</code> 表达式的组件(此时省去了`async`关键字)<br>
      2、异步组件<code>(defineAsyncComponent)</code>：异步组件默认就是“suspensible”的，其默认会被当作上层组件上 <code>&lt;Suspense></code> 的一个异步依赖，此时加载状态是由 <code>&lt;Suspense></code> 控制，
      而该异步组件自己的加载、报错、延时和超时等选项都将被忽略，除非在该异步组件的声明选项中指定 <code>suspensible: false</code> 表明不用 Suspense 控制，完全由其内部自行控制相关回退状态
    </p>
    <p>
      <code>&lt;Suspense></code> 组件有两个插槽：默认/应该加载的内容<code>#default</code> 和后备过渡的内容 <code>#fallback</code>，两个插槽都只允许一个直接子节点，在可能的时候都将显示默认槽中的节点，否则将显示后备槽中的节点。<br>
      1、在初始渲染时，Suspense 将在内存中渲染默认插槽内容；<br>
      2、若在此过程中遇到任何异步依赖，则会进入挂起状态，此时就展示后备内容（该组件不像异步组件defineAsyncComponent会有200ms的延时）；<br>
      3、当所有遇到的异步依赖都完成后，Suspense 会进入完成状态，此时就又展示默认插槽内容；<br>
      4、若初次渲染时没有遇到异步依赖(即是同步内容)，就直接进入完成状态而展示该同步默认内容；<br>
      5、进入完成状态后，只有当默认插槽的根节点被替换时，Suspense 才会回到挂起状态（若只是内部或更深嵌套组件变动不会），组件树中新的更深层次的异步依赖不会造成 Suspense 回退到挂起状态；<br>
      6、再次进入回退时，后备内容不会立即展示出来，Suspense 在等待新内容或异步依赖完成前，会展示之前 #default 的内容，视觉表现为新旧内容的直接切换而无过渡，该行为可以通过 Suspense 的 <code>timeout</code>&lt;number | string> prop 配置，
      若等待过程耗时超过 timeout，则会切换为展示后备内容，若将 timeout 设为 0，则会立即展示后备内容
    </p>
    <p>
      <code>&lt;Suspense></code> 组件会触发三个事件：pending、resolve、fallback<br>
      <code>pending</code> 事件在进入挂起状态时触发；<br>
      <code>resolve</code> 事件在 #default 插槽完成获取新内容时触发；<br>
      <code>fallback</code> 事件在 #fallback 插槽的内容展示时触发；
    </p>
    <p>错误处理：<code>&lt;Suspense></code> 组件自身目前还不提供错误处理，可通过使用 <code>errorCaptured</code> 选项或者 <code>onErrorCaptured()</code> 钩子，在使用到 &lt;Suspense> 的父组件中捕获和处理异步错误</p>
    <img src="@/assets/suspense1.jpg" alt="fallback回退" width="380" class="block" />
    <p>与其他组件结合使用，应注意嵌套关系</p>
    <img src="@/assets/suspense2.jpg" alt="与路由过渡缓存组件嵌套" width="400" class="block" />
    <p class="color-orange">另 Vue Router 使用动态导入<code>() => import('...')</code> 对懒加载组件进行了内置支持，这与异步组件不同，目前他们不会触发 <code>&lt;Suspense></code>，但这些路由视图组件内仍然可以有异步组件作为后代，而这些组件可以照常触发 <code>&lt;Suspense></code></p>
    当与多个异步组件嵌套使用时：以下代码若没有内层 <code>Suspense</code>，则 <code>DynamicAsyncInner</code> 在被解析前会呈现为一个空节点（而非展示之前的节点或回退插槽），
    并且这里设置了 <code>suspensible</code> 属性，使内部 <code>Suspense</code> 仅充当依赖项解析和修补的另一个边界，而将所有异步依赖项处理都交给父级 <code>Suspense</code>（包括发出的事件），
    若未设置该属性则意味着这个内部 <code>Suspense</code> 将会有自己的回退插槽，若内外两个动态组件同时被修改，内部 <code>Suspense</code> 就可能出现空节点和多个修补周期。
    <img src="@/assets/suspense3.jpg" alt="用于多个异步组件嵌套" width="350" class="block" />
  </div>
</template>

<style lang="scss" scoped>

</style>

```