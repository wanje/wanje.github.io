<script setup>
// 导入组件时，官方不建议忽略`.vue`这类自定义文件扩展命名(可能会影响IED和类型支持)，若确实想省略，可通过配置文件中`resolve.extensions`选项自定义
// <script setup> 下导入即默认注册为了局部组件
import ReactiveApi from './ReactiveApi.vue'
import RefApi from './RefApi.vue'
import ComputedApi from './ComputedApi.vue'
import CompLifecircle from './CompLifecircle.vue'
import WatchApi from './WatchApi.vue'
import CompDOMRefApi from './CompDOMRefApi.vue'
import CompBase from './CompBase.vue'
import FallthroughAttrs from './FallthroughAttrs.vue'
import SlotsApi from './SlotsApi.vue'
import ProvideInject from './ProvideInject.vue'
import AsyncComp from './AsyncComp.vue'
import ComposableFn from './ComposableFn.vue'
import CustDirective from './CustDirective.vue'
import TeleportComp from './TeleportComp.vue'
import SuspenseComp from './SuspenseComp.vue'
import UtilsApi from './UtilsApi.vue'
import OtherApi from './OtherApi.vue'

// https://cn.vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script
//!! <script setup> 与 <script> 可同时使用，但此时 <script> 中仅可使用很少一部分内容
//* 选项式
/*/ export default {
  components: { // 局部组件注册
    ReactiveApi,
    RefApi
  },
  props: {
    title: String
  },
  emits: ['oneEvent'],  // 显式声明组件触发的自定义事件，以区分原生DOM事件(因可同名)，被声明为组件事件的监听器不会被透传到组件的根元素上，且将从组件的 $attrs 对象中移除
  expose: ['publicData', 'publicMethod'], // 用于声明当组件实例被父组件通过ref模板引用访问时暴露的可访问的公共属性或方法（若不声明则像vue2一样默认都可访问）
  //!! data 选项与 setup 钩子不能同时使用，只能选择其一
  setup(props, context) {
    // 此处可以使用组合API
    console.log('props对象', props)
    console.log('上下文，包含 attrs, slots, emit, expose 等属性或方法，可解构', context);

    const count = ref(0);
    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },
  mounted() {
    console.log(this.count)
  },
  methods: {},
  //...类似vue2中的其他选项（如name、components、directives及生命周期钩子等）
} */

function test() {
  console.log('a-event');
  alert('抛出事件成功')
}

const modelData = ref(0);
const modelData2 = ref('');
const modelData3 = ref('');
function updateModel(index) {
  switch (index) {
    case 1: modelData.value++; break;
  }
}
</script>

<template>
  <section>
    <div>
      <h2 class="mgt-0"><a target="_blank" href="../src/main.js">创建应用：createApp</a></h2>
      <p>vue3中创建应用实例是通过 <code>createApp()</code>方法，最后用 <code>mount()</code>挂载到容器上，而不是vue2中的`new Vue()`，因此可以创建多个实例，互相之间都是独立的，此后的全局组件、指令等都直接在该实例上注册，从而可以用于在常规页面中多个局部位置单独使用vue。</p>
      <p>注册全局组件 <code>app.component('name', 组件对象)</code></p>
      <p>注册全局指令 <code>app.directive('name', 指令对象或函数)</code></p>
      <p>从应用层提供内部所有组件都可注入消费的数据 <code>app.provide('key', 'value')</code></p>
      <p>插件安装 <code>app.use(带安装函数install的插件对象或插件就是一个安装函数, 可选的选项对象)</code></p>
      <p>大多原来挂载在组件实例 <code>this</code> 上的api（如 <code>$nextTick</code>）都有对应的组合式api下的同名api（只是去掉了开头的 <code>$</code>）</p>
    </div>
    <ReactiveApi></ReactiveApi>
    <RefApi></RefApi>
    <ComputedApi></ComputedApi>
    <WatchApi></WatchApi>
    <CompDOMRefApi></CompDOMRefApi>
    <CompLifecircle></CompLifecircle>
    <CompBase v-model="modelData" v-model:vm2="modelData2" v-model:vm3.upper="modelData3" @a-event="test">
      <!-- vue3中具名插槽都需要通过 template 元素来使用（vue2中可以只是使用作用域插槽或有多个内容时才用 template 元素） -->
      <template #model-out>
        <button class="mgl-10" @click="updateModel(1)">父组件外部updateModel</button>
      </template>
      <span>model2：</span>
      <input type="text" v-model="modelData2" />
      <br>
      <span>model3：</span>
      <input type="text" v-model="modelData3" />
    </CompBase>
    <SlotsApi></SlotsApi>
    <ProvideInject>
      <FallthroughAttrs theme="dark" class="color-default" style="background: none;" custom-attr="测试" @otherEvent="() => {}"></FallthroughAttrs>
    </ProvideInject>
    <AsyncComp></AsyncComp>
    <ComposableFn></ComposableFn>
    <CustDirective></CustDirective>
    <TeleportComp></TeleportComp>
    <SuspenseComp></SuspenseComp>
    <UtilsApi></UtilsApi>
    <OtherApi></OtherApi>
  </section>
</template>
