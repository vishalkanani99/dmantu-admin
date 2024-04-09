<script setup>
  import { mdiHome, mdiRhombusSplit, mdiTable, mdiCartOutline, mdiFileDocumentMultipleOutline, mdiArrowCollapseHorizontal } from '@mdi/js';
  import Menu from './Menu.vue'
  import Button from './Button.vue'

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
      iconPath: mdiRhombusSplit,
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
  <div class="fixed flex flex-col items-center inset-y-0 left-0 w-1/6 text-theme-100 bg-theme-900 h-dvh">
    <div class="top-0 flex justify-center items-center w-full border-b border-theme-100 px-6 py-4">
      <img class="h-12" src="/logo.png" />
    </div>
    <div class="flex-1 w-full h-full">
      <Menu :items="items" />
    </div>
    <div class="bottom-0 flex justify-center items-center w-full border-t border-theme-100 px-6 py-4">
      <Button color="theme-light" :icon-path="mdiArrowCollapseHorizontal" rounded />
    </div>
  </div>
</template>