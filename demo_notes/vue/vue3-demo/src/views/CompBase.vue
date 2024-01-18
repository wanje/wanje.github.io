<script setup>
  // defineProps() 方法声明组件 props，可传入的值同选项式API下props选项，其返回一个对象，通过该对象访问相关props
  const props = defineProps(['num']);

  // defineEmits() 方法声明组件事件，可传入的值同选项式API下methods选项，其返回一个等同于`$emit`的函数，用于对外抛出事件
  const emit = defineEmits(['a-event'])

  const data = reactive({ num: 1 });

  // defineExpose() 方法显式导出可被父组件访问的当前组件内的数据或方法，否则默认都是私有的不可被外部访问
  defineExpose({ data })
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/CompBase.vue">组件基础</a></h2>
    <p>初始数：<span>{{ props.num || 0 }}</span></p>
    <p>内部数：<span>{{ data.num }}</span></p>
    <button @click="emit('a-event')">抛出事件</button>
  </div>
</template>

<style lang="scss" scoped>

</style>
