<script setup>
  /** defineProps() 方法声明组件 props，可传入的值同选项式API下props选项(注意参数不能访问外部任何变量)，其返回一个对象，通过该对象访问相关props */
  // const props = defineProps(['num', 'prop2']);
  const props = defineProps({
    num: Number,
    prop2: {
      type: Number,
      // required: true,
      default: 1,
      // default(props) {
      //   return 1
      // },
      // validator(val, props){}  // 自定义校验，其返回一个布尔值，用于如固定枚举值
    }
  });


  /** defineEmits() 方法声明组件事件列表(可选但推荐)，可传入一组自定义事件名或对象(用于事件校验)，其返回一个等同于`$emit`的函数，用于对外抛出事件 */
  // const emit = defineEmits(['init', 'a-event']);
  const emit = defineEmits({
    init: null, // 表示不进行校验
    aEvent(payload) {
      // 通过返回一个布尔值表示校验是否通过，通过才会抛出事件
      if (payload) {
        return true
      } else {
        console.warn('参数缺失');
        return false
      }
    }
  });
  //! 注意，抛出事件时虽然可以在后面继续传入多个参数当做事件回调参数，这些参数在父组件中对该子组件事件监听回调函数中可以依次传入，
  // 但是若在父组件绑定事件时需要额外传参而显式使用`$event`关键字来接收原参数时，此关键字只能接收到第一个参数，此种情况下就要考虑组件封装中将抛出事件的多个参数放在对象或数组中作为一个整体参数抛出
  emit('init'); // 在setup中只能用 emit 抛出事件，而在html模板中`$emit`和`emit`都可以用
  //! vue事件属于自定义范畴，故没有原生DOM事件的冒泡捕获机制，只能监听直接子组件触发的事件，平级组件或是跨越多层嵌套的组件间通信，可使用一个外部的事件总线，或是使用一个全局状态管理方案

  const data = reactive({ num: 1 });


  // 定义组件自己的 v-model 双向数据绑定（底层实现逻辑关系与 vue2 中 prop 的`.sync`修饰符的应用逻辑非常类似：声明一个`propName`，然后通过触发`update:propName`事件来更新对应的数据）
  /** defineModel() 方法（v3.4+支持推荐）定义一个双向数据流，其是一个便利宏，底层机制是封装了一个名为 modelValue 的 prop（本地ref的值与其同步）和一个名为 update:modelValue 的事件（当本地 ref 的值发生变更时触发） */
  // const model = defineModel(); // 返回一个ref对象
  const model = defineModel({ // 由于该方法底层也是声明的一个prop，所以可以传入适用于prop的相关选项
    // required: true,
    default: 1
  });
  function updateModel() {
    model.value++
  }
  // 根据其底层实现逻辑关系，上面是默认声明的一个名为 modelValue 的 prop，我们也可以指定其他名字，从而实现一个组件上可以有多个 v-model 绑定
  const model2 = defineModel('vm2', { default: 'none' }); // 第一个参数为自定义的prop名，prop的相关选项(可选)则作为第二个参数传入
  //! 此时的用法就与 v-bind 绑定 prop 或其他自定义指令绑定参数一样，需要给 v-model 指令指定参数，该参数就是这里的propName
  // <ChildComp v-model="modelData" v-model:vm2="modelData2" v-model:vm3="modelData3" />
  const model3 = defineModel('vm3');
  function updateModel3() {
    model3.value += 'suffix'
  }
  /** 在v3.4之前的版本中，声明 v-model 的方式需要显式声明属性和更新该属性的特殊事件名 */
  /*
  const props = defineProps(['modelValue', 'vm2']);
  const emit = defineEmits(['update:modelValue', 'update:vm2']);

  <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
  <input :value="props.vm2" @input="emit('update:vm2', $event.target.value)" />
  */


  // defineExpose() 方法显式导出可被父组件访问的当前组件内的数据或方法，否则默认都是私有的不可被外部访问
  defineExpose({ data })
</script>

<template>
  <div class="comp-base">
    <h2><a target="_blank" href="../src/views/CompBase.vue">组件基础</a></h2>
    <p><code>defineProps()</code> 方法声明组件props，可传入的值同选项式API下props选项，并返回一个存储相关props的对象，<span class="color-red">注意声明时传入的参数不能访问 <code>&lt;script setup></code> 中定义的任何其他变量</span></p>
    <p><code>defineEmits()</code> 方法声明组件事件列表，可传入一组自定义事件名(可小驼峰或烤串式命名混用，均可解析)或对象形式(可用于事件校验)，并返回一个等同于 <code class="color-orange">$emit</code> 的函数，用于对外抛出事件，
      <span class="color-red">该宏方法只能在顶级作用域使用，不能在子函数中使用，该限制也同样适用于其他宏方法（defineXXX），</span>
      <span class="color-orange">在setup中只能用`emit`抛出事件，而在html模板中`$emit`和`emit`都可以用</span>，
      这里两处提到的`emit`都可以是其他名字，其取决于接收返回值的自定义变量的实际取名
    </p>
    <p><code>defineExpose()</code> 方法显式导出可被父组件访问的当前组件内的数据或方法(参数为对象形式)，否则默认都是私有的不可被外部访问</p>
    <p>初始数：<span>{{ props.num || 0 }}</span></p>
    <p>内部数：<span>{{ data.num }}</span></p>
    <button @click="$emit('a-event')">$emit 抛出事件</button>
    <button @click="emit('a-event')" class="mgl-10">emit 抛出事件</button>
    <div>
      <span>用于 v-model 的双向绑定数据：{{ model }}</span>
      <button class="mgl-10" @click="updateModel">子组件内部updateModel</button>
      <!-- 具名插槽在vue3中都需要像vue2中使用作用域插槽的方式在 template 元素上使用 -->
      <slot name="model-out"></slot>
      <br>
      <input type="text" v-model="model2" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
