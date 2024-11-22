<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css';

import BootstrapActivation from './components/BootstrapActivation.vue'
import Header from '@/components/nav/Header.vue'
import Footer from '@/components/nav/Footer.vue'

</script>

<template>
  <Header></Header>
  <div class="container">
    <main role="main" className="pb-3">
      <RouterView />
    </main>
  </div>
  <Footer></Footer>
  <BootstrapActivation />
</template>

<style scoped>
html {
  font-size: 14px;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.btn:focus,
.btn:active:focus,
.btn-link.nav-link:focus,
.form-control:focus,
.form-check-input:focus {
  box-shadow:
    0 0 0 0.1rem white,
    0 0 0 0.25rem #258cfb;
}

html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px;
}

.container {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}

</style>
