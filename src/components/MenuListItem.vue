<script setup>
  import { mdiChevronDown } from '@mdi/js';
  import { computed } from 'vue';
  import Button from './Button.vue';
  import { background, getDefaultTextStyle } from '../color';
  import Icon from './Icon.vue';

  const props = defineProps({
    iconPath: String,
    actionIconPath: String,
    label: String,
    to: String,
    isActive: Boolean,
    isOpen: Boolean,
    hasMenu: Boolean,
    color: {
      type: String,
      default: 'theme-light',
    },
  });

  const defaultStyle = computed(() => {
    const textStyle = getDefaultTextStyle(props.color);
    const style = [
      {'relative' : props.hasMenu},
      'flex items-center px-4 py-2 select-none cursor-pointer',
      props.isActive 
        ? [background[props.color], textStyle.textColor] 
          : [background.hover(props.color), textStyle.textColorOnHover],
      {'justify-center' : !props.label},
    ];
    return style;
  })
</script>
<template>
  <Button 
    :class="defaultStyle" 
    :to="to"
    :iconPath="iconPath"
    :label="label"
    isPlain>
    <slot>
      <Icon v-if="iconPath" :path="iconPath" />
      <span v-if="label" :class="{'pl-4': iconPath}">{{ label }}</span>
      <Icon 
        v-if="hasMenu" 
        :class="['absolute right-0 mr-2 rotate-0 transition-[transform]', {'!-rotate-180':isOpen}]" 
        :path="mdiChevronDown" 
      />
    </slot>
  </Button>
</template>