<script setup>
import { computed } from 'vue';

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
});


const defaultClass = computed(() => {
  const base = [
    props.vertical ? 'col-span-12 md:col-span-3' : 'col-span-12'
  ]
  
  return base
});
</script>

<template>
  <div :class="defaultClass">
    <div 
      :class="[
        'flex flex-nowrap items-center',
        vertical ? 'flex-col' : 'flex-row',
        vertical ? '' : '',
      ]">
      <slot></slot>
    </div>
  </div>
</template>