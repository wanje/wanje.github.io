<script setup>
  const count = ref(0);
  // const visibleTips = ref(false);
  watch(count, (newVal) => {
    if (newVal === 3) {
      document.title = '事不过三💣';
    } else if ( newVal > 3) {
      document.title = '原地爆炸💥';
    } else {
      document.title = 'vue3-vite-demo';
    }
  })
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/ComputedApi.vue">侦/监听器：watch</a></h2>
    <p>侦听器`watch`主要用于在被监听的响应性数据发生变化后可做一系列副作用操作，无返回值，而`computed`计算属性原则上不应该有副作用操作，只是纯粹的关联数据计算</p>
    <p>语法：<code class="color-orange">watch(watchedData, callback)</code></p>
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