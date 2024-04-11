<script setup>
  import { computed, shallowRef } from 'vue';
  import { 
    mdiHome, 
    mdiRhombusSplit, 
    mdiTable, 
    mdiCartOutline, 
    mdiFileDocumentMultipleOutline, 
    mdiArrowCollapseHorizontal, 
  } from '@mdi/js';
  import Menu from './Menu.vue';
  import Button from './Button.vue';

  const isCompact = shallowRef(false);
  const defaultStyle = computed(() => {
    const style = [
      'fixed flex flex-col items-center inset-y-0 left-0 text-theme-100 bg-theme-900 h-dvh',
      isCompact.value ? 'w-1/12' : 'w-1/5 xl:w-1/6',
      'transition-all',
    ];
    return style;
  });

  const items = computed(() => {
    const menu = [
      {
        label: isCompact.value ? '' : 'Dashboard',
        to: '/',
        iconPath: mdiHome,
        active: true,
      },
      {
        label: isCompact.value ? '' : 'Components',
        to: '/',
        iconPath: mdiRhombusSplit,
        active: false,
      },
      {
        label: isCompact.value ? '' : 'eCommerce',
        to: '/',
        iconPath: mdiCartOutline,
        active: false,
      },
      {
        label: isCompact.value ? '' : 'Tables',
        to: '/',
        iconPath: mdiTable,
        active: false,
      },
      {
        label: isCompact.value ? '' : 'Pages',
        to: '/',
        iconPath: mdiFileDocumentMultipleOutline,
        active: false,
      }
    ];
    return menu;
  });
</script>
<template>
  <div :class="defaultStyle">
    <div class="top-0 flex justify-center items-center w-full border-b border-theme-100 px-6 py-4">
      <img class="h-12" src="/logo.png" />
    </div>
    <div class="flex-1 w-full h-full">
      <Menu :items="items" />
    </div>
    <div class="bottom-0 flex justify-center items-center w-full border-t border-theme-100 px-6 py-4">
      <Button color="theme-light" :icon-path="mdiArrowCollapseHorizontal" rounded @click="isCompact = !isCompact"/>
    </div>
  </div>
</template>