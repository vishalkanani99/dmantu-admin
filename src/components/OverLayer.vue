<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
  });

  const emit = defineEmits(['update:modelValue']);

  const showOverLayer = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });

  const defaultStyle = computed(() => {
    const style = [
      'fixed inset-0 z-40 transition-all',
      showOverLayer.value ? 'translate-x-0' : '-translate-x-full',
    ];
    return style;
  })
</script>
<template>
  <div :class="defaultStyle">
    <div class="fixed inset-0 bg-theme-100 opacity-80"></div>
    <slot></slot>
  </div>
</template>