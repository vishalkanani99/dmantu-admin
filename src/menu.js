import {
  mdiHome, 
  mdiRhombusSplit, 
  mdiTable,
  mdiFormSelect,
  mdiButtonCursor, 
} from '@mdi/js';

const menu = [
  {
    label: 'Dashboard',
    to: '/',
    iconPath: mdiHome,
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
    label: 'Components',
    to: '',
    iconPath: mdiRhombusSplit,
    items: [
      {
        label: 'Buttons',
        to: '/buttons',
        iconPath: mdiButtonCursor,
      },
    ]
  }
];

export { menu };