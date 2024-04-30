<script setup>
  import MenuItem from './MenuItem.vue'

  const props = defineProps({
    vertical: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: 'theme-light',
    },
  });
</script>
<template>
  <ul>
    <MenuItem 
      v-for="(item, key ) in items" 
      :key="key"
      :color="color" 
      :label="item.label" 
      :iconPath="item.iconPath" 
      :to="item.to" 
      :isActive="item.active" />
  </ul>
</template>