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
    color: String,
    size: String,
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
    :size="size"
    :isActive="isExactActive"
  />
</template>