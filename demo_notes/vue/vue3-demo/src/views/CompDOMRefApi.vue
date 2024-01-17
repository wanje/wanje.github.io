<script setup>
  import CompBase from '@/views/CompBase.vue'

  const input = ref(null);  // 创建一个与组件/元素上 ref 属性值同名的 ref 对象
  const input2 = ref(null);

  function getRef(el){
    console.log(el);
    input2.value = el;
  }

  const compBase = ref(null);  // 引用一个组件

  onMounted(() => {
    console.log(input.value);
    // input.value.focus();  // 通过对应的 ref 对象来访问匹配的组件实例/元素DOM

    // 引用的<script setup>类型组件中只能访问其显式defineExpose暴露的内容
    console.log(compBase.value.data);
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
    <p class="color-red">注意：对于使用选项式API定义的组件使用`ref`引用与vue2中一样默认可以访问当该组件内所有内容<code class="color-orange">(也适用于使用了setup(){}钩子的情况，另vue3中新增了`expose`选项来限制父组件可访问的属性和方法列表)</code>，而使用<code class="color-orange">&lt;script setup></code>语法糖定义的组件默认其内容都是私有的，当引用此类组件时，默认是无法访问其内部任何未主动显式暴露的属性和方法的，
      此时可以在该子组件中使用<code class="color-orange">defineExpose</code>宏方法显式暴露可以给外部访问的内容（类似主动export）
    </p>
    <div>
      <input ref="input" />
      <!-- 接受函数 ref 时，需要用动态绑定 :ref -->
      <input :ref="getRef" class="mgl-10" />
    </div>
    <CompBase ref="compBase" v-show="false" />
  </div>
</template>

<style lang="scss" scoped>

</style>