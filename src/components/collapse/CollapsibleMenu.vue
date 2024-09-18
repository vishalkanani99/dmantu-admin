<script setup>
import Collapse from './Collapse.vue';
import Menu from '../menu/Menu.vue';
import MenuListItem from '../menu/MenuListItem.vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  color: {
    type: String,
    default: 'theme-light',
  },
});
</script>

<template>
  <Collapse plain>
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
    >
      <template #default="{ item }">
        <CollapsibleMenu
          v-if="item.items"
          :item="item"
          :color="color" />
      </template>
    </Menu>
  </Collapse>
</template>