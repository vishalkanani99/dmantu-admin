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
    props.vertical ? 'col-span-12 sm:col-span-9' : 'col-span-12'
  ]
  return base
})

</script>

<template>
  <div :class="defaultClass" >
    <slot></slot>
  </div>
</template>