<script setup>
  import { mdiHome, mdiCodeTags, mdiTable, mdiCartOutline, mdiFileDocumentMultipleOutline } from '@mdi/js';
  import Menu from './Menu.vue'

  const items = [
    {
      label: 'Dashboard',
      route: 'javascript:void(0)',
      iconPath: mdiHome,
      active: true,
    },
    {
      label: 'Components',
      route: 'javascript:void(0)',
      iconPath: mdiCodeTags,
      active: false,
    },
    {
      label: 'eCommerce',
      route: 'javascript:void(0)',
      iconPath: mdiCartOutline,
      active: false,
    },
    {
      label: 'Tables',
      route: 'javascript:void(0)',
      iconPath: mdiTable,
      active: false,
    },
    {
      label: 'Pages',
      route: 'javascript:void(0)',
      iconPath: mdiFileDocumentMultipleOutline,
      active: false,
    }
  ]
</script>
<template>
  <div class="fixed flex flex-col items-center inset-y-0 left-0 w-1/6 text-theme-light-blue bg-theme-dark-blue h-dvh">
    <div class="top-0 flex w-full border-b border-theme-light-blue px-6 py-4">
      <h2>Header</h2>
    </div>
    <div class="flex-1 w-full h-full">
      <Menu :items="items" />
    </div>
    <div class="bottom-0 flex w-full border-t border-theme-light-blue px-6 py-4">
      <h2>Footer</h2>
    </div>
  </div>
</template>