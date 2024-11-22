<script setup lang="ts">
import Identity from './Identity.vue';
import { useAuthenticationStore } from '@/stores/AuthenticationStore'

const authenticationStore = useAuthenticationStore();

</script>

<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <RouterLink to="/" class="navbar-brand">WebApp</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link text-dark">Home</RouterLink>
                        </li>
                        <template v-if="authenticationStore.isAuthenticated">
                            <li class="nav-item">
                              Products
                            </li>
<!--                            <li class="nav-item">-->
<!--                                <RouterLink class="nav-link text-dark" :to="{ name: 'products' }">Products</RouterLink>-->
<!--                            </li>-->
<!--                            <li class="nav-item">-->
<!--                                <RouterLink class="nav-link text-dark" :to="{ name: 'categories' }">Categories</RouterLink>-->
<!--                            </li>-->
<!--                            <li class="nav-item">-->
<!--                                <RouterLink class="nav-link text-dark" :to="{ name: 'suppliers' }">Suppliers</RouterLink>-->
<!--                            </li>-->
                        </template>
                    </ul>
                    <Identity />
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>
