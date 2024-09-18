<script setup>
  import { computed } from 'vue';
  import { mdiClose, } from '@mdi/js';
  import Button from '../Button.vue';

  const props = defineProps({
    modelValue: Boolean,
    isClosable: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'close']);

  const showSideBar = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });

  const defaultStyle = computed(() => {
    const style = [
      'fixed flex flex-col items-center inset-y-0 left-0 text-theme-100 bg-theme-900 min-h-dvh overflow-hidden',
      'w-dvw xs:w-64',
      showSideBar.value ? 'translate-x-0' : '-translate-x-full',
      'transition-all',
    ];
    return style;
  });

  function close() {
    showSideBar.value = false;
    emit('close', false);
  }

</script>
<template>
  <div :class="defaultStyle">
    <div 
      class="relative top-0 flex items-center w-full border-b border-theme-100 px-6 py-4">
      <slot name="header"></slot>
      <Button 
        v-if="isClosable" 
        class="absolute right-0 mr-2 !p-1" 
        color="theme" 
        :iconPath="mdiClose"
        rounded 
        @click="close" />
    </div>
    <div class="flex-1 w-full h-full overflow-y-auto">
      <slot></slot>
    </div>
    <div 
      v-if="$slots.footer" 
      class="bottom-0 flex justify-center items-center w-full border-t border-theme-100 px-6 py-4">
      <slot name="footer"></slot>
    </div>
  </div>
</template>