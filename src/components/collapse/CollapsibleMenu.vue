<script setup>
import Collapse from './Collapse.vue';
import Menu from '../menu/Menu.vue';
import MenuListItem from '../menu/MenuListItem.vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  color: String,
  isRouterMenu: Boolean,
});
</script>

<template>
  <Collapse :expanded="expanded" plain>
    <template #handler="{ expand }">
      <MenuListItem
        :color="color" 
        :label="item.label" 
        :iconPath="item.iconPath"
        :to="item.to"
        :isOpen="expand"
        hasMenu />
    </template>
    <Menu 
      :items="item.items"
      :color="color"
      :isRouterMenu="isRouterMenu"
    >
      <template #default="{ item }">
        <CollapsibleMenu
          v-if="item.items"
          :item="item"
          :color="color"
          :isRouterMenu="isRouterMenu" 
        />
      </template>
    </Menu>
  </Collapse>
</template>