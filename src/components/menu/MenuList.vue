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

  const emit = defineEmits(['menuClick']);
</script>
<template>
  <li>
    <slot name="item" :item="item">
      <MenuListItem
        :color="color" 
        :label="item?.label ?? ''" 
        :iconPath="item?.iconPath ?? ''"
        :to="item?.to ?? ''"
        :isCompact="isCompact"
        @click="$emit('menuClick', item)" 
      />
    </slot>
  </li>
</template>