<script setup>
  import MenuListItem from './MenuListItem.vue';

  const props = defineProps({
    item: {
      type: Object,
      default: () => {},
    },
    color: {
      type: String,
      default: 'theme-light',
    },
    isActive: Boolean,
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
        :isActive="isActive" />
    </slot>
  </li>
</template>