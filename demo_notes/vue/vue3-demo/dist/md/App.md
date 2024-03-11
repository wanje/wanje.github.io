```html
<script setup>
// import { RouterLink, RouterView } from 'vue-router'
const isCollapse = ref(true);
function toggleCollapse() {
  isCollapse.value = !isCollapse.value;
}
</script>

<template>
  <div class="page-wrap">
    <header class="page-header">
      <el-icon
        :class="{'page-collapse-btn': true, 'is-collapse': isCollapse}"
        @click="toggleCollapse"
      >
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"></path></svg>
      </el-icon>
      <span>LOGO</span>
      <nav>
        <RouterLink class="page-header__nav-item" to="/">Home</RouterLink>
        <RouterLink class="page-header__nav-item" to="/router">VueRouter</RouterLink>
        <RouterLink class="page-header__nav-item" to="/pinia">Pinia</RouterLink>
      </nav>
    </header>
  
    <section class="page-container">
      <aside :class="{'page-aside': true, 'is-collapse': isCollapse}">
        aside
      </aside>
      <main class="page-main">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.page-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.page-aside {
  width: 200px;
  border-right: 1px solid rgba(84, 84, 84, .48);
  overflow: hidden;
  transition: width 0.3s;

  &.is-collapse {
    width: 0;
  }
}
.page-main {
  flex: 1;
  padding: 15px;
  overflow: auto;
  overflow: overlay;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(84, 84, 84, .48);

  &__nav-item {
    margin-left: 20px;
    color: #33a06f;
  }
}
.page-collapse-btn {
  cursor: pointer;
  transition: transform 0.3s;

  &.is-collapse {
    transform: rotate(180deg);
  }
}
</style>

```