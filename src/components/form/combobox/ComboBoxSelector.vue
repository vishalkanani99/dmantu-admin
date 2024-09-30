<script setup>
import { ref, shallowRef, computed } from 'vue';
import { background, text, getDefaultTextStyle, border } from '../../../color';
import Chip from '../../Chip.vue'; 
import Button from '../../Button.vue';
import { mdiClose } from '@mdi/js';
import Icon from '../../Icon.vue';

const props = defineProps({
  modelValue: [String, Object, Array],
  selectedValue: Array,
  color: {
    type: String,
    default: 'theme-light',
  },
  outline: Boolean,
})

const emit = defineEmits(['update:modelValue', 'focus', 'input', 'clear', 'remove']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const textStyle = computed(() => getDefaultTextStyle(props.color));
const defaultStyle = computed(() => {

  let style = [
    'relative flex items-center justify-start gap-1 border rounded-md',
    'pl-3 pr-2 py-2',
  ];

  if( props.outline ) {
    style = [
      ...style,
      'bg-transparent',
      border[props.color],
      text[props.color],
    ];
    return style;
  }

  style = [
    ...style,
    border[textStyle.value.type],
    background[props.color],
    textStyle.value.color,
  ];

  return style;
});
</script>
<template>
  <div :class="defaultStyle">
    <div class="flex-1 flex flex-wrap items-center justify-start w-full gap-1">
      <Chip 
        v-for=" (value, key) in selectedValue" 
        :key="key" 
        :color="textStyle.type" 
        :label="value"
        @close="$emit('remove', key)" 
        closable 
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
      :color="textStyle.type"
      rounded 
      @click="$emit('clear')"
    >
      <Icon class="w-4 h-4" :path="mdiClose" />
    </Button>
  </div>
</template>