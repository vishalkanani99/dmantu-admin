<script setup>
  import MenuList from './MenuList.vue'

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
      default: 'theme-dark',
    },
    isCompact: Boolean,
  });
</script>
<template>
  <ul>
    <MenuList 
      v-for="(item, key) in items"
      class="m-2" 
      :key="key"
      :item="item" 
      :color="color"
      :isCompact="isCompact">

      <template #item="{ item }">
        <slot :item="item"></slot>
      </template>
    </MenuList>
  </ul>
</template>