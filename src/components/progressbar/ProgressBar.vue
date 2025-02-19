<script setup>
  import { computed } from 'vue';
  import Progress from './Progress.vue';

  const props = defineProps({
    modelValue: Number,
    max: {
      type: Number,
      default: 100,
      validator(value, props) {
        // The value must be greater than min
        return props.modelValue <= value;
      }
    },
    trackColor: String,
    activeTrackColor: String,
    infoColor: String,
    hasInfo: {
      type: Boolean,
      default: true,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const step = computed(() => props.max / 100);
  const progress = computed(() => props.modelValue < props.max ? props.modelValue / step.value : 100 );

  const barStyle = computed(() => {
    return [
      props.trackColor,
      'relative flex h-3.5 w-full rounded-md',
      'bg-[--color]',
    ];
  });

  const infoStyle = computed(() => {
    return [
      props.infoColor, 
      'absolute top-0 left-[50%] -translate-x-[50%]',
      props.infoColor ? 'text-[--color]' : 'text-[--color-inverse]',
      'text-[10px] leading-4',
    ];
  })
</script>
<template>
  <div 
    :class="barStyle"
  >
    <slot name="progress" :progress="progress">
      <Progress 
        :value="progress"  
        :color="activeTrackColor"
        :roundedL="progress > 0" 
        :roundedR="progress === 100"
        :hasInfo="false" 
      />
    </slot>
    <p v-if="hasInfo" :class="infoStyle">
      <slot>{{ modelValue }}%</slot>
    </p>
  </div>
</template>