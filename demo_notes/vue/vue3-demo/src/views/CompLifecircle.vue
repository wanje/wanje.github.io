<script setup>
  const isMini = ref(true);
  function toggleMini() {
    isMini.value = !isMini.value;
  }
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="./md/ComputedApi.md">组件生命周期</a></h2>
    <p>相对与Vue2，部分生命周期名字有所变化</p>
    <p>注意所有生命周期钩子均为<span class="color-red">以`on`开头的小驼峰命名</span>，如`onMounted`，以下图示中未加`on`，
      <span class="color-red">注意：在组合式API中没有`beforeCreate`和`created`这两个声明周期钩子，这两个是选项式API中才有的，在组合式API中可以看作是`setup`阶段。</span>
    </p>
    <p>
      <span class="color-red">注意：</span>对于因被 <code class="">&lt;KeepAlive></code> 组件包裹而会缓存组件状态的组件中还会
      额外包含 <code class="color-orange">onActivated()</code> 和 <code class="color-orange">onDeactivated()</code> 两个缓存状态激活与失活的生命周期钩子
      <span class="color-orange">(KeepAlive包裹的组件切换时DOM虽会被移除，但其实例会被缓存而不是直接销毁)</span>，
      <code class="color-orange">onActivated()</code>会在激活时调用(组件挂载时也会被调用)，<code class="color-orange">onDeactivated()</code>
      会在失活时调用(组件卸载时也会被调用)，另外这两个钩子不仅适用于 <code class="">&lt;KeepAlive></code> 缓存的根组件，也适用于缓存树中的所有后代组件
    </p>
    <p class="color-red">不要在 updated 钩子中更改组件的状态，这可能会导致无限的更新循环，但 beforeUpdate 钩子可以！</p>
    <div>
      <p class="color-orange">另几个未在周期图中体现的钩子(以组合式API列出，选项式即去掉头部`on`)如下：</p>
      <p>
        <code>onErrorCaptured()</code>，捕获后代组件暴露出的错误时触发，钩子接收三个参数：错误对象、触发该错误的组件实例、说明错误来源类型的字符串(生产环境下为一个映射代码)；
        <span class="color-red">可在钩子中返回 false 来阻止错误继续向上传递</span>；其可捕获的错误来源有：组件渲染、事件处理器、生命周期钩子、setup()函数、侦听器、自定义指令钩子、过渡钩子；
      </p>
      <p>
        <span class="color-orange">错误传递规则：</span><br>
        1、默认情况下，所有的错误都会被发送到应用级的 <code>app.config.errorHandler</code> (前提是这个函数已经定义)，这样这些错误都能在一个统一的地方报告给分析服务；<br>
        2、若组件的继承链或组件链上存在多个 onErrorCaptured 钩子，对于同一个错误，这些钩子会被按从下至上的顺序一一调用，，类似原生 DOM 事件的冒泡机制“向上传递”；<br>
        3、若 onErrorCaptured 钩子本身抛出了一个错误，那么这个错误和原来捕获到的错误都将被发送到 app.config.errorHandler；<br>
        4、errorCaptured 钩子可以通过返回 false 来阻止错误继续向上传递，从而将错误处理限制在当前位置；
      </p>
      <p><code>onRenderTracked()</code>，当组件渲染过程中追踪到响应式依赖时触发<span class="color-red">（此为调试钩子，仅在开发模式且客户端渲染下调用）</span></p>
      <p><code>onRenderTriggered()</code>，当响应式依赖的变更触发了组件渲染时调用<span class="color-red">（同上也为调试钩子，仅在开发模式且客户端渲染下调用）</span></p>
      <p>
        <code>onServerPrefetch()</code>，注册一个异步函数，在组件实例在服务器上被渲染之前调用<span class="color-red">（仅在服务端渲染下调用）</span>，
        若该钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成
      </p>
    </div>
    <img
      src="@/assets/lifecycle.png"
      alt="生命周期图"
      title="生命周期图：点我切换大小图"
      :class="{ 'mini': isMini }"
      @click="toggleMini"
    />
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 60%;
  transition: all 0.2s;
  cursor: zoom-out;

  @media screen and (max-width: 750px) {
    max-width: 100%;
  }
  &.mini {
    max-width: 50px;
    cursor: zoom-in;
  }
}
</style>