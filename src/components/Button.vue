<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import Icon from './Icon.vue';
import { getButtonStyle } from '../color.js';

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
  })

  const typeOfComponent = computed(() => {
    if( props.to ) {
      return RouterLink;
    }

    if( props.href ) {
      return 'a';
    }

    return 'button';
  });

  const defaultClass = computed(() => {
    
    if(props.isPlain) {
      return;
    }

    let style = [
      'flex items-center',
      'focus:outline-none',
      'select-none',
      'p-2',
      props.rounded ? 'rounded-full' : 'rounded-md',
      getButtonStyle(props.color, props.outline),
    ];
    
    return style;
  })

const bindProps = computed(() => {
  const componentProps = {};
  if( props.to ) {
    componentProps.to = props.to;
  }
  if( props.href ) {
    componentProps.href = props.href;
  }
  if( props.type ) {
    componentProps.type = props.type;
  }
  return componentProps;
}) 
</script>
<template>
  <component
    :is="typeOfComponent"
    :class="defaultClass"
    v-bind="bindProps"
  >
    <slot>
      <Icon v-if="iconPath" :path="iconPath" />
      <span v-if="label" class="px-2">{{ label }}</span>
    </slot>
  </component>
</template>