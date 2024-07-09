```html
<script setup>
  // defineOptions() 方法(v3.3+)用于在 <script setup> 下设置一些无需或没有宏定义的组件选项
  defineOptions({
    // name: 'OtherCompName', // 设置组件名，<script setup>下默认为该组件的.vue文件名
    // inheritAttrs: false, // 设置组件不自动继承外部额外 attribute，默认为true
    customOptions: {
      cust: '自定义选项'
    }
  });


  /** defineProps() 方法声明组件 props，可传入的值同选项式API下props选项(注意参数不能访问外部任何变量)，其返回一个对象，通过该对象访问相关props */
  // const props = defineProps(['num', 'prop2']);
  const props = defineProps({ // 若不需要在JS中访问这些props甚至可以不接受其返回的对象，而在template中直接使用propName访问即可
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
  /** defineModel() 方法（v3.4+支持推荐）定义一个双向数据流，其是一个便利宏，底层机制是封装了一个名为 modelValue 的 prop（本地ref的值与其同步）和一个名为 update:modelValue 的事件（当本地 ref 的值发生变更时触发），还有一个 modelModifiers 的 prop 记录对应的修饰符情况 */
  // const model = defineModel(); // 返回一个ref对象
  const model = defineModel({ // 由于该方法底层也是声明的一个prop，所以可以传入适用于prop的相关选项
    // required: true,
    default: 1
  });
  function updateModel() {
    model.value++
  }
  // 根据其底层实现逻辑关系，上面是默认声明的一个名为 modelValue 的 prop，我们也可以指定其他名字，从而实现一个组件上可以有多个 v-model 绑定
  //! 此时的用法就与 v-bind 绑定 prop 或其他自定义指令绑定参数一样，需要给 v-model 指令指定参数，该参数就是这里的propName
  const model2 = defineModel('vm2', { default: 'none' }); // 第一个参数为自定义的prop名，prop的相关选项(可选)则作为第二个参数传入
  //! 当需要用到修饰符时，就需要使用解构形式接收数据model和修饰符对象modifiers(其中记录了是否有传入某修饰符)，同时配合提供set/get函数来在中间转换原始数据
  const [model3, modifiers3] = defineModel('vm3', {
    // 需要注意的是，实测发现，这里的 set 操作只会在是通过当前子组件内部改变值时才会触发(如内部手动改变值或直接v-model绑定在表单元素上的)，若是直接由外部父组件更改的值则不会触发这里的set中间操作
    set(val) {
      console.log('set', val, model3)
      if (modifiers3.upper) {
        return val.charAt(0).toUpperCase() + val.slice(1)
      }
      return val
    },
    // 这里的 get 与上面 set 情况一下，是组件内部获取才会触发，而父组件外部不会（可能虽然这里父子组件数据是双向绑定，但数据层面还是两个，一个外部父组件自己的变量，一个子组件内部的变量）
    // get(val) {
    //   console.log('get', val, model3)
    //   return val
    // }
  });
  function updateModel3() {
    model3.value += 'suffix'
  }
  console.log('model3', model3, modifiers3);
  // <ChildComp v-model="modelData" v-model:vm2="modelData2" v-model:vm3.upper="modelData3" />
  /** 在v3.4之前的版本中，声明 v-model 的方式需要显式声明属性和更新该属性的特殊事件名，需要修饰符的还要声明一个对应的修饰符接收prop，v3.4+中实际也做了这些步骤，只是是由 defineModel() 方法内部去做而简化了用户编写 */
  /*
  // ChildComp 组件内声明（modelValue是一个特殊prop名，故使用时不用在v-model参数中指明）
  // const props = defineProps(['modelValue', 'vm2']);
  const props = defineProps({
    modelValue: Number,
    vm2: String,
    vm3: String,
    vm3Modifiers: { default: () => ({}) } // vm3对应的修饰符对象prop，固定格式：`${propName}Modifiers`
  });
  const emit = defineEmits(['update:modelValue', 'update:vm2', 'update:vm3']);

  // 根据修饰符含义对值做操作后重新赋值
  console.log(props.vm3Modifiers); // { upper: true }

  <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
  <input :value="props.vm2" @input="emit('update:vm2', $event.target.value)" />

  // 外部使用
  const modelData = ref(0);
  const modelData2 = ref('');
  const modelData3 = ref('');
  <ChildComp v-model="modelData" v-model:vm2="modelData2" v-model:vm3.upper="modelData3" />
  */


  // defineExpose() 方法显式导出可被父组件访问的当前组件内的数据或方法，否则默认都是私有的不可被外部访问
  defineExpose({ data })
</script>

<template>
  <div class="comp-base">
    <h2><a target="_blank" href="./md/CompBase.md">组件基础</a></h2>
    <p><code>defineOptions()</code> 方法(v3.3+)用于在 &lt;script setup> 下设置一些无需或没有宏定义的组件选项(从而无需像多个style标签一样再加一个script标签代码块来设置选项)， 如 name、inheritAttrs、customOptions 等</p>
    <p><code>defineProps()</code> 方法声明组件props，可传入的值同选项式API下props选项，并返回一个存储相关props的对象，<span class="color-red">注意声明时传入的参数不能访问 <code>&lt;script setup></code> 中定义的任何其他变量</span></p>
    <p><code>defineEmits()</code> 方法声明组件事件列表，可传入一组自定义事件名(可小驼峰或烤串式命名混用，均可解析)或对象形式(可用于事件校验)，并返回一个等同于 <code class="color-orange">$emit</code> 的函数，用于对外抛出事件，
      <span class="color-red">该宏方法只能在顶级作用域使用，不能在子函数中使用，该限制也同样适用于其他宏方法（defineXXX），</span>
      <span class="color-orange">在setup中只能用`emit`抛出事件，而在html模板中`$emit`和`emit`都可以用</span>，
      这里两处提到的`emit`都可以是其他名字，其取决于接收返回值的自定义变量的实际取名
    </p>
    <p><code>defineExpose()</code> 方法显式导出可被父组件访问的当前组件内的数据或方法(参数为对象形式)，否则默认都是私有的不可被外部访问</p>
    <p><code>defineModel()</code> 方法声明对外可使用 v-model 绑定的双向数据props，其底层实现逻辑关系表现与 vue2 中 prop 的`.sync`修饰符的应用逻辑非常类似：声明一个`propName`，然后通过触发`update:propName`事件来更新对应的数据，
    有几种使用方式，可使用默认参数(modelValue/@update:modelValue)，也可指定参数和应用修饰符</p>
    <p class="color-orange">在 <code>&lt;template></code> 模板中使用传入的prop以下两种访问都可以，
      <br>1、直接通过 <code>defineProps(['propName'])</code> 中定义的 <code>propName</code> 来访问，模板中会自行解构；
      <br>2、通过 <code>const props = defineProps(['propName'])</code> 返回的props对象下对应属性名 <code>props.propName</code> 来访问（在 setup JS 中则只能通过该方式访问）
    </p>
    <p><code>useSlots()</code> 返回插槽对象（结果同 <code>$slots</code>）</p>
    <p>传入prop：
      <br>直接propName访问：<span>{{ prop2 }}</span>，
      <br>通过返回对象props.propName访问：<span>{{ props.prop2 }}</span></p>
    <p>内部ref：<span>{{ data.num }}</span></p>
    <button @click="$emit('a-event')">$emit 抛出事件</button>
    <button @click="emit('a-event')" class="mgl-10">emit 抛出事件</button>
    <div>
      <span>用于 v-model 的双向绑定数据：{{ model }}</span>
      <button class="mgl-10" @click="updateModel">子组件内部updateModel</button>
      <!-- 具名插槽在vue3中都需要像vue2中使用作用域插槽的方式在 template 元素上使用 -->
      <slot name="model-out"></slot>
      <br>
      <p>同一组件内允许声明多个v-model数据供内外部双向修改</p>
      <p>内部修改</p>
      <span>model2：</span>
      <input type="text" v-model="model2" class="mgl-10" />
      <br>
      <span>model3：{{ model3 }}</span>
      <button class="mgl-10" @click="updateModel3">内部updateModel3</button>
    </div>
    <div>
      <p>外部修改</p>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

```