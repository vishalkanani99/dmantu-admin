<script setup>
  import { RouterLink, useLink } from 'vue-router'
  import MenuListItem from './MenuListItem.vue';

  const props = defineProps({
    ...RouterLink.props.isExactActive,
    iconPath: String,
    label: String,
    to: String,
    isCompact: Boolean,
    isOpen: Boolean,
    hasMenu: Boolean,
    color: {
      type: String,
      default: 'theme-light',
    },
  });

  const { isExactActive } = useLink(props);
</script>
<template>
  <MenuListItem
    :iconPath="iconPath"
    :label="label" 
    :to="to" 
    :isCompact="isCompact"
    :isOpen="isOpen"
    :hasMenu="hasMenu"
    :color="color"
    :isActive="isExactActive"
  />
</template>