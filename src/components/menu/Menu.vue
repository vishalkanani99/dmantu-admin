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

  const emit = defineEmits(['menuClick']);
</script>
<template>
  <ul class="m-2">
    <MenuList 
      v-for="(item, key) in items"
      :key="key"
      :item="item" 
      :color="color"
      :isCompact="isCompact"
      @menuClick="(value) => $emit('menuClick', value)"
    >

      <template #item="{ item }">
        <slot :item="item"></slot>
      </template>
    </MenuList>
  </ul>
</template>