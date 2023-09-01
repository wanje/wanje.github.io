<script setup>
  const count = ref(0);
  const x = ref(0);
  const y = ref(0);
  const todoId = ref(1);
  const resData = ref(null);

  /** watch */
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
  // 多个来源组成的数组，回调函数也接收数组参数分别对应相应位置的新值/旧值
  watch([x, () => y.value], ([newX, newY], [oldX, oldY]) => {
    console.log(`新x为 ${newX}，新y为 ${newY}，旧x为 ${oldX}，旧y为 ${oldY}`)
  });

  //! 注意，不能像选项式API中那样直接监听响应式对象的属性值，需要写成getter函数的形式
  const obj = reactive({ count: 0, someObj: {} })
  //! 错误写法，不能直接监听属性
  watch(obj.count, (count) => { console.log(count) });
  // 正确写法，需要写成getter形式，类似监听匿名计算属性
  watch(() => obj.count, (count) => { console.log(count) });

  // 注意，当直接监听一个响应式对象时，默认是深度监听的，但若是 getter 函数返回的对象时，只有对象被整个替换式才会触发回调，
  // getter 返回的对象若仅是改变了内部属性而还是同一个引用时并不会触发回调，但可以在第三个配置对象参数中设置 deep 为 true 强制转为深度监听
  watch(() => obj.someObj, (newVal, oldVal) => {
    // 注意：默认`newVal` 此处和 `oldVal` 是相等的，除非 state.someObj 被整个替换了

  }, {
    deep: true,  // 设置深度监听可强制转换，但因谨慎使用，因为强制转为深度监听肯定会有一定性能浪费
    immediate: true,   // 初始时立即执行一次回调，默认 false 只在初始化之后监听对象有更新才执行回调
    flush: 'post'   // 使回调在vue组件更新后调用以访问最新DOM，默认情况是在组件更新前就调用回调
  });


  /** watchEffect */
  // 回调内部仍然依赖受监听对象的值这种情况可使用 watchEffect 替代更方便
  watch(todoId, async (newVal) => {
    console.log('回调内部仍然会用到受监听对象的值', newVal);
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`);
    resData.value = await res.json();
  }, { immediate: true });
  // 上面的内容等价于下面的
  //! watchEffect 会自动跟踪回调中的响应式依赖，且是立即执行的，所以不用设置 immediate
  //! watchEffect 可跟踪回调内的多个响应式依赖，且只跟踪依赖的项，对于对象数据不会因为其他未依赖的数据变化而触发回调执行，这两者都比使用 watch 更有效
  //! watchEffect 仅会在其同步执行期间，才追踪依赖(及依赖收集在遇到异步代码时就会停止)。故在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
  //! 要在vue组件更新完后执行 watchEffect 则可使用 watchPostEffect 替代
  watchEffect(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`);
    resData.value = await res.json();
  });
  //! watch 与 watchEffect 有各自较适合的使用场景，两者的关系就像“一般响应式数据”(watch)和“计算属性”(watchEffect)的关系

  //! 大多都是在同步逻辑中创建侦听器，组件卸载时也会自动停止这类侦听器，而对于在异步中创建(非常少见)的侦听器就必须手动停止，以免造成内存泄漏
  // 要手动停止 watch 和 watchEffect 创建的侦听器，只需要手动调用他们返回的函数即可
  let unwatch;
  setTimeout(() => {  // 异步创建的侦听器不会自动在组件卸载是停止
    unwatch = watchEffect(() => {});
  }, 100);
  unwatch && unwatch(); // 在需要的时候手动停止侦听

</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/WatchApi.vue">侦/监听器：watch/watchEffect</a></h2>
    <p>侦听器`watch`主要用于在被监听的响应性数据发生变化后可做一系列副作用操作，无返回值，而`computed`计算属性原则上不应该有副作用操作，只是纯粹的关联数据计算</p>
    <p>语法：<code class="color-orange">watch(watchedData, callback)</code></p>
    <p>可监听多种数据源：可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组</p>
    <p>语法：<code class="color-orange">watchEffect(callback)</code></p>
    <p>自动收集 callback 中的响应式依赖并会立即执行，可同时依赖多个响应式数据，且对于对象数据其他非依赖属性变更不会影响回调触发，其与`watch`的关系就类似计算属性与data的关系</p>
    <div>
      <button v-if="count <= 3" @click="count++">动我试试👉 {{ count }}</button>
      <span v-if="count === 3" class="color-orange">事不过三💣</span>
      <span v-if="count > 3" class="color-red">原地爆炸💥</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>