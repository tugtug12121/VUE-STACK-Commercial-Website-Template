import { createRouter, createWebHistory } from 'vue-router'

// Auto-import all pages
const pages = import.meta.glob('../pages/*.vue')

// Convert them into Vue Router routes
const routes = Object.keys(pages).map((path) => {
  const name = path
    .split('/')
    .pop()
    .replace('.vue', '')
    .replace('Page', '') // Optional: remove "Page" suffix

  return {
    path: name.toLowerCase() === 'home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path],
  }
})

export default createRouter({
  history: createWebHistory(),
  routes,
})
