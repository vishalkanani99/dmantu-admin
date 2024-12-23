<script setup>
import { ref, shallowRef, computed } from "vue";
import { border, background, getDefaultTextStyle } from "../../color";

const props = defineProps({
  bgColor: String,
  borderColor: String,
});

const testStyle = computed(() => getDefaultTextStyle(props.bgColor));
</script>

<template>
  <tr 
    :class="[
      'relative block max-w-full md:table-row',
      'border-b-4 md:border-b last:border-b-0',
      border[borderColor] ?? 'border-inherit',
      background[bgColor] ?? 'bg-inherit',
      bgColor ? testStyle.color : 'text-inherit'
    ]"
  >
    <slot></slot>
  </tr>
</template>
