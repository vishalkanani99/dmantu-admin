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
      default: 'theme-light',
    },
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
      :isActive="item.active">

      <template #item="{ item }">
        <slot :item="item"></slot>
      </template>
    </MenuList>
  </ul>
</template>