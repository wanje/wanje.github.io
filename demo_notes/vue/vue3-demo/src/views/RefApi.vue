<script setup>
  const counter = ref(1); // 实际将传入的值都包装成了一个对象，使得常规数据类型，在JS中要通过`.value`去访问和修改其值，而html中会自动解包故无需通过`.value`访问
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