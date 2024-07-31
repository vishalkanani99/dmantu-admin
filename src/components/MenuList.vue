<script setup>
  import MenuListItem from './MenuListItem.vue';

  const props = defineProps({
    item: {
      type: Object,
      default: () => {},
    },
    color: {
      type: String,
      default: 'theme-dark',
    },
    isCompact: Boolean,
  });
</script>
<template>
  <li>
    <slot name="item" :item="item">
      <MenuListItem
        :color="color" 
        :label="item.label" 
        :iconPath="item.iconPath"
        :to="item.to"
        :isCompact="isCompact" />
    </slot>
  </li>
</template>