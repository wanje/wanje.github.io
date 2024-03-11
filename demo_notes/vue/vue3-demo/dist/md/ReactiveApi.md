```html
<script setup>
  const state = reactive({ counter: 1 }); // 具有深层响应性，即所有后代属性都具有响应性
  // state = 1;  // 不能替换整个对象(即使上面采用 let 声明)，因这样 state 变量就失去了上面响应代理对象的引用关系
  // let {counter} = reactive({ counter: 1 }); // 不能解构，解构值不具有响应性
  function decrement() {
    state.counter--
  }
  function increment() {
    state.counter++
  }
</script>

<template>
  <div>
    <h2><a target="_blank" href="./md/ReactiveApi.md">响应式：reactive</a></h2>
    <p>该API只能用于 <span class="color-orange">对象、数组、Map、Set</span> 这样的对象或集合类型，且 <span class="color-orange">具有深层响应性</span>（即所有后代属性都具有响应性），但<span class="color-red">不能在创建时对其内属性解构赋值，解构值不具有响应性</span>
    （<span class="color-orange">因 reactive 是返回原始对象的代理对象，实际是代理对象具有响应性，其响应性是通过属性访问进行追踪的，故只有保持对该代理对象的相同引用才能正确具有响应性，任何形式破坏了引用关系也就失去了响应性</span>）</p>
    <p>
      <button @click="decrement">-</button>
      <!-- 这里为只读，故未使用双向绑定 v-model -->
      <input class="mglr-10" type="text" :value="state.counter" readonly />
      <button @click="increment">+</button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
input {
  text-align: center;
}
</style>
```