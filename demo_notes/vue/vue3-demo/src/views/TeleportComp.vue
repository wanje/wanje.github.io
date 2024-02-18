<script setup>
  
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/TeleportComp.vue">传送：Teleport</a></h2>
    <p><code>&lt;Teleport></code> 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。<br>
      该组件通过 <code>to</code> 属性指定传送目标，其值可以是一个<span class="color-orange">CSS选择器字符串</span>，也可以是一个<span class="color-orange">DOM元素对象</span>，
      <span class="color-red">必须保证`to`属性指向的目标元素先于当前组件<code>&lt;Teleport></code>挂载时已经存在于DOM中</span><br>
      <code>disabled</code> 布尔属性可以设置是否禁用该组件，可用于动态切换是否传送到外部DOM的场景<br>
      <span class="color-red">该组件可以多次使用，且注意其只传送其内部的内容，并非传送整个组件DOM，对于同一个传送目标只是按时间顺序在指定的目标元素尾部追加内容，不是覆盖目标内已有内容（可看作是一种剪切行为）</span>
    </p>
    <Teleport to="main">
      <p>该部分内容被插入到指定的main元素内(作为直接子元素)，Teleport 组件只是改变了渲染的DOM结构，不会影响组件间的逻辑关系和Vue组件的层级关系</p>
      <p>组件2</p>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>

</style>
