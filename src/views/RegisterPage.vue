<script setup lang="ts">
import RegisterService from '@/services/RegisterService'
import { useAuthenticationStore } from '@/stores/AuthenticationStore';import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('');
const validationError = ref('')

const authenticationStore = useAuthenticationStore()

async function validateAndRegister() {
  const response = await RegisterService.getInstance().register(username.value, email.value, password.value);
  if (response.data) {
    authenticationStore.login(response.data);
    await router.push("/");
  }
  if (response.errors && response.errors.length > 0) {
    validationError.value = response.errors.join('\n');
  }
}

</script>

<template>
  <div class="row">
    <div class="col-md-5">
      <h2>Register</h2>
      <hr />
      <div class="text-danger" role="alert" style="white-space: pre-line">{{validationError}}</div>
      <div class="form-floating mb-3">
        <input
          v-model="username"
          id="firstName"
          type="text"
          class="form-control"
          autoComplete="firstName"
          placeholder="First Name"
        />
        <label htmlFor="firstName" class="form-label">Firstname</label>
      </div>
      <div class="form-floating mb-3">
        <input
          v-model="email"
          id="email"
          type="email"
          class="form-control"
          autoComplete="email"
          placeholder="name@example.com"
        />
        <label htmlFor="email" class="form-label">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input
          v-model="password"
          id="password"
          type="password"
          class="form-control"
          autoComplete="password"
          placeholder="password"
        />
        <label htmlFor="password" class="form-label">Password</label>
      </div>
      <div>
        <button @click="validateAndRegister" class="w-100 btn btn-lg btn-primary">Register</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
