<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import Icon from './Icon.vue';
import Chip from './Chip.vue';
import { useTheme } from '../composables/useTheme.js';

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
    hasAnimatedBadge: Boolean,
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

  const { getColorInverse } = useTheme();
  
  const typeOfComponent = computed(() => {
    if( props.to ) {
      return RouterLink;
    }

    if( props.href || props.type === 'link' ) {
      return 'a';
    }

    return 'button';
  });

  const hasBadge = computed(() => props.hasAnimatedBadge || props.badgeLabel);
  const defaultClass = computed(() => {
    
    if(props.isPlain) {
      return;
    }

    let style = [
      {'relative': hasBadge.value},
      props.color,
      'flex justify-center items-center text-center leading-normal focus:outline-none select-none',
      'border focus:ring border-[--color] focus:ring-[--color-l]',
      props.outline 
        ? 'bg-transparent hover:bg-[--color] text-[--color] hover:text-[--color-inverse]' 
        : 'bg-[--color] hover:bg-[--color-m] text-[--color-inverse]',
      props.rounded ? 'rounded-full' : 'rounded-md',
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
      <Chip
        v-if="hasBadge"
        :class="[
          'absolute top-0 right-0 !p-0.5',
          badgeLabel ? 'h-6 w-6 -mt-3 -mr-3' : 'h-3 w-3 -mt-1 -mr-1',
        ]"
        :color="badgeColor ?? getColorInverse(color)"
        size="small"
        rounded
      >
        <span
          v-if="hasAnimatedBadge" 
          class="animate-ping absolute top-0 right-0 inline-flex h-full w-full rounded-full opacity-75 bg-inherit"
        >
        </span>
        <span 
          :class="[
            'relative inline-flex rounded-full justify-center items-center overflow-hidden',
            'bg-inherit text-inherit text-[length:inherit]',
            badgeLabel ? 'h-6 w-6' : 'h-3 w-3',
          ]"
        >
          {{ badgeLabel }}
        </span>
      </Chip>
    </slot>
  </component>
</template>