import {
  mdiHome, 
  mdiRhombusSplit, 
  mdiTable, 
  mdiCartOutline, 
  mdiFileDocumentMultipleOutline,
  mdiFormSelect, 
} from '@mdi/js';

const menu = [
  {
    label: 'Dashboard',
    to: '/',
    iconPath: mdiHome,
  },
  {
    label: 'Components',
    to: '/components',
    iconPath: mdiRhombusSplit,
  },
  {
    label: 'eCommerce',
    to: '/ecommerce',
    iconPath: mdiCartOutline,
  },
  {
    label: 'Forms',
    to: '/forms',
    iconPath: mdiFormSelect,
  },
  {
    label: 'Tables',
    to: '/tables',
    iconPath: mdiTable,
  },
  {
    label: 'Pages',
    to: '',
    iconPath: mdiFileDocumentMultipleOutline,
    items: [
      {
        label: 'Dashboard',
        to: '/',
        iconPath: mdiHome,
      },
      {
        label: 'Components',
        to: '/components',
        iconPath: mdiRhombusSplit,
      },
    ]
  }
];

export { menu };