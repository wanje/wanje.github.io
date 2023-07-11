<script setup>
  const counter = ref(1);
  function decrement() {
    counter.value--
  }
  function increment() {
    counter.value++
  }
</script>

<template>
  <div>
    <h2><a target="_blank" href="../src/views/RefApi.vue">响应式：ref</a></h2>
    <p>
      <button @click="decrement">-</button>
      <!-- 这里为只读，故未使用双向绑定 v-model -->
      <input type="text" :value="counter" readonly />
      <button @click="increment">+</button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
input {
  text-align: center;
}
</style>