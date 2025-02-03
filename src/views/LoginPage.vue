<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthenticationService from '@/services/AuthenticationService'
import { useAuthenticationStore } from '@/stores/AuthenticationStore';

const router = useRouter();
const username = ref("admin")
const pwd = ref("12345678");
const validationError = ref("");
const authenticationStore = useAuthenticationStore();
const authenticationService = AuthenticationService.getInstance()

async function validateAndLogin() {
  try {
    const response = await authenticationService.login(username.value, pwd.value);
    if (response.data) {
      authenticationStore.login(response.data);
      await router.push("/");
    } else if (response.errors && response.errors.length > 0) {
      validationError.value = response.errors.join('\n');
    }
  } catch (error: any) {
    const errorData = error.response?.data || error.message;
    if (typeof errorData === 'string' && errorData.includes('<html>')) {
      validationError.value = 'Failed to connect to the server. Please try again later.';
    } else {
      validationError.value = 'An error occurred during login. Please try again.';
    }
    console.error('An error occurred during login:', error);
  }
}

</script>

<template>
  <div className="row">
    <div class="col-md-5">
      <h2>Log in</h2>
      <hr />
      <div v-if="validationError" class="alert alert-danger" style="white-space: pre-line">{{validationError}}</div>
      <form @submit.prevent="validateAndLogin">
        <div class="form-floating mb-3">
          <input
            v-model="username"
            id="username" type="username" className="form-control" autoComplete="username" placeholder="username" />
          <label htmlFor="username" className="form-label">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            v-model="pwd"
            id="password" type="password" className="form-control" autoComplete="password" placeholder="password" />
          <label htmlFor="password" className="form-label">Password</label>
        </div>
        <div>
          <button type="submit" class="w-100 btn btn-lg btn-primary">Log in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
