<script setup>
import { computed } from 'vue';
import { theme } from '../../../color';
import Chip from '../../Chip.vue'; 
import Button from '../../Button.vue';
import { mdiClose } from '@mdi/js';
import Icon from '../../Icon.vue';

const props = defineProps({
  modelValue: [String, Object, Array],
  selectedValue: Array,
  color: String,
  outline: Boolean,
  isMultiselect: Boolean,
})

const emit = defineEmits(['update:modelValue', 'focus', 'input', 'clear', 'remove']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const defaultStyle = computed(() => {
  return [
    props.color,
    'relative flex items-center justify-start gap-1 border rounded-md',
    'pl-3 pr-2 py-2',
    props.outline 
        ? 'bg-transparent border-[--color] text-[--color]' 
        : 'bg-[--color] border-[--color-inverse] text-[--color-inverse]',
  ];
});
</script>
<template>
  <div :class="defaultStyle">
    <div class="flex-1 flex flex-wrap items-center justify-start w-full gap-1">
      <Chip 
        v-for=" (value, key) in selectedValue" 
        :key="key" 
        :color="theme.getInverse(color)" 
        :label="value"
        @close="$emit('remove', key)" 
        :closable="isMultiselect" 
      />
      <input 
        v-model="modelValue" 
        type="text" 
        class="flex-1 w-full bg-transparent focus:ring-0 outline-none border-0 p-0"
        @focus="$emit('focus')" 
        @input="$emit('input')" 
      />
    </div>
    <Button 
      class="!p-1 w-6 h-6" 
      :color="theme.getInverse(color)"
      rounded 
      @click="$emit('clear')"
    >
      <Icon class="w-4 h-4" :path="mdiClose" />
    </Button>
  </div>
</template>