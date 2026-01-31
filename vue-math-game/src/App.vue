<script setup>
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="layout">
    <NavBar />

    <main class="content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>
