<script setup>
import { ref, computed, useSlots, onMounted, watch } from "vue";
import { background, text, border, getDefaultTextStyle } from '../../color';
import Button from "../Button.vue";
import Icon from "../Icon.vue";

const props = defineProps({
  number: Number,
  label: {
    type: String,
    default: ''
  },
  iconPath: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'theme',
  },
  vertical: Boolean,
  isActive: Boolean,
  isCompleted: Boolean,
  disabled: Boolean,
});

const defaultStyle = computed(() => {
  let verticalStepSize = [
    'before:[&:not(:first-child)]:h-full before:[&:not(:first-child)]:w-1'
  ];

  let size = [
    'before:[&:not(:first-child)]:h-1 before:[&:not(:first-child)]:w-full'
  ];

  let verticalStepPosition = [
    'before:[&:not(:first-child)]:-top-[50%] before:[&:not(:first-child)]:left-[calc(50%-0.1rem)]',
  ];

  let position = [
    'before:[&:not(:first-child)]:top-5 before:[&:not(:first-child)]:-left-[50%]'
  ];

  let style = [
    'relative grow basis-4 mt-0',
    'before:[&:not(:first-child)]:absolute before:[&:not(:first-child)]:content-[""] before:[&:not(:first-child)]:block',
    'before:[&:not(:first-child)]:bottom-0 before:z-10',
    props.isActive || props.isCompleted ? background.before[props.color] : 'before:bg-gray-200',
    'before:transition-[background] before:duration-300 before:delay-0',
  ];

  if( props.vertical ) {
    return [
      'py-6',
      ...style,
      ...verticalStepPosition,
      ...verticalStepSize,
    ];
  }

  return [
    ...style,
    ...size,
    ...position,
  ];
})
const stepStyle = computed(() => {
  const textStyle = getDefaultTextStyle(props.color);

  let style = [
    'flex justify-center items-center w-10 h-10 rounded-full z-20 overflow-hidden',
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  ];

  if( props.isActive || props.disabled ) {
    style = [
      ...style,
      props.disabled ? 'border' : 'border-2 font-bold',
      props.disabled ? 'bg-gray-200' : background['white'],
      props.isActive ? border[props.color] : 'border-gray-400',
      props.isActive ? text[props.color] : text['gray'],
    ];
    return style;
  }

  if( props.isCompleted ) {
    style = [
      ...style,
      background[props.color],
      textStyle.color,
    ];
    return style;
  }

  return style;

});

</script>

<template>
  <div :class="defaultStyle">
    <div class="flex items-center justify-center flex-col">
      <div class="border-4 border-white z-20 rounded-full">
        <div :class="stepStyle">
          <Icon v-if="iconPath" :path="iconPath" />
          <span v-else>{{ number }}</span>
        </div>
      </div>
      <span 
        v-if="label"
        class="bg-white z-20 p-2"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>