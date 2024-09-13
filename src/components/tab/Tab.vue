<script setup>
import { ref, computed, useSlots, onMounted, watch } from "vue";
import { background, text, border, getDefaultTextStyle } from '../../color';
import Button from "../Button.vue";

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'theme',
  },
  vertical: Boolean,
  isActive: Boolean,
  outline: Boolean,
  disabled: Boolean,
});

const tabStyle= computed(() => {
    const textStyle = getDefaultTextStyle(props.color);

    let bgStyle = [
      props.outline ? 'bg-transparent' : '',
      props.outline ? text[props.color] : textStyle.color,
      props.outline ? 'hover:font-bold hover:border-b-2 border-b' : background.hover(props.color, true),
      props.outline ? border[props.color] : '',
      props.isActive && props.outline ? 'font-bold border-b-4' : '',
      props.isActive && !props.outline ? background.active[props.color] : background[props.color],
    ];
    
    const style = [
      'flex items-center px-3 py-2 select-none w-full transition-all delay-0',
      ...bgStyle,
      {'md:w-auto': !props.vertical},
      props.disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'
    ];

    return style;
  })
</script>

<template>
  <Button
    :class="tabStyle"
    :label="label" 
    :iconPath="icon" 
    :disabled="disabled"
    isPlain 
  />
</template>