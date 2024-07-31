<script setup>
import { shallowRef, ref, computed } from 'vue';
import { 
  mdiArrowCollapseHorizontal,
} from '@mdi/js';
import Button from '../components/Button.vue';
import Menu from '../components/Menu.vue';
import SideBar from '../components/SideBar.vue';
import CollapsibleMenu from './CollapsibleMenu.vue';
import MenuListItem from './MenuListItem.vue';

const props = defineProps({
  items: Array,
  modelValue: Boolean,
  isClosable: Boolean,
  isCompact: Boolean,
});

const emit = defineEmits(['update:modelValue', 'update:isCompact', 'close', 'dropdownClick']);

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

const isClosable = computed(() => props.isClosable);
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
        <slot name="header">
          <img class="h-12" src="/logo.png" />
        </slot>
      </template>
      <template v-if="!isClosable" #footer>
        <Button 
          color="theme-light" 
          :iconPath="mdiArrowCollapseHorizontal"
          rounded  
          @click="isCompact = !isCompact" />
      </template>
      <Menu 
        :items="items" 
        :isCompact="isCompact"
      >
        <template #default="{ item }">
          <CollapsibleMenu 
            v-if="!isCompact && item.items"
            color="theme-dark" 
            :item="item"
          />
          <MenuListItem
            v-if="isCompact && item.items"
            color="theme-dark" 
            :label="item.label" 
            :iconPath="item.iconPath"
            :to="item.to"
            isCompact
            @click="$emit('dropdownClick', item)"
          />
        </template>
      </Menu>
  </SideBar>
</template>