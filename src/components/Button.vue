<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import Icon from './Icon.vue';
import { getButtonColor } from '../color.js';

  const props = defineProps({
    label: String,
    color: String,
    iconPath: String,
    to: String,
    href: String,
    outline: Boolean,
    rounded: Boolean,
    isPlain: Boolean,
  })

  const type = computed(() => {
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
      props.label ? 'px-4 py-2' : 'p-2',
      props.rounded ? 'rounded-full' : 'rounded-md',
      getButtonColor(props.color, props.outline),
    ];
    
    return style;
  })
</script>
<template>
  <component
    :is="type"
    :to="to"
    :href="href"
    :class="defaultClass">
    <Icon v-if="iconPath" :path="iconPath" />
    <span v-if="label" :class="{'pl-1': iconPath}">{{ label }}</span>
  </component>
</template>