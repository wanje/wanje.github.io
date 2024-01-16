<script setup>
  const input = ref(null);  // 创建一个与组件/元素上 ref 属性值同名的 ref 对象
  const input2 = ref(null);

  function getRef(el){
    console.log(el);
    input2.value = el;
  }

  onMounted(() => {
    console.log(input.value);
    // input.value.focus();  // 通过对应的 ref 对象来访问匹配的组件实例/元素DOM
  });

</script>

<template>
  <div>
    <h2><a target="_blank" href="../src/views/CompDOMRefApi.vue">组件/DOM引用：ref</a></h2>
    <p>必须声明一个与组件或元素上 ref 属性的值同名的响应式 ref 对象，通过该 ref 对象来引用组件实例或DOM元素</p>
    <p>组件或元素上设置ref属性：<code class="color-orange">&lt;input ref="input" /></code>，属性值还可以是一个函数</p>
    <p>JS中声明与上面ref属性值同名的ref对象：<code class="color-orange">const input = ref(null);</code></p>
    <p>通过同名ref对象访问组件实例/元素DOM引用：<code class="color-orange">input.value</code></p>
    <p class="color-red">与 v-for 指令一起使用时，对应的 ref 对象将是一个数组列表，此时可初始化为`ref([])`，但返回的ref数组内容顺序并不能保证与v-for中源数组的顺序一致</p>
    <p>与 v-for 一同使用：<code class="color-orange">const list = ref([]); &lt;li v-for="n in 7" :key="n" ref="list">内容&lt;/li></code></p>
    <p>函数值 ref：<code class="color-orange">&lt;input :ref="(el) => {aVar = el}" /></code></p>
    <div>
      <input ref="input" />
      <!-- 函数接受 ref 时，需要用动态绑定 :ref -->
      <input :ref="getRef" class="mgl-10" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>