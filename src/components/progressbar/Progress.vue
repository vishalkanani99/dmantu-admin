<script setup>
  import { computed } from 'vue';
  import { background, text } from '../../color';

  const props = defineProps({
    value: Number,
    color: {
      type: String,
      default: 'theme',
    },
    textColor: {
      type: String,
      default: 'theme-light',
    },
    roundedL: Boolean,
    roundedR: Boolean,
    hasInfo: {
      type: Boolean,
      default: true,
    },
  });
  
  const progress = computed(() => props.value);

  const barStyle = computed(() => {
    return [
      'relative flex flex-col h-3.5',
      {'rounded-l-md': props.roundedL },
      {'rounded-r-md': props.roundedR },
      background[props.color],
      text[props.textColor],
    ];
  });

</script>
<template>
  <div
    :class="barStyle" 
    :style="{ width: `${progress}%` }"
  >
    <p v-if="hasInfo" class="absolute top-0 left-[50%] -translate-x-[50%] text-[10px] leading-4">
      <slot>{{ progress }}%</slot>
    </p>
  </div>
</template>