<script setup>
const props = defineProps({
  scrollable: Boolean,
});
</script>
<template>
  <div 
      :class="[ 
        'flex-auto p-3 md:p-4 text-[--color]',
        {'overflow-y-auto': scrollable},
      ]"
    >
    <slot></slot>
  </div>
</template>