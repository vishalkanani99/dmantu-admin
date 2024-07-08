import Dashboard from './pages/dashboard.vue'
import Forms from './pages/forms.vue'
import Tables from './pages/tables.vue'

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    name: 'Components',
    path: '/components',
    component: Dashboard,
  },
  {
    name: 'eCommerce',
    path: '/ecommerce',
    component: Dashboard,
  },
  {
    name: 'Forms',
    path: '/forms',
    component: Forms,
  },
  {
    name: 'Tables',
    path: '/tables',
    component: Tables,
  },
  {
    name: 'Pages',
    path: '/pages',
    component: Dashboard,
  },
];
