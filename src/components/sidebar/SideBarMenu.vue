<script setup>
import { shallowRef, ref, computed } from 'vue';
import { 
  mdiArrowCollapseHorizontal,
} from '@mdi/js';
import Button from '../Button.vue';
import Menu from '../menu/Menu.vue';
import SideBar from '../sidebar/SideBar.vue';
import CollapsibleMenu from '../collapse/CollapsibleMenu.vue';
import MenuListItem from '../menu/MenuListItem.vue';

const props = defineProps({
  items: Array,
  modelValue: Boolean,
  isClosable: Boolean,
  isCompact: Boolean,
  color: {
    type: String,
    default: 'theme-dark',
  },
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
    props.isClosable ? 'z-[101]' : 'z-50',
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
    :color="color"
    @close="close">
      <template #header>
        <slot name="header">
          <img class="h-12" src="/logo.png" />
        </slot>
      </template>
      <template v-if="!isClosable" #footer="{color: btnColor}">
        <Button 
          :color="btnColor" 
          :iconPath="mdiArrowCollapseHorizontal"
          rounded  
          @click="isCompact = !isCompact" 
        />
      </template>
      <Menu 
        :items="items"
        :color="color" 
        :isCompact="isCompact"
        isRouterMenu
      >
        <template #default="{ item }">
          <slot name="menuItem" :item="item">
            <CollapsibleMenu 
              v-if="!isCompact && item.items"
              :color="color" 
              :item="item"
              isRouterMenu
            />
            <MenuListItem
              v-if="isCompact && item.items"
              :color="color" 
              :label="item.label" 
              :iconPath="item.iconPath"
              isCompact
              @click="$emit('dropdownClick', item)"
            />
          </slot>
        </template>
      </Menu>
      <template #footer="{color}">
        <slot name="footer" :color="color"></slot>
      </template>
  </SideBar>
</template>