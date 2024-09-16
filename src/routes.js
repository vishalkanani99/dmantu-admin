import Dashboard from './pages/dashboard.vue'
import Forms from './pages/forms.vue'
import Tables from './pages/tables.vue'
import Buttons from './pages/buttons.vue'
import Chips from './pages/chips.vue'
import Cards from './pages/cards.vue'
import Accordions from './pages/accordions.vue';
import Lists from './pages/lists.vue';
import Alerts from './pages/alerts.vue';
import Modals from './pages/modals.vue';
import Snackbars from './pages/snackbars.vue';
import Carousels from './pages/carousels.vue';
import Tabs from './pages/tabs.vue';
import Steppers from './pages/steppers.vue';

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
    name: 'Chips',
    path: '/chips',
    component: Chips,
  },
  {
    name: 'Cards',
    path: '/cards',
    component: Cards,
  },
  {
    name: 'Accordions',
    path: '/accordions',
    component: Accordions,
  },
  {
    name: 'Lists',
    path: '/lists',
    component: Lists,
  },
  {
    name: 'Alerts',
    path: '/alerts',
    component: Alerts,
  },
  {
    name: 'Modals',
    path: '/modals',
    component: Modals,
  },
  {
    name: 'Snackbars',
    path: '/snackbars',
    component: Snackbars,
  },
  {
    name: 'Carousels',
    path: '/carousels',
    component: Carousels,
  },
  {
    name: 'Tabs',
    path: '/tabs',
    component: Tabs,
  },
  {
    name: 'Steppers',
    path: '/steppers',
    component: Steppers,
  },
];
