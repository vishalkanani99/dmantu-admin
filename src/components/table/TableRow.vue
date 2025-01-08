<script setup>
const props = defineProps({
  color: String,
});
</script>

<template>
  <tr 
    :class="[
      props.color,
      'relative block max-w-full md:table-row',
      'border-b-4 md:border-b last:border-b-0',
      props.color 
        ? 'bg-[--color] border-[--color-l] text-[--color-inverse]' 
        : 'border-inherit bg-inherit text-inherit',
    ]"
  >
    <slot></slot>
  </tr>
</template>
