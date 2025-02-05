<script setup>
import { computed } from "vue";
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
  color: String,
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
    props.color,
    'relative grow basis-4 mt-0',
    'before:[&:not(:first-child)]:absolute before:[&:not(:first-child)]:content-[""] before:[&:not(:first-child)]:block',
    'before:[&:not(:first-child)]:bottom-0',
    props.isActive || props.isCompleted ? 'before:bg-[--color]' : 'before:bg-gray-200',
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
  let style = [
    'flex justify-center items-center w-10 h-10 rounded-full overflow-hidden',
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  ];

  if( props.isActive || props.disabled ) {
    style = [
      ...style,
      props.disabled ? 'border' : 'border-2 font-bold',
      props.disabled ? 'bg-gray-200' : 'bg-white',
      props.isActive ? 'border-[--color]' : 'border-gray-400',
      props.isActive ? 'text-[--color]' : 'text-gray-400',
    ];
    return style;
  }

  if( props.isCompleted ) {
    style = [
      ...style,
      'bg-[--color] text-[--color-inverse]',
    ];
    return style;
  }

  return style;

});

</script>

<template>
  <div :class="defaultStyle">
    <div class="flex items-center justify-center flex-col">
      <div class="z-10 rounded-full">
        <div :class="stepStyle">
          <Icon v-if="iconPath" :path="iconPath" />
          <span v-else>{{ number }}</span>
        </div>
      </div>
      <span 
        v-if="label"
        class="z-10 p-2"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>