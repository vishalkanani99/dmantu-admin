<script setup>
  import MenuListItem from './MenuListItem.vue';
  import MenuListRouterItem from './MenuListRouterItem.vue';

  const props = defineProps({
    item: {
      type: [String, Object],
      default: () => {},
    },
    color: String,
    itemSize: String,
    isCompact: Boolean,
    isRouterMenu: Boolean,
  });

  const emit = defineEmits(['menuClick']);
</script>
<template>
  <li>
    <slot name="item" :item="item">
      <MenuListRouterItem
        v-if="isRouterMenu"
        :color="color"
        :size="itemSize" 
        :label="item?.label ?? ''" 
        :iconPath="item?.iconPath ?? ''"
        :to="item?.to ?? ''"
        :isCompact="isCompact"
        @click="$emit('menuClick', item)" 
      />
      <MenuListItem
        v-else
        :color="color"
        :size="itemSize" 
        :label="item?.label ?? ''" 
        :iconPath="item?.iconPath ?? ''"
        :to="item?.to ?? ''"
        :isCompact="isCompact"
        @click="$emit('menuClick', item)" 
      />
    </slot>
  </li>
</template>