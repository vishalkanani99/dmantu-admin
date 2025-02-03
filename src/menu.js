import {
  mdiHome, 
  mdiRhombusSplit, 
  mdiTable,
  mdiFormSelect,
  mdiButtonCursor,
  mdiPageLayoutBody,
  mdiLabel,
  mdiArrowCollapseVertical,
  mdiAlert,
  mdiForumOutline,
  mdiFrequentlyAskedQuestions,
  mdiViewCarouselOutline,
  mdiTab,
  mdiStepForward2,
  mdiTooltip,
  mdiProgressHelper, 
} from '@mdi/js';

const menu = [
  {
    label: 'Dashboard',
    to: '/',
    iconPath: mdiHome,
  },
  {
    label: 'Forms',
    to: '',
    iconPath: mdiFormSelect,
    items: [
      { 
        label: 'Fields', 
        to: '/forms/fields',
      },
      { 
        label: 'Checkboxes', 
        to: '/forms/checkboxes', 
      },
      { 
        label: 'Maskfields', 
        to: '/forms/maskfields', 
      },
      { 
        label: 'Listboxes', 
        to: '/forms/listboxes', 
      },
      { 
        label: 'Datepickers', 
        to: '/forms/datepickers',
      },
      { 
        label: 'Ranges', 
        to: '/forms/ranges',
      },
      { 
        label: 'Layouts', 
        to: '/forms', 
      },
    ]
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
      {
        label: 'Steppers',
        to: '/steppers',
        iconPath: mdiStepForward2,
      },
      {
        label: 'Popovers',
        to: '/popovers',
        iconPath: mdiTooltip,
      },
      {
        label: 'Progress',
        to: '/progress',
        iconPath: mdiProgressHelper,
      },
    ]
  }
];

export { menu };