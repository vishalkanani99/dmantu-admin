import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'
import './style.css'
import App from './App.vue'
import { routes } from './routes'


const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { activeColors } = useTheme();

const app = createApp(App);
app.use(router);
app.mount('#app');
app.config.globalProperties.activeColors = activeColors.value;