<script setup>
  
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/CustDirective.vue">自定义指令</a></h2>
    <p>自定义指令主要是为了<span class="color-orange">重用涉及普通元素的底层DOM访问的逻辑</span>，其由一个包含类似组件生命周期钩子的对象来定义，
      在 <code>&lt;script setup></code> 中，<span class="color-orange">任何以 v 开头的小驼峰命名的变量都被当作一个自定义指令，</span>
      选项式API下与vue2一样通过`directives`选项注册局部指令，全局指令则通过 <code>app.directive()</code> 方法注册（选项式和全局注册名无需以`v`开头）
    </p>
    <p>对象全量钩子(都可选)：</p>
    <div>
      <img src="@/assets/customDirective.jpg" alt="customDirective" width="400" class="vt" />
      <img src="@/assets/customDirectiveHookPrams.jpg" alt="customDirectiveHookPrams" width="400" class="vt" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
