<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthenticationService from '@/services/AuthenticationService'
import { useAuthenticationStore } from '@/stores/AuthenticationStore';

const router = useRouter();
const username = ref("adminGod")
const pwd = ref("12345678");
const validationError = ref("");
const authenticationStore = useAuthenticationStore();

async function validateAndLogin() {
  try {
    const response = await AuthenticationService.getInstance().login(username.value, pwd.value);
    if (response.data) {
      authenticationStore.login(response.data);
      await router.push("/");
    } else if (response.errors && response.errors.length > 0) {
      validationError.value = response.errors.join('\n');
    }
  } catch (error: any) {
    console.error('An error occurred during login:', error);
    validationError.value = 'An unexpected error occurred. Please try again later.';
  }
}

</script>

<template>
  <div className="row">
    <div class="col-md-5">
      <h2>Log in</h2>
      <hr />
      <div v-if="validationError"  class="alert alert-danger" style="white-space: pre-line">{{validationError}}</div>
      <div class="form-floating mb-3">
        <input
          v-model="username"
          id="username" type="username" className="form-control" autoComplete="username" placeholder="username" />
        <label htmlFor="username" className="form-label">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input
          v-model="pwd"
          id="password" type="password" className="form-control" autoComplete="password" placeholder="password" />
        <label htmlFor="password" className="form-label">Password</label>
      </div>
      <div>
        <button @click="validateAndLogin" class="w-100 btn btn-lg btn-primary">Log in</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
