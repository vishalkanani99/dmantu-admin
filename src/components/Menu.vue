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
    }
  });
</script>
<template>
  <ul>
    <MenuItem 
      v-for="(item, key ) in items" 
      :key="key" 
      :label="item.label" 
      :iconPath="item.iconPath" 
      :route="item.route" 
      :isActive="item.active" />
  </ul>
</template>