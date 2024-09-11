<script setup>
import { ref, computed, useSlots, onMounted, watch } from "vue";
import { getDefaultTextStyle } from '../../color';
import Button from "../Button.vue";

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'theme',
  },
  vertical: Boolean,
  isActive: Boolean,
  disabled: Boolean
});
const textStyle = computed(() => getDefaultTextStyle(props.color));
</script>

<template>
  <Button
    :class="[
      'w-full',
      {'md:w-auto': !vertical}
    ]"
    :color="isActive ? textStyle.type : color"
    :label="label" 
    :iconPath="icon" 
    :disabled="disabled" 
  />
</template>