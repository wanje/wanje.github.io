<script setup>
  import { storeToRefs } from 'pinia'

  // 注意：这与vuex不同，虽然在入口文件中应用实例安装了pinia插件，且该pinia实例虽然包含全局状态的管理，但并没有像vuex该实例绑定在app上，要使用pinia根实例就单独引入，相关Store定义也都是分离的需要每个使用的地方都手动导入并实例化(同一store定义可以看做是单例模式，实际不会创建多个不同的实例)
  import { useCounterStore, useNumStore } from '@/stores'
  // 此时实例化后返回的是一个用reactive包装过的状态对象，其中包含了选项式下state、getters、actions中定义的状态数据的方法，可直接通过子属性访问（setup组合式下即是返回的对象结构，但也是reactive重新包装处理过的，不是原始对象，也不能直接解构）
  //! 注意不能直接对返回的对象进行解构其中的响应性状态，因其是由 reactive 包装的，直接解构将破坏其内容的响应性，可以通过提供的响应性转换API`storeToRefs()`或vue的`toRefs()`处理后再解构以仍然保持响应性
  //! 但是可以直接解构其中的 action（即相关method，不包括getter），因为其是函数方法且内部用到的状态有绑定，因此不会涉及响应性破坏
  const counterStore = useCounterStore();
  console.log('一个pinia Store实例：', counterStore);

  //! 通过`storeToRefs()`API将状态实例下的响应式状态都转换为普通的独立的响应式 ref，这样就可以直接解构而不会破坏响应性
  const numStore = useNumStore();
  // store中的 state、getter 相关属性会被转换为独立的ref，同时通过插件添加的其他响应式属性也会被提取为 ref，
  // 并且其会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性（返回的对象直接不会包含这些属性，而不是说保持原样返回，故解构是获取不到这部分内容的）
  const { count, double } = storeToRefs(numStore);  // 此时解构出的属性将仍然保持响应性，因不包含 action 和其他非响应式属性故这部分内容不能在这里结构
  const { increment } = numStore; // 作为 action 的 increment 可以直接解构

  // Pinia提供的`storeToRefs()`会跳过action及其他非响应式属性，但是vue自带的`toRefs()`则不会跳过，它会提取传入的源对象下的所有属性和方法为单独的 ref，这样就可以全部解构出来
  // const { count, double, increment } = toRefs(numStore);

  // 如果是选项式组件，要使用定义的Store则可通过以下辅助函数API将相关内容映射到组件的computed、methods下或是直接映射整个store实例：
  // mapStores() 辅助函数可以将整个 store 实例对象映射到 computed 下，然后通过该对象去访问内部的相关状态值
  // mapState() 辅助函数可将 state 和 getters 映射为 computed 下的只读属性
  // mapWritableState() 辅助函数与mapState类似可将 state 映射为 computed 下的属性，但该属性允许像在Store定义中一样直接修改
  // mapActions() 辅助函数可将 actions 映射为 methods 下的方法
  // 更多辅助函数可查阅官方文档

  //! 订阅 State（也可以使用Vue的 watch 监听来替代）
  counterStore.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    console.log('store mutation.type', mutation.type); // 'direct' | 'patch object' | 'patch function'
    // 和 counterStore.$id 一样
    console.log('store mutation.storeId', mutation.storeId); // 'counter'
    // 只有 mutation.type === 'patch object'的情况下才可用
    console.log('store mutation.payload', mutation.payload); // 传递给 counterStore.$patch() 的补丁对象。
    // 每当状态发生变化时，做相关操作
    console.log('组件内订阅全局状态的变化：', state);
  }, {  // 订阅配置选项
    // 默认情况下，state 订阅会被绑定到添加它们的组件上(若 store 在组件的 setup() 内)，这意味着，当该组件被卸载时，它们将被自动删除
    detached: false // 若这里设为 true 则会将此 state 订阅从当前组件中分离，此时此订阅器即便在组件卸载之后仍会被保留
  })
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
    <p class="color-red">在使用定义的store时与vuex不同，虽然在入口文件中应用实例安装绑定了pinia插件，但其与实际定义的store是分离的，不像vuex那样是直接全局挂载到应用app实例上的，
      因此需要每个使用的地方都手动导入并实例化(同一store定义可以看做是单例模式，实际不会创建多个不同的实例)，这样可以使得没有使用的store不会打包进生产中（摇树优化）
    </p>
    <p>
      store实例化后返回的是一个用reactive包装过的状态对象，定义时的相关state、getters、actions等将作为直接子属性放在该状态对象中，可直接访问（没有state、getters、actions这一层），
      因为是reactive包装的故<span class="color-orange">不能直接解构该状态对象</span>，否则原响应式状态（包括state和getters，及通过插件添加的其他响应式属性）会失去响应性，
      但是<span class="color-orange">actions相关函数方法可以解构</span>，因其本身没有响应性，有响应性的是其内部使用到的响应式状态，<span class="color-orange">要使响应式状态解构够仍然保持响应性就需要用到Pinia的`storeToRefs()`或vue的`toRefs()`</span>
    </p>
    <p>
      Pinia的 <code>storeToRefs(store)</code> 会将传入的store实例中的响应式状态都转换为普通的独立的响应式 ref，这样就可以直接解构而不会破坏响应性，包括通过插件添加的响应式属性也会转换，
      并且其会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性（返回的对象直接不会包含这些属性，而不是说保持原样返回，故解构是获取不到这部分内容的）
    </p>
    <p>
      vue的 <code>toRefs(reactiveObj)</code> 会将传入的响应式对象reactiveObj转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref，也即是每个属性都是一个ref，因此解构后仍可以保持响应性，
      该转换也作用于通过插件添加的响应式属性(注意是之前添加的，而不是转换后添加的)，且其不会跳过actions相关函数，所以可以一同解构，不用像 storeToRefs 下不包含actions，还需要单独从源对象中解构actions
    </p>
    <div>
      <span>直接通过实例对象使用：</span>
      <input type="text" :value="counterStore.count" disabled>
      * 2 = {{ counterStore.double }}
      <button @click="counterStore.increment" class="mgl-5">+1</button>
    </div>
    <div>
      <span>解构使用：</span>
      <input type="text" :value="count" disabled>
      * 2 = {{ double }}
      <button @click="increment" class="mgl-5">+1</button>
    </div>
  </div>
</template>

<style>

</style>
