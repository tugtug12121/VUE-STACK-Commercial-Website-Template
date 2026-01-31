<template>
  <div class="wrecking-page">

    <!-- M STRIPE -->
    <div class="m-stripe"></div>

    <!-- HEADER -->
    <section class="header fade-in">
      <h1 class="title">Currently Wrecking — BMW Inventory</h1>
      <p class="subtitle">
        Live dismantling data sourced from certified BMW wreckers.  
        All components are inspected, verified, and available for request.
      </p>
    </section>

    <!-- LOCATION + WRECKER SELECTOR -->
    <section class="location-section fade-in">
      <div class="location-header">
        <h2>Preferred Wreckers in Your Region</h2>
        <p>Choose your area or allow automatic region detection.</p>
      </div>

      <div class="location-controls">
        <select
          v-model="selectedLocation"
          class="location-select"
          @change="fetchWreckers"
        >
          <option disabled value="">Select a region…</option>
          <option
            v-for="loc in locations"
            :key="loc.value"
            :value="loc.value"
          >
            {{ loc.label }}
          </option>
        </select>

        <button
          class="btn-bmw outline"
          @click="fetchWreckers"
          :disabled="loading || !selectedLocation"
        >
          {{ loading ? 'Loading…' : 'Refresh List' }}
        </button>
      </div>

      <!-- AUTO-DETECTED REGION -->
      <div v-if="autoRegion && !selectedLocation" class="auto-region">
        Automatically detected region: <strong>{{ autoRegionLabel }}</strong>
      </div>

      <!-- ERROR -->
      <div class="wrecker-status" v-if="error">
        {{ error }}
      </div>

      <!-- WRECKER GRID -->
      <div class="wrecker-grid" v-if="wreckers.length">
        <div class="wrecker-card" v-for="w in wreckers" :key="w.id">

          <div class="wrecker-header">
            <h3>{{ w.name }}</h3>
            <span class="wrecker-region">{{ regionLabel(w.region) }}</span>
          </div>

          <p class="wrecker-meta">{{ w.description }}</p>

          <!-- PART AVAILABILITY -->
          <div class="parts">
            <div class="part-row">
              <span>Engines</span>
              <strong>{{ w.parts.engines }}</strong>
            </div>
            <div class="part-row">
              <span>Transmissions</span>
              <strong>{{ w.parts.transmissions }}</strong>
            </div>
            <div class="part-row">
              <span>Body Panels</span>
              <strong>{{ w.parts.bodyPanels }}</strong>
            </div>
            <div class="part-row">
              <span>Electronics</span>
              <strong>{{ w.parts.electronics }}</strong>
            </div>
          </div>

          <!-- RATING -->
          <div class="rating">
            <span class="rating-value">{{ w.rating.toFixed(1) }}</span>
            <span class="rating-stars">★★★★★</span>
          </div>

          <!-- CONTACT -->
          <p class="wrecker-contact">
            Phone: <strong>{{ w.phone }}</strong><br>
            Email: <strong>{{ w.email }}</strong>
          </p>

          <button class="btn-bmw primary" @click="openContact(w)">
            Request Parts via This Wrecker
          </button>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div
        class="wrecker-empty"
        v-else-if="!loading && !error && selectedLocation"
      >
        No wreckers found for this region.  
        Submit a request and we’ll source options for you.
      </div>
    </section>

    <!-- VEHICLE GRID -->
    <section class="vehicle-grid">
      <div class="vehicle-card fade-up" v-for="v in vehicles" :key="v.id">
        <div class="vehicle-header">
          <h2>{{ v.title }}</h2>
          <span :class="['status', v.urgent ? 'urgent' : '']">
            {{ v.status }}
          </span>
        </div>

        <p class="vehicle-info">{{ v.details }}</p>

        <div class="vehicle-buttons">
          <router-link to="/contact" class="btn-bmw primary">Request Parts</router-link>
          <button class="btn-bmw outline">View Details</button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Need a part from a vehicle not listed?</h2>
      <p>We acquire new BMW stock weekly. Submit your request and we’ll locate the exact component.</p>
      <router-link to="/contact" class="btn-bmw primary large">Submit Custom Request</router-link>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

