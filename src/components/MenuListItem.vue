<script setup>
  import { mdiChevronDown } from '@mdi/js';
  import { computed } from 'vue';
  import { RouterLink, useLink } from 'vue-router'
  import Button from './Button.vue';
  import { background, getDefaultTextStyle } from '../color';
  import Icon from './Icon.vue';

  const props = defineProps({
    ...RouterLink.props.isExactActive,
    iconPath: String,
    actionIconPath: String,
    label: String,
    to: String,
    isCompact: Boolean,
    isOpen: Boolean,
    hasMenu: Boolean,
    color: {
      type: String,
      default: 'theme-light',
    },
  });

  const { isExactActive } = useLink(props)

  const defaultStyle = computed(() => {
    const textStyle = getDefaultTextStyle(props.color);
    const backgroundStyle = [
      isExactActive.value && props.to
        ? [ background.active[props.color], textStyle.color, 'font-bold' ]
        : [ background[props.color], background.hover(props.color, true), textStyle.color ]
    ]; 
    console.log(props.color, textStyle)
    const style = [
      {'relative' : props.hasMenu},
      'flex items-center px-4 py-2 select-none cursor-pointer',
      ...backgroundStyle,
      {'justify-center' : props.isCompact},
      { 'w-full' : !props.to }
    ];
    return style;
  })
</script>
<template>
  <Button 
    :class="defaultStyle" 
    :to="to"
    :type="!to ? 'button' : ''"
    :iconPath="iconPath"
    :label="label"
    isPlain>
    <slot>
      <Icon v-if="iconPath" :path="iconPath" />
      <span v-if="label" :class="{'pl-4': iconPath, 'hidden': isCompact}">{{ label }}</span>
      <Icon 
        v-if="hasMenu" 
        :class="['absolute right-0 mr-2 rotate-0 transition-[transform]', {'!-rotate-180':isOpen}]" 
        :path="mdiChevronDown" 
      />
    </slot>
  </Button>
</template>