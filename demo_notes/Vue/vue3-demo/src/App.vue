<script setup>
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-wrap">
    <header class="page-header">
      <span>LOGO</span>
      <nav>
        <RouterLink class="page-header__nav-item" to="/">Home</RouterLink>
        <RouterLink class="page-header__nav-item" to="/router">VueRouter</RouterLink>
        <RouterLink class="page-header__nav-item" to="/pinia">Pinia</RouterLink>
      </nav>
    </header>
  
    <section class="page-container">
      <aside class="page-aside">
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
  }
}
</style>
