import Dashboard from './pages/dashboard.vue'
import Forms from './pages/forms.vue'
import Tables from './pages/tables.vue'
import Buttons from './pages/buttons.vue'
import Cards from './pages/cards.vue'

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
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
    name: 'Buttons',
    path: '/buttons',
    component: Buttons,
  },
  {
    name: 'Cards',
    path: '/cards',
    component: Cards,
  },
];
