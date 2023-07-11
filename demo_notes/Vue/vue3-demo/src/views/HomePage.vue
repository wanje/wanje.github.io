<script setup>
import ReactiveApi from './ReactiveApi.vue'
import RefApi from './RefApi.vue'
</script>

<template>
  <section>
    <h2 class="mgt-0"><a target="_blank" href="../src/main.js">创建应用</a></h2>
    <p>vue3中创建应用实例是通过 <code>createApp()</code>方法，最后用 <code>mount()</code>挂载到容器上，而不是vue2中的`new Vue()`，因此可以创建多个实例，互相之间都是独立的，此后的全局组件、指令等都直接在该实例上注册，从而可以用于在常规页面中多个局部位置单独使用vue。</p>
    <p>注册全局组件 <code>app.component('name', 组件对象)</code></p>
    <p>注册全局指令 <code>app.directive('name', 指令对象或函数)</code></p>
    <p>大多原来挂载在组件实例 <code>this</code> 上的api（如 <code>$nextTick</code>）都有对应的组合式api下的同名api（只是去掉了开头的 <code>$</code>）</p>
    <ReactiveApi></ReactiveApi>
    <RefApi></RefApi>
  </section>
</template>
