```html
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
  const { increment, getSth } = numStore; // 作为 action 的 increment 等方法可以直接解构

  // Pinia提供的`storeToRefs()`会跳过action及其他非响应式属性，但是vue自带的`toRefs()`则不会跳过，它会提取传入的源对象下的所有属性和方法为单独的 ref，这样就可以全部解构出来
  // const { count, double, increment } = toRefs(numStore);

  /** 
   * 如果是选项式组件，要使用定义的Store则可通过以下辅助函数API将相关内容映射到组件的computed、methods下或是直接映射整个store实例：
   * mapStores() 辅助函数可以将整个 store 实例对象映射到 computed 下，然后通过该对象去访问内部的相关状态值
   * mapState() 辅助函数可将 state 和 getters 映射为 computed 下的只读属性
   * mapWritableState() 辅助函数与mapState类似可将 state 映射为 computed 下的属性，但该属性允许像在Store定义中一样直接修改
   * mapActions() 辅助函数可将 actions 映射为 methods 下的方法
   */
  // 更多辅助函数可查阅官方文档

  /**
   * 订阅 State，也即是监听 state 变化（也可以使用Vue的 watch 监听来替代）
   * tore.$subscribe(callback, options)
   *   数1是回调函数，当state发生变化时会触发该回调函数
   *   参数2是个可选订阅配置项
   * @return 返回一个取消订阅的函数，可手动调用取消
   * */
  const unsubscribeState = counterStore.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    console.log('store mutation.type：', mutation.type); // 'direct' | 'patch object' | 'patch function'
    // 和 counterStore.$id 一样
    console.log('store mutation.storeId：', mutation.storeId); // 'counter'，同 counterStore.$id
    // 只有 mutation.type === 'patch object'的情况下才可用
    console.log('store mutation.payload：', mutation.payload); // 传递给 counterStore.$patch() 的补丁对象。
    // 每当状态发生变化时，做相关操作
    console.log('组件内订阅全局状态的变化：', state);
  }, {  // 订阅配置选项
    // 默认情况下，state 订阅会被绑定到添加它们的组件上(若 store 在组件的 setup() 内)，这意味着，当该组件被卸载时，它们将被自动删除
    detached: false // 若这里设为 true 则会将此 state 订阅从当前组件中分离，此时此订阅器即便在组件卸载之后仍会被保留
  });
  // console.log('取消state订阅的方法：', unsubscribeState);

  /**
   * 订阅 Action，也即是监听 Action 调用：
   * store.$onAction(callback, isDetached)
   *   参数1：监听到action调用后的回调函数，该函数默认接收一个包含action调用信息和处理钩子的对象作为参数
   *   参数2：可选参数，布尔值，表示是否将当前订阅从当前组件中分离，从而决定组件卸载后是否依然保持该action订阅器，默认false，即会跟随组件卸载自动取消订阅
   * @return 返回一个取消订阅的函数，可手动调用取消
   * */
  const unsubscribeAction = counterStore.$onAction(({
    name, // action 名称
    store, // store 实例，类似 `counterStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或resolve后的钩子
    onError // action 抛出错误或reject后的钩子
  }) => {
    // 这里在执行 "store "的 action 之前触发，相当于一个 before 钩子内容
    console.log(`Start "${name}" action in "${store.$id}" store with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发，它等待着任何返回的 promise
    after((result) => {
      console.log(`"${name}" action in "${store.$id}" store 运行完成并成功返回结果：`, result)
    })

    // 如果 action 抛出或返回一个reject的 promise，这将触发
    onError((error) => {
      console.log(`"${name}" action in "${store.$id}" store 抛出错误或reject：`, error)
    })
  }, false);
  // console.log('取消action订阅的方法：', unsubscribeAction);

  const imgSrc = ref();
  async function handleGetImg() {
    if (imgSrc.value) {
      imgSrc.value = URL.revokeObjectURL(imgSrc.value);
    } else {
      const data = await getSth();
      imgSrc.value = URL.createObjectURL(data);
    }
  }
</script>

<template>
  <!-- <Teleport to="head">
    <meta http-equiv="Content-Security-Policy" content="default-src * data: 'unsafe-eval' 'unsafe-inline';">
  </Teleport>
  <img src="about:blank" alt="图片"> -->
  <div class="pinia">
    <h2><a target="_blank" href="../src/stores/index.js">全局状态管理：Pinia</a></h2>
    <p>通过 Pinia 的 <code>createPinia</code> API创建一个 pinia 根实例：<code>const pinia = createPinia();</code></p>
    <p>通过 <code>app.use(pinia)</code> 安装 Pinia 库(pinia根实例包含一个install安装函数)，
      <span class="color-orange">此过程中Pinia内部会在应用app中注入该pinia实例，后续组件中useStore时会自动获取pinia根实例来共享，而如果是在组件外(SSR服务端渲染时)useStore因无法自动获取应用app就需要useStore时手动传入</span>
    </p>
    <p><code>Pinia</code> 中有三个概念，<code>state</code>、<code>getters</code> 和 <code>actions</code>（不再有<span class="color-orange">mutation</span>，都合并到了 actions），这些概念类似于vue2组件中的 <code>data</code>、<code>computed</code> 和 <code>methods</code></p>
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
      <img :src="imgSrc" alt="点我加载与取消" @click="handleGetImg">
    </div>
  </div>
</template>

<style>

</style>

```