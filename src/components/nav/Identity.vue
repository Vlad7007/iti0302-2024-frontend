<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { IUserInfo } from '@/models/IUserInfo'
import { useAuthenticationStore } from '@/stores/AuthenticationStore'

const router = useRouter()
const authenticationStore = useAuthenticationStore()

const userInfo = computed((): IUserInfo => {
  console.log(authenticationStore.isAuthenticated)
  return authenticationStore.userInfo ?? { token:'', sub: '', role: '', userId: 0}
})

const doLogout = () => {
  authenticationStore.logout()
  router.push('/')
}
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
