<script setup>
  import { computed, watchEffect } from 'vue';

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
      'fixed inset-0 z-[100] transition-opacity duration-300 overflow-hidden',
      !showOverLayer.value ? 'pointer-events-none opacity-0' : '',
    ];
    return style;
  })

  function close() {
    if(!props.imortal) {
      showOverLayer.value = false;
    }
    emit('close');
  }

  watchEffect(() => {
    document.body.classList.remove('overflow-hidden');
    if(showOverLayer.value) {
      document.body.classList.add('overflow-hidden');
    }
  })
</script>
<template>
  <div :class="defaultStyle">
    <div class="fixed inset-0 bg-theme-900 bg-opacity-60" @click="close"></div>
    <slot></slot>
  </div>
</template>