<script setup>
import { computed } from 'vue';
import { border as borderColor, ring as ringColor, text as textColor, getButtonStyle } from '../color';
import Button from './Button.vue';
import Icon from './Icon.vue';

  const props = defineProps({
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Array],
      required: true,
    },
    middle: Boolean,
    right: Boolean,
    left: Boolean,
    rounded: Boolean,
    color: String,
    label: String,
    iconPath: String,
    outline: Boolean,
  });

  const emit = defineEmits(['update:modelValue']);

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  })
  
  const defaultStyle = computed(() => {
    let color = props.color ?? 'theme';

    let style = [
      { 'flex justify-center items-center' : props.type === 'static' },
      'px-3 py-2 text-xs focus:outline-none focus:ring-1',
      props.type === 'textarea' ? 'h-24' : 'h-10',
      props.middle ? 'border-t border-b rounded-r-none rounded-l-none' : 'border',
      { 'rounded-r-none' : props.left },
      { 'rounded-l-none' : props.right },
      props.rounded ? 'rounded-full' : 'rounded-md',
    ];

    if(props.type === 'button') {
      const btnStyle = getButtonStyle(props.color, props.outline);
      style = [style, ...btnStyle];
      return style;
    }

    style = [style, ...[borderColor[color], ringColor.focus[color], textColor[color]]];
    return style;
  })
</script>
<template>
  <textarea 
    v-if="type === 'textarea'"
    v-model="modelValue"
    :class="defaultStyle">
  </textarea>
  <select 
    v-else-if="type === 'select'" 
    v-model="modelValue"
    :class="defaultStyle">
    <slot></slot>
  </select>
  <div 
    v-else-if="type === 'static'"
    :class="defaultStyle">
    <slot>
      <Icon v-if="iconPath" :path="iconPath" />
    </slot>
  </div>
  <Button 
    v-else-if="type === 'button'"
    :label="label"
    :class="defaultStyle"
    :iconPath="iconPath"
    :color="color"
    isPlain>
    <slot></slot>
  </Button>
  <input 
    v-else 
    :type="type" 
    v-model="modelValue" 
    :class="defaultStyle" />
</template>