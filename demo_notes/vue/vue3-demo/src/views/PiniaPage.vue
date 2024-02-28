<script setup>
  // 注意：这与vuex不同，虽然在入口文件中应用实例安装绑定了pinia插件，但其与实际定义的store是分离的，因此需要每个使用的地方都手动导入并实例化(同一store定义可以看做是单例模式，实际不会创建多个不同的实例)
  import { useCounterStore } from '@/stores'
  // 此时实例化后返回的是一个用reactive包装过的状态对象，其中包含了选项式下state、getters、actions中定义的状态数据的方法，可直接通过子属性访问（setup组合式下即是返回的对象）
  //! 注意不能直接对返回的对象进行解构，因其是由 reactive 包装的，直接解构将破坏其内容的响应性，可以通过提供的响应性转换API处理后再解构以仍然保持响应性
  const counterStore = useCounterStore();
</script>

<template>
  <!-- <Teleport to="head">
    <meta http-equiv="Content-Security-Policy" content="default-src * data: 'unsafe-eval' 'unsafe-inline';">
  </Teleport>
  <img src="about:blank" alt="图片"> -->
  <div class="pinia">
    <h2><a target="_blank" href="../src/stores/index.js">全局状态管理：Pinia</a></h2>
    <p class="color-orange">Pinia 根实例独立挂载到 vue 应用实例 app 上，但后续相关全局状态创建并不会用到该 pinia 根实例：
      <code>app.use(createPinia())</code>（createPinia 是 Pinia 提供的API）
    </p>
    <p><code>Pinia</code> 中有三个概念，<code>state</code>、<code>getter</code> 和 <code>action</code>（不再有<span class="color-orange">mutation</span>），这些概念类似于vue2组件中的 <code>data</code>、<code>computed</code> 和 <code>methods</code></p>
    <p>pinia 提供<span class="color-orange">两种方式来定义全局状态</span>：<br>
      一种是定义时传入配置对象通过选项式编写；<br>
      一种是传入函数以类似setup(){}中的方式通过组合式编写；
    </p>
    <p>
      <code>defineStore()</code> 方法用于定义Store，其接受两个参数：<br>
      参数1为一个全局唯一的字符串ID，可看作是一个模块名；<br>
      参数2可接受两类值：Setup函数或Option对象；<br>
      对接收其返回值的变量命名可以任意，但是一般约定按 <code>useXxxStore</code> 的格式，即以`use`开头，`Store`结尾，直观表达其是状态管理用途
    </p>
    <p class="color-red">在使用定义的store时与vuex不同，虽然在入口文件中应用实例安装绑定了pinia插件，但其与实际定义的store是分离的，不像vuex那样是直接全局挂载到应用app实例上的，因此需要每个使用的地方都手动导入并实例化(同一store定义可以看做是单例模式，实际不会创建多个不同的实例)</p>
    <input type="text" :value="counterStore.count" disabled>
    <button @click="counterStore.increment" class="mgl-5">+1</button>
  </div>
</template>

<style>

</style>
