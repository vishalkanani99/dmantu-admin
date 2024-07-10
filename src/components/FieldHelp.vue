<script setup>
import { computed } from 'vue';
import { text as textColors } from '../color.js';

const props = defineProps({
  text: {
    type: String,
    default: null
  },
  type: {
    type: String,
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'error'].includes(value)
    }
  },
});

const textColor = computed( () => {
  if(props.type === 'error') {
    return textColors.danger
  }
  if(props.type === 'success') {
    return textColors.success
  }
  return 'text-theme-900';
})
</script>

<template>
  <div v-if="text" :class="['text-xs mt-1', textColor]">
    {{ text }}
  </div>
</template>
