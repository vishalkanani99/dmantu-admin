<script setup>
import { computed, ref } from 'vue';
import { 
  border, 
  ring, 
  text, 
  background as backgroundColor,
  getDefaultTextStyle,
  getButtonStyle, 
} from '../color';
import Button from './Button.vue';
import Icon from './Icon.vue';

  const props = defineProps({
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Number, Array, null],
      required: true,
    },
    middle: Boolean,
    right: Boolean,
    left: Boolean,
    rounded: Boolean,
    color: String,
    ringColor: String,
    borderColor: String,
    textColor: String,
    label: String,
    buttonIcon: String,
    inputLeftIcon: String,
    inputRightIcon: String,
    outline: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'buttonClick', 'leftIconClick', 'rightIconClick']);

  const color = ref(props.color ?? 'theme');

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  })
  
  const borderRadius = computed(() => {
    return [
      { 'rounded-r-none rounded-l-none' : props.middle },
      { 'rounded-r-none' : props.left },
      { 'rounded-l-none' : props.right },
      props.rounded ? 'rounded-full' : 'rounded-md',
    ];
  })

  const borderPosition = computed(() => {
    return [
      { 'border-t border-b' : props.middle },
      { 'border-t border-b border-l' : props.left },
      { 'border-t border-b border-r' : props.right },
    ];
  })

  const outerStyle = computed(() => {
    const borderColor = props.borderColor ?? 'theme';
    return [
      { 'relative' : props.inputLeftIcon || props.inputRightIcon },
      'flex items-center',
      borderPosition.value,
      border[borderColor],
      borderRadius.value,
    ];
  })

  const textStyle = computed(() => {
    const defaultTextStyle = getDefaultTextStyle(color.value);
    return text[props.textColor] ?? defaultTextStyle.textColor;
  })

  const defaultStyle = computed(() => {
    const ringcolor = props.ringColor ?? 'info';
    const btnStyle = getButtonStyle(color.value, props.outline);

    let padding = ['pl-3 pr-3 py-2'];

    let style = [
      'flex items-center text-xs focus:outline-none',
      props.type === 'textarea' ? 'h-24' : 'h-10',
      borderRadius.value,
    ];

    if(props.type === 'button') {
      return [style, padding, ...btnStyle];
    }

    if(props.inputLeftIcon) {
      padding.push('!pl-10');
    }
    if(props.inputRightIcon) {
      padding.push('!pr-10');
    }

    let colors = [ 
      ring.focus[ringcolor], 
      backgroundColor[color.value],
      textStyle.value,
    ];
    
    return [
      'border-0 focus:ring-2',
      style,
      padding, 
      ...colors,
    ];
  })

  const getInputIconStyle = (position) => {
    return ['absolute inline-flex justify-center items-center w-10 h-10', position, textStyle.value];
  }
</script>
<template>
  <div :class="outerStyle">
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
      <slot></slot>
    </div>
    <Button 
      v-else-if="type === 'button'"
      :label="label"
      :class="defaultStyle"
      :iconPath="buttonIcon"
      :color="color"
      isPlain
      @click="$emit('buttonClick')" >
      <slot></slot>
    </Button>
    <template v-else>
      <Icon 
        v-if="inputLeftIcon"
        :class="getInputIconStyle('left-0')"
        :path="inputLeftIcon"
        @click="$emit('leftIconClick')" />
      <input 
        :type="type" 
        v-model="modelValue" 
        :class="defaultStyle" />
      <Icon  
        v-if="inputRightIcon"
        :class="getInputIconStyle('right-0')"
        :path="inputRightIcon"
        @click="$emit('rightIconClick')" />
    </template>
  </div>
</template>