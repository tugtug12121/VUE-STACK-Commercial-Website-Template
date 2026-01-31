<template>
  <div class="contact-page">

    <!-- HERO -->
    <section class="contact-hero fade-in">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you. Send us a message and we’ll get back to you soon.</p>
    </section>

    <!-- STATUS BANNER -->
    <transition name="banner">
      <div v-if="status" class="status-banner">
        {{ status }}
      </div>
    </transition>

    <!-- MAIN GRID -->
    <section class="contact-grid">

      <!-- CONTACT FORM -->
      <div class="contact-card fade-up">
        <h2>Send a Message</h2>

        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <input v-model="name" placeholder=" " required />
            <label>Your Name</label>
          </div>

          <div class="form-group">
            <input v-model="email" type="email" placeholder=" " required />
            <label>Email Address</label>
          </div>

          <div class="form-group">
            <textarea v-model="message" rows="5" placeholder=" " required></textarea>
            <label>Your Message</label>
          </div>

          <button class="btn primary large" :disabled="sending">
            {{ sending ? 'Sending…' : 'Send Message' }}
          </button>
        </form>
      </div>

      <!-- CONTACT INFO -->
      <div class="info-card fade-up delay-1">
        <h2>Get in Touch</h2>

        <div class="info-item">
          <h3>Email</h3>
          <p>support@mywebsite.com</p>
        </div>

        <div class="info-item">
          <h3>Phone</h3>
          <p>+61 400 000 000</p>
        </div>

        <div class="info-item">
          <h3>Location</h3>
          <p>New South Wales, Australia</p>
        </div>

        <div class="info-item">
          <h3>Follow</h3>
          <p>Twitter · Instagram · LinkedIn</p>
        </div>
      </div>

    </section>

    <!-- MAP SECTION -->
    <section class="map-section fade-in">
      <div class="map-placeholder">
        <p>Map Placeholder</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const status = ref('')

function submitForm() {
  if (!name.value || !email.value || !message.value) return

  sending.value = true
  status.value = ''

  setTimeout(() => {
    sending.value = false
    status.value = 'Thanks for reaching out! We’ll get back to you soon.'
    name.value = ''
    email.value = ''
    message.value = ''
    setTimeout(() => (status.value = ''), 4000)
  }, 1000)
}
</script>

<style scoped>
.contact-page {
  background: radial-gradient(circle at top, #eef2ff, #f9fafb);
}

/* HERO */
.contact-hero {
  text-align: center;
  padding: 3rem 1rem 1.5rem;
}

.contact-hero h1 {
  font-size: 2.6rem;
  font-weight: 800;
  color: #111827;
}

.contact-hero p {
  font-size: 1.1rem;
  color: #4b5563;
  margin-top: 0.5rem;
}

/* STATUS BANNER */
.status-banner {
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: #ecfdf5;
  color: #166534;
  font-size: 0.95rem;
  text-align: center;
}

.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.banner-enter-to,
.banner-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.banner-enter-active,
.banner-leave-active {
  transition: 0.25s ease;
}

/* GRID LAYOUT */
.contact-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

/* CARDS */
.contact-card,
.info-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.contact-card h2,
.info-card h2 {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: 700;
}

/* FORM */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  background: #f9fafb;
  transition: 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #4f46e5;
  background: white;
  box-shadow: 0 0 6px rgba(79, 70, 229, 0.3);
}

.form-group label {
  position: absolute;
  left: 0.75rem;
  top: 1rem;
  color: #6b7280;
  pointer-events: none;
  transition: 0.2s ease;
}

.form-group input:focus + label,
.form-group textarea:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label {
  top: -0.6rem;
  left: 0.6rem;
  background: white;
  padding: 0 0.3rem;
  font-size: 0.8rem;
  color: #4f46e5;
}

/* INFO CARD */
.info-item {
  margin-bottom: 1.5rem;
}

.info-item h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.info-item p {
  color: #4b5563;
}

/* MAP SECTION */
.map-section {
  padding: 3rem 1rem 4rem;
  text-align: center;
}

.map-placeholder {
  max-width: 1100px;
  margin: 0 auto;
  height: 300px;
  background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  font-size: 1.2rem;
}

/* ANIMATIONS */
.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

.fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
}

.fade-up.delay-1 {
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
