<script setup>
import { ref, shallowRef, computed } from "vue";
import { background, border, getDefaultTextStyle } from "../../color";

const props = defineProps({
  bgColor: String,
  borderColor: String,
});

const testStyle = computed(() => getDefaultTextStyle(props.bgColor));

const cellStyle = computed(() => {
  let style = [
    'md:text-left md:p-3',
    border[props.borderColor],
    background[props.bgColor],
    props.bgColor ? testStyle.color : ''
  ];
  return style;
})
</script>

<template>
  <th :class="cellStyle">
    <slot></slot>
  </th>
</template>
