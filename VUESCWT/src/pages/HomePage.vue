<template>
  <div class="home">

    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to My Website</h1>
        <p class="hero-subtitle">
          A clean, modern Vue-powered website template built for speed, clarity, and style.
        </p>

        <div class="hero-buttons">
          <router-link to="/about" class="btn primary">Learn More</router-link>
          <router-link to="/contact" class="btn secondary">Contact Us</router-link>
        </div>
      </div>

      <div class="hero-graphic"></div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="features">
      <h2 class="section-title">What We Offer</h2>

      <div class="feature-grid">
        <div class="card fade-up">
          <h3>Fast & Modern</h3>
          <p>Built with Vue 3 and Vite for instant loading and smooth navigation.</p>
        </div>

        <div class="card fade-up delay-1">
          <h3>Responsive Design</h3>
          <p>Looks great on desktops, tablets, and mobile devices automatically.</p>
        </div>

        <div class="card fade-up delay-2">
          <h3>Easy to Expand</h3>
          <p>Add new pages and features without touching the router or navbar.</p>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta">
      <h2>Ready to explore more?</h2>
      <router-link to="/contact" class="btn primary large">Get in Touch</router-link>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* ------------------------------
   HERO SECTION
--------------------------------*/
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 1rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-content {
  max-width: 500px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.25s ease;
}

.btn.primary {
  background: #4f46e5;
  color: white;
}

.btn.primary:hover {
  background: #4338ca;
}

.btn.secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn.secondary:hover {
  background: #d1d5db;
}

.btn.large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Decorative hero graphic */
.hero-graphic {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}

/* ------------------------------
   FEATURES SECTION
--------------------------------*/
.features {
  padding: 3rem 1rem;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* ------------------------------
   CTA SECTION
--------------------------------*/
.cta {
  text-align: center;
  padding: 4rem 1rem;
  background: #f3f4f6;
  border-radius: 16px;
  margin-top: 3rem;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

/* ------------------------------
   ANIMATIONS
--------------------------------*/
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
}

.fade-up.delay-1 {
  animation-delay: 0.2s;
}

.fade-up.delay-2 {
  animation-delay: 0.4s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ------------------------------
   RESPONSIVE
--------------------------------*/
@media (max-width: 768px) {
  .hero {
    text-align: center;
    justify-content: center;
  }

  .hero-graphic {
    width: 260px;
    height: 260px;
  }
}
</style>
