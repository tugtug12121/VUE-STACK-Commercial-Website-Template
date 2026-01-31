<template>
  <div class="home">

    <!-- M STRIPE ACCENT BAR -->
    <div class="m-stripe"></div>

    <!-- HERO SECTION -->
    <section class="hero fade-in">
      <div class="hero-content">
        <h1 class="hero-title">Precision‑Engineered BMW Components. Independent Pricing.</h1>
        <p class="hero-subtitle">
          Advanced OEM and performance‑grade parts for every BMW platform — sourced with integrity, verified for quality, and delivered with uncompromising efficiency.
        </p>

        <div class="hero-buttons">
          <router-link to="/contact" class="btn-bmw primary">Submit Parts Inquiry</router-link>
          <router-link to="/about" class="btn-bmw outline">Our Standards</router-link>
        </div>
      </div>

      <div class="hero-graphic"></div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="features">
      <h2 class="section-title">Our Commitment to Excellence</h2>

      <div class="feature-grid">
        <div class="card-bmw fade-up">
          <h3>Authentic OEM Inventory</h3>
          <p>Every component is sourced from certified suppliers and validated to meet BMW’s engineering specifications — ensuring reliability without compromise.</p>
        </div>

        <div class="card-bmw fade-up delay-1">
          <h3>Performance‑Focused Solutions</h3>
          <p>From M‑Performance systems to precision aftermarket enhancements, we support builds engineered for longevity, power, and control.</p>
        </div>

        <div class="card-bmw fade-up delay-2">
          <h3>Specialist Technical Guidance</h3>
          <p>Our team provides expert assistance across model identification, chassis compatibility, and VIN‑specific part verification.</p>
        </div>
      </div>
    </section>

    <!-- CATEGORY BUTTON-CARDS -->
    <section class="categories">
      <h2 class="section-title">Core Component Categories</h2>

      <div class="category-grid">
        <button class="category-btn fade-up">Engine & Drivetrain Systems</button>
        <button class="category-btn fade-up delay-1">Suspension & Steering Assemblies</button>
        <button class="category-btn fade-up delay-2">Brake Systems & Rotor Packages</button>
        <button class="category-btn fade-up delay-3">Interior, Exterior & Electronic Modules</button>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta">
      <h2>Require a Specific BMW Component?</h2>
      <p>Provide your model details, VIN, or part reference — our specialists will identify the precise component engineered for your vehicle.</p>
      <router-link to="/contact" class="btn-bmw primary large">Initiate Parts Request</router-link>
    </section>

  </div>
</template>
