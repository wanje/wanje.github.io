<script setup>
  const data = reactive({ num: 1 });

  defineExpose({ data })
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/CompBase.vue">组件基础</a></h2>
    {{ data.num }}
  </div>
</template>

<style lang="scss" scoped>

</style>
