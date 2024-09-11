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
        'flex justify-start flex-nowrap items-center p-6 overflow-x-auto',
        vertical ? 'flex-col space-y-2 border' : 'flex-row space-x-2 shadow-md',
        vertical ? '' : '',
      ]">
      <slot></slot>
    </div>
  </div>
</template>