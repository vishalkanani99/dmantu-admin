<script setup>
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";

const props = defineProps({
  color: String,
});

const { lightColors } = useTheme();

const stripedRowLight = computed(() => [
  '[&_tbody_tr:nth-child(even)]:bg-transparent/20 [&_tbody_tr:nth-child(odd)]:bg-transparent/30',
  'md:hover:[&_tbody_tr:nth-child(even)]:bg-transparent/10 md:hover:[&_tbody_tr:nth-child(odd)]:bg-transparent/40',
]);

const stripedRowDark = computed(() => [
  '[&_tbody_tr:nth-child(even)]:bg-[rgb(255,255,255,0.2)] [&_tbody_tr:nth-child(odd)]:bg-[rgb(255,255,255,0.4)]',
  'md:hover:[&_tbody_tr:nth-child(even)]:bg-[rgb(255,255,255,0.1)] md:hover:[&_tbody_tr:nth-child(odd)]:bg-[rgb(255,255,255,0.5)]',
]);

const tableStyle = computed(() => [
  props.color,
  'w-full bg-[--color] border-[--color-l] text-[--color-inverse]',
  lightColors.includes(props.color) ? stripedRowLight.value : stripedRowDark.value,
]);

</script>

<template>
  <table 
    :class="tableStyle"
  >
    <slot></slot>
  </table>
</template>
