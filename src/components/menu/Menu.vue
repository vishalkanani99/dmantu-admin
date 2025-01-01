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
    itemSize: String,
    isCompact: Boolean,
    isRouterMenu: Boolean,
  });

  const emit = defineEmits(['menuClick']);
</script>
<template>
  <ul class="m-2 space-y-1">
    <MenuList 
      v-for="(item, key) in items"
      :key="key"
      :item="item" 
      :color="color"
      :itemSize="itemSize"
      :isCompact="isCompact"
      :isRouterMenu="isRouterMenu"
      @menuClick="(value) => $emit('menuClick', value)"
    >

      <template #item="{ item }">
        <slot :item="item" :key="key"></slot>
      </template>
    </MenuList>
  </ul>
</template>