/* ---------------------------------------------
   REGION OPTIONS
--------------------------------------------- */
const locations = ref([
  { value: 'nsw-hunter', label: 'NSW — Hunter & Mid North Coast' },
  { value: 'nsw-sydney', label: 'NSW — Greater Sydney' },
  { value: 'vic-metro', label: 'VIC — Melbourne Metro' },
  { value: 'qld-se', label: 'QLD — South East Queensland' },
  { value: 'other', label: 'Other Regions' }
])

const selectedLocation = ref('')
const autoRegion = ref('')
const wreckers = ref([])
const loading = ref(false)
const error = ref('')

/* ---------------------------------------------
   FETCH WRECKERS
--------------------------------------------- */
async function fetchWreckers() {
  loading.value = true
  error.value = ''
  wreckers.value = []

  try {
    const url = selectedLocation.value
      ? `/api/wreckers?location=${encodeURIComponent(selectedLocation.value)}`
      : `/api/wreckers`

    const res = await fetch(url)
    if (!res.ok) throw new Error('Unable to load wreckers.')

    const data = await res.json()

    autoRegion.value = data.autoDetectedRegion || ''
    wreckers.value = data.wreckers || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

/* ---------------------------------------------
   HELPERS
--------------------------------------------- */
function regionLabel(code) {
  const match = locations.value.find(l => l.value === code)
  return match ? match.label : code
}

const autoRegionLabel = computed(() => regionLabel(autoRegion.value))

function openContact(wrecker) {
  router.push({
    path: '/contact',
    query: {
      wrecker: wrecker.name,
      region: wrecker.region
    }
  })
}

/* ---------------------------------------------
   STATIC VEHICLE DATA (can be API-driven later)
--------------------------------------------- */
const vehicles = ref([
  {
    id: 1,
    title: 'F30 328i — 2015',
    status: 'Active Dismantle',
    urgent: false,
    details: 'N20 Engine • 8HP Transmission • M‑Sport Package • Glacier Silver'
  },
  {
    id: 2,
    title: 'E90 330i — 2006',
    status: 'Stripping Now',
    urgent: false,
    details: 'N52 Engine • 6‑Speed Auto • Black Sapphire • Full Leather Interior'
  },
  {
    id: 3,
    title: 'F82 M4 — 2017',
    status: 'High‑Demand',
    urgent: true,
    details: 'S55 Engine • DCT • Yas Marina Blue • M‑Performance Exhaust'
  }
])
</script>

<style scoped>
/* ——— BMW STRIPE ——— */
.m-stripe {
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, #0033a0 0%, #0033a0 33%, #cc0000 33%, #cc0000 66%, #66ccff 66%, #66ccff 100%);
  border-radius: 4px;
  margin-bottom: 2.5rem;
}

/* ——— HEADER ——— */
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.6rem;
  font-weight: 900;
  color: #0A0A0A;
}

.subtitle {
  font-size: 1.2rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0.8rem auto 0;
}

/* ——— LOCATION SECTION ——— */
.location-section {
  max-width: 1100px;
  margin: 0 auto 3rem;
  padding: 1rem;
}

.auto-region {
  margin-bottom: 1rem;
  color: #1C69D4;
  font-weight: 600;
}

.location-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.location-select {
  min-width: 260px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
}

/* ——— WRECKER GRID ——— */
.wrecker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.wrecker-card {
  background: #fff;
  padding: 1.8rem;
  border-radius: 14px;
  border: 1px solid #d7d9dd;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: 0.25s ease;
}

.wrecker-card:hover {
  transform: translateY(-4px);
  border-color: #1C69D4;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.parts {
  margin: 1rem 0;
}

.part-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  color: #4b5563;
}

.rating {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.rating-value {
  font-weight: 700;
  color: #1C69D4;
}

.rating-stars {
  color: #1C69D4;
  opacity: 0.7;
}

/* ——— VEHICLE GRID ——— */
.vehicle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

/* ——— CTA ——— */
.cta {
  text-align: center;
  padding: 4rem 1rem;
  background: #eef0f3;
  border-radius: 18px;
  margin-top: 4rem;
}

/* ——— ANIMATIONS ——— */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeUp 0.9s ease forwards;
}

.fade-up.delay-1 { animation-delay: 0.2s; }
.fade-up.delay-2 { animation-delay: 0.4s; }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.9s ease forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
</style>
