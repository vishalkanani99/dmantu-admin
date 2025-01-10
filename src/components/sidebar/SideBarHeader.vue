<script setup>
  import { mdiClose, } from '@mdi/js';
  import Button from '../Button.vue';

  const props = defineProps({
    isClosable: Boolean,
    btnColor: String,
  });

  const emit = defineEmits(['close']);
</script>
<template>
  <div 
    class="relative top-0 flex items-center w-full border-b border-inherit px-6 py-4">
    <Button 
      v-if="isClosable" 
      class="absolute right-0 mr-2" 
      :color="btnColor" 
      :iconPath="mdiClose"
      size="small"
      rounded 
      @click="$emit('close')" 
    />
    <slot></slot>
  </div>
</template>