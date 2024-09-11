import {
  mdiHome, 
  mdiRhombusSplit, 
  mdiTable,
  mdiFormSelect,
  mdiButtonCursor,
  mdiPageLayoutBody,
  mdiLabel,
  mdiArrowCollapseVertical,
  mdiFormatListBulleted,
  mdiAlert,
  mdiForumOutline,
  mdiFrequentlyAskedQuestions,
  mdiViewCarouselOutline,
  mdiTab, 
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
      {
        label: 'Chips',
        to: '/chips',
        iconPath: mdiLabel,
      },
      {
        label: 'Cards',
        to: '/cards',
        iconPath: mdiPageLayoutBody,
      },
      {
        label: 'Accordions',
        to: '/accordions',
        iconPath: mdiArrowCollapseVertical,
      },
      {
        label: 'Lists',
        to: '/lists',
        iconPath: mdiFormatListBulleted,
      },
      {
        label: 'Alerts',
        to: '/alerts',
        iconPath: mdiAlert,
      },
      {
        label: 'Modals',
        to: '/modals',
        iconPath: mdiForumOutline,
      },
      {
        label: 'Snackbars',
        to: '/snackbars',
        iconPath: mdiFrequentlyAskedQuestions,
      },
      {
        label: 'Carousels',
        to: '/carousels',
        iconPath: mdiViewCarouselOutline,
      },
      {
        label: 'Tabs',
        to: '/tabs',
        iconPath: mdiTab,
      },
    ]
  }
];

export { menu };