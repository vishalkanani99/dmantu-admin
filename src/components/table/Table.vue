<script setup>
import { computed } from "vue";

const props = defineProps({
  color: String,
});

const tableStyle = computed(() => [
  props.color,
  'w-full bg-[--color] border-[--color-inverse] text-[--color-inverse]',
  '[&_tbody_tr:nth-child(even)]:bg-[--color-m] [&_tbody_tr:nth-child(odd)]:bg-[--color-ml]',
  'md:hover:[&_tbody_tr:nth-child(even)]:bg-[--color-l] md:hover:[&_tbody_tr:nth-child(odd)]:bg-[--color-l]',
]);

</script>

<template>
  <table 
    :class="tableStyle"
  >
    <slot></slot>
  </table>
</template>
