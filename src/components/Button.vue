<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import Icon from './Icon.vue';
import { getButtonStyle, background, text as textColor, getDefaultTextStyle } from '../color.js';

  const props = defineProps({
    label: String,
    type: {
      type: String,
      default: 'button',
    },
    color: String,
    iconPath: String,
    to: String,
    href: String,
    outline: Boolean,
    rounded: Boolean,
    isPlain: Boolean,
    disabled: Boolean,
    hasBadge: Boolean,
    badgeColor: String,
    badgeLabel: String,
    size: {
      type: String,
      default: 'medium',
      validator(value, props) {
        // The value must match one of these strings
        return ['large', 'medium', 'small'].includes(value)
      },
    },
  })

  const textStyle = computed(() => getDefaultTextStyle(props.badgeColor ?? props.color))

  const typeOfComponent = computed(() => {
    if( props.to ) {
      return RouterLink;
    }

    if( props.href || props.type === 'link' ) {
      return 'a';
    }

    return 'button';
  });

  const defaultClass = computed(() => {
    
    if(props.isPlain) {
      return;
    }

    let style = [
      {'relative': props.hasBadge},
      'flex justify-center items-center text-center leading-normal',
      'focus:outline-none',
      'select-none',
      props.rounded ? 'rounded-full' : 'rounded-md',
      getButtonStyle(props.color, props.outline),
      { 'focus:ring-0 opacity-30 cursor-not-allowed' : props.disabled },
    ];
    
    let text = 'text-base';
    let padding = props.iconPath && !props.label ? 'p-1.5' : 'px-3 py-1.5';

    if(props.size === 'small'){
      text = 'text-sm';
      padding = props.iconPath && !props.label ? 'p-1' : 'px-2 py-1';
    }

    if(props.size === 'large'){
      text = 'text-lg';
      padding = props.iconPath && !props.label ? 'p-2' : 'px-4 py-2';
    }

    return [
      ...style,
      text,
      padding,
    ];
  })

const bindProps = computed(() => {
  const componentProps = {};
  if( props.to ) {
    componentProps.to = props.to;
  }
  if( props.href ) {
    componentProps.href = props.href;
  }
  if( typeOfComponent.value === 'button' ) {
    componentProps.type = props.type;
  }
  return componentProps;
})

const iconSize = computed(() => {
  let size = 18;
  if( props.size === 'small' ) {
    size = 16;
  }
  if( props.size === 'large' ) {
    size = 20;
  }
  return size;
})
</script>
<template>
  <component
    v-bind="bindProps"
    :is="typeOfComponent"
    :class="defaultClass"
    :disabled="disabled"
  >
    <slot>
      <Icon v-if="iconPath" :path="iconPath" :size="iconSize" />
      <span v-if="label" :class="{ 'ml-1': iconPath }">{{ label }}</span>
      <span
        v-if="hasBadge" 
        :class="[
          'flex items-center absolute top-0 right-0',
          badgeLabel ? 'h-6 w-6 -mt-3 -mr-3' : 'h-3 w-3 -mt-1 -mr-1',
        ]"
      >
        <span 
          :class="[
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            background[badgeColor ?? textStyle.type],
            badgeColor ? textStyle.color : textColor[color],
          ]"
        >
        </span>
        <span 
          :class="[
            'relative inline-flex rounded-full justify-center items-center text-[10px] overflow-hidden',
            badgeLabel ? 'p-1 h-6 w-6' : 'h-3 w-3',
            background[badgeColor ?? textStyle.type],
            badgeColor ? textStyle.color : textColor[color],
          ]"
        >
          {{ badgeLabel }}
        </span>
      </span>
    </slot>
  </component>
</template>