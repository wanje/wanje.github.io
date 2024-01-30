<script setup>
  // defineOptions() 方法(v3.3+)用于在 <script setup> 下设置一些无需或没有宏定义的组件选项
  defineOptions({
    inheritAttrs: false // 若不想要一个组件自动地继承 attribute，可设置该
  });
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/FallthroughAttrs.vue">透传Attributes</a></h2>
    <p>“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器（即组件预料之外的内容），最常见的例子就是 class、style 和 id。</p>
    <p class="color-orange">当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上（即会自动继承父组件传入的额外内容），`class`和`style`如果有重合会合并其值这点我们在vue2中就知道，
      <span class="color-red">需要注意的是vue3中对于事件监听的透传如果有重合也会合并而不是覆盖</span>，
      如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 <code>inheritAttrs: false</code>
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>
