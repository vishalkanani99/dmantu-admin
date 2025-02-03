import Dashboard from './pages/dashboard.vue'
import Fields from './pages/forms/fields.vue'
import Checkboxes from './pages/forms/checkboxes.vue'
import Maskfields from './pages/forms/maskfields.vue'
import Listboxes from './pages/forms/listboxes.vue'
import Datepickers from './pages/forms/datepickers.vue'
import Ranges from './pages/forms/ranges.vue'
import Forms from './pages/forms/layouts.vue'
import Tables from './pages/tables.vue'
import Buttons from './pages/buttons.vue'
import Chips from './pages/chips.vue'
import Cards from './pages/cards.vue'
import Accordions from './pages/accordions.vue';
import Alerts from './pages/alerts.vue';
import Modals from './pages/modals.vue';
import Snackbars from './pages/snackbars.vue';
import Carousels from './pages/carousels.vue';
import Tabs from './pages/tabs.vue';
import Steppers from './pages/steppers.vue';
import Popovers from './pages/popovers.vue';
import Progress from './pages/progress.vue'

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    name: 'Forms',
    path: '/forms',
    children: [
      { 
        name: 'Fields', 
        path: 'fields', 
        component: Fields 
      },
      { 
        name: 'Checkboxes', 
        path: 'checkboxes', 
        component: Checkboxes 
      },
      { 
        name: 'Maskfields', 
        path: 'maskfields', 
        component: Maskfields 
      },
      { 
        name: 'Listboxes', 
        path: 'listboxes', 
        component: Listboxes 
      },
      { 
        name: 'Datepickers', 
        path: 'datepickers', 
        component: Datepickers 
      },
      { 
        name: 'Ranges', 
        path: 'ranges', 
        component: Ranges 
      },
      { 
        name: 'Layouts', 
        path: '', 
        component: Forms 
      },
    ],
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
  {
    name: 'Popovers',
    path: '/popovers',
    component: Popovers,
  },
  {
    name: 'Progress',
    path: '/progress',
    component: Progress,
  },
];
