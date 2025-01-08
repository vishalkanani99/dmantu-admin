<script setup>
const props = defineProps({
  text: String,
  type: {
    type: String,
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'error'].includes(value)
    }
  },
});
</script>

<template>
  <div 
    v-if="text" 
    :class="[
      { 'danger': props.type === 'error' },
      { 'success': props.type === 'success' },
      'text-xs mt-1 text-[--color]'
    ]"
  >
    {{ text }}
  </div>
</template>
