<script setup>
  import { mdiChevronDown } from '@mdi/js';
  import { computed } from 'vue';
  import Button from '../Button.vue';
  import { background, getDefaultTextStyle } from '../../color';
  import Icon from '../Icon.vue';

  const props = defineProps({
    type: String,
    iconPath: String,
    label: String,
    to: String,
    isCompact: Boolean,
    isOpen: Boolean,
    hasMenu: Boolean,
    color: {
      type: String,
      default: 'theme-light',
    },
    isActive: Boolean,
  });

  const rootEl = computed(() => {
    if( props.type ) {
      return props.type;
    }
    return Button;
  });

  const defaultStyle = computed(() => {
    const textStyle = getDefaultTextStyle(props.color);
    const backgroundStyle = [
      props.isActive
        ? [ background.active[props.color], textStyle.color, 'font-bold' ]
        : [ background[props.color], background.hover(props.color, true), textStyle.color ]
    ]; 
    
    const style = [
      {'relative' : props.hasMenu},
      'flex items-center px-3 py-2 select-none cursor-pointer rounded-md',
      ...backgroundStyle,
      {'justify-center' : props.isCompact},
      { 'w-full' : !props.to }
    ];
    return style;
  })

  const bindProps = computed(() => {
    const componentProps = {};
    if( !props.type ) {
      componentProps.to = props.to;
      componentProps.iconPath = props.iconPath;
      componentProps.label = props.label;
      componentProps.isPlain = true;
    }
    return componentProps;
  })
</script>
<template>
  <component
    :is="rootEl" 
    :class="defaultStyle" 
    v-bind="bindProps"
  >
    <slot>
      <Icon v-if="iconPath" :path="iconPath" />
      <span v-if="label" :class="{'px-2': iconPath, 'hidden': isCompact}">{{ label }}</span>
      <Icon 
        v-if="hasMenu" 
        :class="['absolute right-0 mr-2 rotate-0 transition-[transform]', {'!-rotate-180':isOpen}]" 
        :path="mdiChevronDown" 
      />
    </slot>
  </component>
</template>