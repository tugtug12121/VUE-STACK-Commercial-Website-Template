<template>
  <div class="contact-page">

    <!-- HERO -->
    <section class="contact-hero fade-in">
      <h1>BMW Parts Request — Genuine Components Only</h1>
      <p>
        Submit a detailed request and our parts specialists will source, verify,  
        and prepare the exact BMW components you require.
      </p>
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
        <h2>Submit a BMW Parts Inquiry</h2>
        <p class="form-subtitle">
          All fields marked <span class="required">*</span> are required.
        </p>

        <form class="contact-form" @submit.prevent="submitForm">

          <!-- NAME -->
          <div class="form-group">
            <input v-model="name" placeholder=" " required />
            <label>Your Full Name <span class="required">*</span></label>
          </div>

          <!-- EMAIL -->
          <div class="form-group">
            <input v-model="email" type="email" placeholder=" " required />
            <label>Email Address <span class="required">*</span></label>
          </div>

          <!-- PHONE -->
          <div class="form-group">
            <input v-model="phone" type="tel" placeholder=" " required />
            <label>Phone Number <span class="required">*</span></label>
          </div>

          <!-- REGION -->
          <div class="form-group">
            <select v-model="region" required>
              <option disabled value="">Select your region…</option>
              <option value="nsw-hunter">NSW — Hunter & Mid North Coast</option>
              <option value="nsw-sydney">NSW — Greater Sydney</option>
              <option value="vic-metro">VIC — Melbourne Metro</option>
              <option value="qld-se">QLD — South East Queensland</option>
              <option value="other">Other Regions</option>
            </select>
            <label>Your Region <span class="required">*</span></label>
          </div>

          <!-- BMW MODEL -->
          <div class="form-group">
            <input v-model="model" placeholder=" " required />
            <label>BMW Model (e.g., F82 M4, E90 330i) <span class="required">*</span></label>
          </div>

          <!-- VIN -->
          <div class="form-group">
            <input v-model="vin" placeholder=" " maxlength="17" required />
            <label>VIN (17‑digit Vehicle Identification Number) <span class="required">*</span></label>
          </div>

          <!-- PART NUMBER -->
          <div class="form-group">
            <input v-model="partNumber" placeholder=" " />
            <label>Part Number (if known)</label>
          </div>

          <!-- URGENCY -->
          <div class="form-group">
            <select v-model="urgency" required>
              <option disabled value="">Select urgency…</option>
              <option value="standard">Standard — 1–3 business days</option>
              <option value="priority">Priority — Same day response</option>
              <option value="critical">Critical — Vehicle off the road</option>
            </select>
            <label>Urgency Level <span class="required">*</span></label>
          </div>

          <!-- MESSAGE -->
          <div class="form-group">
            <textarea v-model="message" rows="5" placeholder=" " required></textarea>
            <label>Describe the part(s) you need <span class="required">*</span></label>
          </div>

          <!-- CONSENT -->
          <div class="consent">
            <input type="checkbox" v-model="consent" required />
            <label>I confirm the information provided is accurate and agree to be contacted regarding this request.</label>
          </div>

          <!-- SUBMIT -->
          <button class="btn primary large" :disabled="sending">
            {{ sending ? 'Submitting…' : 'Submit Request' }}
          </button>

        </form>
      </div>

      <!-- CONTACT INFO -->
      <div class="info-card fade-up delay-1">
        <h2>BMW Parts Support</h2>

        <div class="info-item">
          <h3>Email</h3>
          <p>parts@bmwservice.com</p>
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
          <h3>Hours</h3>
          <p>Mon–Fri: 8:00 AM – 5:00 PM</p>
        </div>

        <div class="info-item">
          <h3>Response Time</h3>
          <p>Standard requests: 24–48 hours<br>Priority: Same business day</p>
        </div>
      </div>

    </section>

    <!-- MAP SECTION -->
    <section class="map-section fade-in">
      <div class="map-placeholder">
        <p>BMW Service Centre Location</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const region = ref('')
const model = ref('')
const vin = ref('')
const partNumber = ref('')
const urgency = ref('')
const message = ref('')
const consent = ref(false)

const sending = ref(false)
const status = ref('')

function submitForm() {
  if (!name.value || !email.value || !phone.value || !region.value || !model.value || !vin.value || !message.value || !urgency.value || !consent.value) {
    status.value = 'Please complete all required fields.'
    return
  }

  sending.value = true
  status.value = ''

  setTimeout(() => {
    sending.value = false
    status.value = 'Your BMW parts request has been submitted. Our team will contact you shortly.'
    
    // Reset form
    name.value = ''
    email.value = ''
    phone.value = ''
    region.value = ''
    model.value = ''
    vin.value = ''
    partNumber.value = ''
    urgency.value = ''
    message.value = ''
    consent.value = false

    setTimeout(() => (status.value = ''), 5000)
  }, 1200)
}
</script>

<style scoped>
/* BMW COLOR PALETTE */
:root {
  --bmw-blue: #1C69D4;
  --bmw-dark: #0A0A0A;
  --bmw-grey: #E5E7EB;
  --bmw-light: #F9FAFB;
}

/* PAGE BACKGROUND */
.contact-page {
  background: linear-gradient(to bottom, #ffffff, #f3f4f6);
}

/* HERO */
.contact-hero {
  text-align: center;
  padding: 3rem 1rem 1.5rem;
}

.contact-hero h1 {
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--bmw-dark);
}

.contact-hero p {
  font-size: 1.15rem;
  color: #4b5563;
  margin-top: 0.5rem;
}

/* STATUS BANNER */
.status-banner {
  max-width: 1100px;
  margin: 0 auto 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #e0f2fe;
  color: #0369a1;
  border-left: 4px solid var(--bmw-blue);
}

/* GRID */
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
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.form-subtitle {
  margin-bottom: 1rem;
  color: #6b7280;
}

.required {
  color: #cc0000;
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 1rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  font-size: 1rem;
  transition: 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--bmw-blue);
  background: white;
  box-shadow: 0 0 6px rgba(28, 105, 212, 0.3);
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
.form-group select:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label,
.form-group select:not([value=""]) + label {
  top: -0.6rem;
  left: 0.6rem;
  background: white;
  padding: 0 0.3rem;
  font-size: 0.8rem;
  color: var(--bmw-blue);
}

/* CONSENT */
.consent {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.9rem;
  color: #4b5563;
}

/* MAP */
.map-section {
  padding: 3rem 1rem 4rem;
  text-align: center;
}

.map-placeholder {
  max-width: 1100px;
  margin: 0 auto;
  height: 300px;
  background: linear-gradient(135deg, #dbeafe, #93c5fd);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e3a8a;
  font-size: 1.2rem;
  font-weight: 600;
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
