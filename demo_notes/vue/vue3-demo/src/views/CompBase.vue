<script setup>
  // defineProps() 方法声明组件 props，可传入的值同选项式API下props选项(注意参数不能访问外部任何变量)，其返回一个对象，通过该对象访问相关props
  // const props = defineProps(['num', 'prop2']);
  const props = defineProps({
    num: Number,
    prop2: {
      type: Number,
      // required: true,
      // default: 1,
      // validator(){}  // 自定义校验，其返回一个布尔值，用于如固定枚举值
    }
  });

  // defineEmits() 方法声明组件事件列表，可传入一组自定义事件名，其返回一个等同于`$emit`的函数，用于对外抛出事件
  const emit = defineEmits(['init', 'a-event']);
  emit('init'); // 在setup中只能用 emit 抛出事件，而在html模板中`$emit`和`emit`都可以用

  const data = reactive({ num: 1 });

  // defineExpose() 方法显式导出可被父组件访问的当前组件内的数据或方法，否则默认都是私有的不可被外部访问
  defineExpose({ data })
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/CompBase.vue">组件基础</a></h2>
    <p><code>defineProps()</code> 方法声明组件props，可传入的值同选项式API下props选项，并返回一个存储相关props的对象，<span class="color-red">注意声明时传入的参数不能访问 <code>&lt;script setup></code> 中定义的任何其他变量</span></p>
    <p><code>defineEmits()</code> 方法声明组件事件列表，可传入一组自定义事件名，并返回一个等同于 <code class="color-orange">$emit</code> 的函数，用于对外抛出事件，<span class="color-orange">在setup中只能用 emit 抛出事件，而在html模板中`$emit`和`emit`都可以用</span></p>
    <p><code>defineExpose()</code> 方法显式导出可被父组件访问的当前组件内的数据或方法，否则默认都是私有的不可被外部访问</p>
    <p>初始数：<span>{{ props.num || 0 }}</span></p>
    <p>内部数：<span>{{ data.num }}</span></p>
    <button @click="$emit('a-event')">$emit 抛出事件</button>
    <button @click="emit('a-event')" class="mgl-10">emit 抛出事件</button>
  </div>
</template>

<style lang="scss" scoped>

</style>
