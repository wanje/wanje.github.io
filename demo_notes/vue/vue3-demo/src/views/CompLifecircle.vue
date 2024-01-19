<script setup>
  
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/ComputedApi.vue">组件生命周期</a></h2>
    <p>相对与Vue2，部分生命周期名字有所变化</p>
    <p>注意所有生命周期钩子均为<span class="color-red">以`on`开头的小驼峰命名</span>，如`onMounted`，以下图示中未加`on`</p>
    <p>
      <span class="color-red">注意：</span>对于因被 <code class="">&lt;KeepAlive></code> 组件包裹而会缓存组件状态的组件中还会
      额外包含 <code class="color-orange">onActivated()</code> 和 <code class="color-orange">onDeactivated()</code> 两个缓存状态激活与失活的生命周期钩子
      <span class="color-orange">(KeepAlive包裹的组件切换时DOM虽会被移除，但其实例会被缓存而不是直接销毁)</span>，
      <code class="color-orange">onActivated()</code>会在激活时调用(组件挂载时也会被调用)，<code class="color-orange">onDeactivated()</code>
      会在失活时调用(组件卸载时也会被调用)，另外这两个钩子不仅适用于 <code class="">&lt;KeepAlive></code> 缓存的根组件，也适用于缓存树中的所有后代组件
    </p>
    <img src="@/assets/lifecycle.png" alt="生命周期图" />
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 60%;

  @media screen and (max-width: 750px) {
    max-width: 100%;
  }
}
</style>