<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileOpen = ref(false)

// Auto-generate nav links from routes
const links = router.getRoutes()
  .filter(r => r.path !== '/:pathMatch(.*)*')
  .map(r => ({
    name: r.path === '/'
      ? 'Home'
      : r.path.replace('/', '').replace(/^\w/, c => c.toUpperCase()),
    path: r.path
  }))

function toggleMenu() {
  mobileOpen.value = !mobileOpen.value
}
</script>

<template>
  <header class="navbar">
    <div class="nav-inner">
      <div class="logo">My Website</div>

      <!-- Desktop Nav -->
      <nav class="nav-links desktop-only">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="nav-item"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Mobile Hamburger -->
      <button class="hamburger mobile-only" @click="toggleMenu">
        <span :class="{ open: mobileOpen }"></span>
        <span :class="{ open: mobileOpen }"></span>
        <span :class="{ open: mobileOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <nav v-if="mobileOpen" class="mobile-menu mobile-only">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="mobile-item"
          @click="mobileOpen = false"
        >
          {{ link.name }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
/* NAVBAR BASE */
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: #111827;
}

/* DESKTOP NAV */
.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #111827;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 2px;
  background: #4f46e5;
  transition: width 0.25s ease;
}

.nav-item:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: #4f46e5;
  font-weight: 600;
}

/* MOBILE NAV */
.mobile-only {
  display: none;
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  width: 26px;
  height: 3px;
  background: #111827;
  border-radius: 3px;
  transition: 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.mobile-item {
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: background 0.2s;
}

.mobile-item:hover {
  background: #f3f4f6;
}

/* SLIDE ANIMATION */
.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-enter-active {
  transition: 0.25s ease;
}

.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-leave-active {
  transition: 0.2s ease;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }
}
</style>
