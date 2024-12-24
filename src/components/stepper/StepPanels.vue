<script setup>
import { computed } from 'vue';

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  },
});

const defaultClass = computed(() => {
  const base = [
    'relative', 
    props.vertical ? 'col-span-12 sm:col-span-9' : 'col-span-12'
  ]
  return base
})

</script>

<template>
  <div :class="defaultClass" >
    <slot name="buttons"></slot>
    <slot></slot>
  </div>
</template>