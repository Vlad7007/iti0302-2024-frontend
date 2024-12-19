import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ProductsPage from '@/components/products/ProductsPage.vue'
import CategoriesPage from '@/components/categories/CategoriesPage.vue'
import SuppliersPage from '@/components/suppliers/SuppliersPage.vue'
import AdminPage from '@/components/admin/AdminPage.vue'
import { useAuthenticationStore } from '@/stores/AuthenticationStore'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesPage
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SuppliersPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthenticationStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin = authStore.userInfo?.role === 'ROLE_ADMIN';

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAuthenticated || !isAdmin) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
