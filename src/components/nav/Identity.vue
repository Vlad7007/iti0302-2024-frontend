<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/AuthenticationStore'
import AuthenticationService from '@/services/AuthenticationService'

const router = useRouter()
const authenticationStore = useAuthenticationStore()
const authenticationService = AuthenticationService.getInstance()

const doLogout = async () => {
  try {
    await authenticationService.logout();
    authenticationStore.logout();
    await router.push('/');
  } catch (error: any) {
    console.error(error);
  }
};

</script>

<style scoped></style>

<template>
  <div>
    <ul v-if="authenticationStore.isAuthenticated" class="navbar-nav">
      <li class="nav-item">
        <span class="nav-link text-dark" title="Manage">
          Hello, {{ authenticationStore.userInfo?.sub }}!
        </span>
      </li>
      <li class="nav-item">
        <a @click="doLogout" href="#" class="nav-link text-dark" title="Logout">Logout</a>
      </li>
    </ul>
    <ul v-else class="navbar-nav">
      <li class="nav-item">
        <RouterLink class="nav-link text-dark" :to="{ name: 'register' }">Register</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link text-dark" :to="{ name: 'login' }">Login</RouterLink>
      </li>
    </ul>
  </div>
</template>
