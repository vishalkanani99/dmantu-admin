<script setup>
  import { computed, shallowRef, onMounted } from 'vue';
  import { useScreen } from '../composables/useScreen';

  import { 
    mdiHome, 
    mdiRhombusSplit, 
    mdiTable, 
    mdiCartOutline, 
    mdiFileDocumentMultipleOutline, 
    mdiArrowCollapseHorizontal,
    mdiClose, 
  } from '@mdi/js';
  import Menu from './Menu.vue';
  import Button from './Button.vue';

  const props = defineProps({
    modelValue: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'close']);
  const { isSmallScreen, isExtraSmallScreen } = useScreen();

  const showSideBar = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });
  const isCompact = shallowRef(false);

  const SideBarWidth = computed(() => {
    let style = isCompact.value ? 'w-1/12' : 'md:w-1/5 xl:w-1/6'

    if( isSmallScreen.value ) {
      style = 'w-3/5';
    }

    if( isExtraSmallScreen.value ) {
      style = 'w-dvw';
    }

    return style;
  });
  
  const isClosableSidebar = computed(() => isSmallScreen.value || isExtraSmallScreen.value );
  const isSidebarOpen = computed(() => showSideBar.value || !isClosableSidebar.value );

  const defaultStyle = computed(() => {
    const style = [
      'fixed flex flex-col items-center inset-y-0 left-0 text-theme-100 bg-theme-900 h-dvh overflow-hidden',
      SideBarWidth.value,
      isSidebarOpen.value ? 'translate-x-0' : '-translate-x-full',
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

  function close() {
    showSideBar.value = false;
    emit('close', false);
  }

</script>
<template>
  <div :class="defaultStyle">
    <div 
      :class="[
        'relative top-0 flex items-center w-full border-b border-theme-100 px-6 py-4',
        { 'justify-center' : !isClosableSidebar },
      ]">
      <img class="h-12" src="/logo.png" />
      <Button 
        v-if="isClosableSidebar" 
        class="absolute right-0 mr-2" 
        color="theme-light" 
        :iconPath="mdiClose"
        rounded 
        @click="close" />
    </div>
    <div class="flex-1 w-full h-full overflow-y-auto">
      <Menu :items="items" />
    </div>
    <div v-if="!isClosableSidebar" class="bottom-0 flex justify-center items-center w-full border-t border-theme-100 px-6 py-4">
      <Button 
        color="theme-light" 
        :iconPath="mdiArrowCollapseHorizontal"
        rounded  
        @click="isCompact = !isCompact" />
    </div>
  </div>
</template>