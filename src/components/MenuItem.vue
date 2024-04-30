<script setup>
  import { computed } from 'vue';
  import Button from './Button.vue';
  import { background, getDefaultTextStyle } from '../color';

  const props = defineProps({
    iconPath: String,
    label: String,
    to: String,
    isActive: Boolean,
    color: {
      type: String,
      default: 'theme-light',
    },
  });

  const defaultStyle = computed(() => {
    const textStyle = getDefaultTextStyle(props.color);
    const style = [
      'flex items-center px-4 py-2 select-none cursor-pointer',
      props.isActive 
        ? [background[props.color], textStyle.textColor] 
          : [ background.hover(props.color), textStyle.textColorOnHover],
      { 'justify-center' : !props.label }
    ];
    return style;
  })
</script>
<template>
  <li class="m-2">
    <Button 
      :class="defaultStyle" 
      :to="to"
      :iconPath="iconPath"
      :label="label"
      isPlain>
    </Button>
  </li>
</template>