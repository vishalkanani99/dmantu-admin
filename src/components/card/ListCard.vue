<script setup>
import { computed } from 'vue';
import { background, getDefaultTextStyle, border, text } from '../../color';
import Avatar from '../Avatar.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'theme',
  },
  imgSrc: String,
  imgAlt: String,
  title: String,
  subTitle: String,
  outline: Boolean,
  hoverShadow: Boolean,
})

const emit = defineEmits(['menuClick']);
const textStyle = getDefaultTextStyle(props.color);

const defaultStyle = computed(() => {
  let style = [
    'border p-4 w-full rounded-md',
    border[props.color],
    !props.outline ? background[props.color] : '',
    props.outline ? text[props.color] : textStyle.color,
    { 'hover:shadow-lg transition-shadow duration-500' : props.hoverShadow }
  ];
  return style;
});

</script>
<template>
  <div :class="defaultStyle">
    <div class="md:flex block justify-between items-center">
      
      <div class="flex justify-center items-center mb-6 md:mb-0">
        <div class="flex flex-col md:flex-row items-center"> 
          <slot name="leftSection">
            <slot name="avatar">
              <Avatar class="flex items-center w-16 h-16" :avatar="imgSrc" :username="imgAlt" />
            </slot>
            <div class="text-center md:text-left mt-4 md:mt-0 md:ml-4">
              <slot name="title">
                <h4>{{ title }}</h4>
                <span>{{ subTitle }}</span>
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <div
        v-if="$slots.rightSection" 
        class="flex items-center justify-center"
      >
        <div class="flex flex-col md:flex-row justify-end items-center gap-1">
          <slot name="rightSection"></slot>
        </div>
      </div>

    </div>
  </div>
</template>