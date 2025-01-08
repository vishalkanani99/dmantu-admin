<script setup>
import { computed } from "vue";

const props = defineProps({
  color: String,
});

const cellStyle = computed(() => {
  let style = [
    props.color,
    'md:text-left md:p-3',
    'bg-[--color] border-[--color-l]',
    { 'text-[--color-inverse]': props.color },
  ];
  return style;
})
</script>

<template>
  <th :class="cellStyle">
    <slot></slot>
  </th>
</template>
