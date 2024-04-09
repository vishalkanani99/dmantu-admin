import { createWebHistory, createRouter } from 'vue-router'
import Dashboard from './pages/dashboard.vue'

const routes = [
  { path: '/dashboard', component: Dashboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
