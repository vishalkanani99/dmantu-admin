<script setup>
import { ref, shallowRef, computed } from "vue";
import { border, background, isLightColor, getDefaultTextStyle } from "../../color";

const props = defineProps({
  bgColor: {
    type: String,
    default: 'theme'
  },
  borderColor: {
    type: String,
    default: 'theme-light'
  },
});

const testStyle = computed(() => getDefaultTextStyle(props.bgColor));

const stripedRowLight = computed(() => [
  '[&_tbody_tr:nth-child(even)]:bg-transparent/20 [&_tbody_tr:nth-child(odd)]:bg-transparent/30',
  'md:hover:[&_tbody_tr:nth-child(even)]:bg-transparent/10 md:hover:[&_tbody_tr:nth-child(odd)]:bg-transparent/40',
]);

const stripedRowDark = computed(() => [
  '[&_tbody_tr:nth-child(even)]:bg-[rgb(255,255,255,0.2)] [&_tbody_tr:nth-child(odd)]:bg-[rgb(255,255,255,0.4)]',
  'md:hover:[&_tbody_tr:nth-child(even)]:bg-[rgb(255,255,255,0.1)] md:hover:[&_tbody_tr:nth-child(odd)]:bg-[rgb(255,255,255,0.5)]',
]);

const tableStyle = computed(() => [
  'w-full',
  border[props.borderColor],
  background[props.bgColor],
  testStyle.value.color,
  isLightColor(props.bgColor) ? stripedRowLight.value : stripedRowDark.value,
]);

</script>

<template>
  <table 
    :class="tableStyle"
  >
    <slot></slot>
  </table>
</template>
