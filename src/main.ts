import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { useAuthenticationStore } from '@/stores/AuthenticationStore'

const app = createApp(App)
app.use(createPinia())

app.use(router)

const authStore = useAuthenticationStore();
authStore.initializeAuth();


app.mount('#app')
