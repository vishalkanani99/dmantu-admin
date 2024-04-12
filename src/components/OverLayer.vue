<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
    imortal: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'close']);

  const showOverLayer = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });

  const defaultStyle = computed(() => {
    const style = [
      'fixed inset-0 z-40 transition-all overflow-hidden',
      showOverLayer.value ? 'translate-x-0' : '-translate-x-full',
    ];
    return style;
  })

  function close() {
    if(props.imortal) {
      return;
    }
    showOverLayer.value = false;
    emit('close', false);
  }
</script>
<template>
  <div :class="defaultStyle">
    <div class="fixed inset-0 bg-theme-100 opacity-80" @click="close"></div>
    <slot></slot>
  </div>
</template>