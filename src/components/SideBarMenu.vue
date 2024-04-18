<script setup>
import { shallowRef, ref, computed } from 'vue';
import { 
  mdiArrowCollapseHorizontal,
  mdiHome, 
  mdiRhombusSplit, 
  mdiTable, 
  mdiCartOutline, 
  mdiFileDocumentMultipleOutline, 
} from '@mdi/js';
import { useScreen } from '../composables/useScreen';
import Button from '../components/Button.vue';
import Menu from '../components/Menu.vue';
import SideBar from '../components/SideBar.vue';

const props = defineProps({
  modelValue: Boolean,
  isCompact: Boolean,
});

const emit = defineEmits(['update:modelValue', 'update:isCompact', 'close']);
const { isSmallScreen, isExtraSmallScreen } = useScreen();

const isCompact = computed({
  get: () => props.isCompact,
  set: (value) => {
    emit('update:isCompact', value);
  }
});

const showSideBar = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
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

const isClosable = computed(() => isSmallScreen.value || isExtraSmallScreen.value);
const defaultStyle = computed(() => {
  const style = [
    'z-50',
    { '!w-24' : isCompact.value },
  ];
  return style;
});

function close() {
  showSideBar.value = false;
  emit('close', false);
}
</script>
<template>
  <SideBar 
    v-model="showSideBar" 
    :class="defaultStyle"
    :isClosable="isClosable"
    @close="close">
      <template #header>
        <img class="h-12" src="/logo.png" />
      </template>
      <template v-if="!isClosable" #footer>
        <Button 
          color="theme-light" 
          :iconPath="mdiArrowCollapseHorizontal"
          rounded  
          @click="isCompact = !isCompact" />
      </template>
      <Menu :items="items" />
  </SideBar>
</template>