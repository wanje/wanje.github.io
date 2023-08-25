<script setup>
  const count = ref(0);
  const x = ref(0);
  const y = ref(0);

  //! 可监听多种数据源：可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组
  // 直接监听一个 ref/reactive 响应式对象
  watch(count, (newVal, oldVal) => {
    console.log(newVal, oldVal);  // 注意回调接收的值是解包后的，不是原响应式对象
    if (newVal === 3) {
      document.title = '事不过三💣';
    } else if ( newVal > 3) {
      document.title = '原地爆炸💥';
    } else {
      document.title = 'vue3-vite-demo';
    }
  });
  // getter函数，可监听返回值的变化（就像监听一个匿名计算属性）
  watch(() => x.value + y.value, (sum) => {
    console.log(`x + y = ${sum}`)
  });
  // 多个来源组成的数组，回到函数也接收数组参数分别对应相应位置的新值/旧值
  watch([x, () => y.value], ([newX, newY], [oldX, oldY]) => {
    console.log(`新x为 ${newX}，新y为 ${newY}，旧x为 ${oldX}，旧y为 ${oldY}`)
  });

  //! 注意，不能像选项式API中那样直接监听响应式对象的属性值，需要写成getter函数的形式
  const obj = reactive({ count: 0 })
  // 错误写法，不能直接监听属性
  watch(obj.count, (count) => { console.log(count) });
  // 正确写法，需要写成getter形式，类似监听匿名计算属性
  watch(() => obj.count, (count) => { console.log(count) });

  // 注意，当直接监听一个响应式对象时，默认是深度监听的，但若是 getter 函数返回的对象时，只有对象被整个替换式才会触发回调，
  // getter 返回的对象若仅是改变了内部属性而还是同一个引用时并不会触发回调，但可以在第三个配置对象参数中设置 deep 为 true 强制转为深度监听
  watch(() => state.someObj, (newVal, oldVal) => {
    // 注意：默认`newVal` 此处和 `oldVal` 是相等的，除非 state.someObj 被整个替换了

  }, {
    deep: true  // 第三个配置对象中设置深度监听可强制转换，但因谨慎使用，因为强制转为深度监听肯定会有一定性能浪费
  });
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/ComputedApi.vue">侦/监听器：watch</a></h2>
    <p>侦听器`watch`主要用于在被监听的响应性数据发生变化后可做一系列副作用操作，无返回值，而`computed`计算属性原则上不应该有副作用操作，只是纯粹的关联数据计算</p>
    <p>语法：<code class="color-orange">watch(watchedData, callback)</code></p>
    <p>可监听多种数据源：可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组</p>
    <div>
      <button v-if="count <= 3" @click="count++">动我试试👉 {{ count }}</button>
      <span v-if="count === 3" class="color-orange">事不过三💣</span>
      <span v-if="count > 3" class="color-red">原地爆炸💥</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
</style>