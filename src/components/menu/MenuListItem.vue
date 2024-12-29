<script setup>
  import { mdiChevronDown } from '@mdi/js';
  import { computed } from 'vue';
  import Button from '../Button.vue';
  import { background, getDefaultTextStyle } from '../../color';
  import Icon from '../Icon.vue';
  import Chip from '../Chip.vue';

  const props = defineProps({
    type: String,
    iconPath: String,
    label: String,
    to: String,
    isCompact: Boolean,
    isOpen: Boolean,
    hasMenu: Boolean,
    badgeColor: String,
    badgeLabel: String,
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

  const textStyle = computed(() => getDefaultTextStyle(props.color));

  const defaultStyle = computed(() => {
    const backgroundStyle = [
      props.isActive
        ? [ background.active[props.color], textStyle.value.color, 'font-bold' ]
        : [ background[props.color], background.hover(props.color, true), textStyle.value.color ]
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
      <div 
        v-if="badgeLabel || hasMenu" 
        class="absolute right-0 mr-2 inline-flex justify-center items-center gap-1"
      >
        <Chip
          v-if="badgeLabel"
          :color="badgeColor ?? textStyle.type"
          :label="badgeLabel"
          rounded
        />
        <Icon 
          v-if="hasMenu" 
          :class="['rotate-0 transition-[transform]', {'!-rotate-180':isOpen}]" 
          :path="mdiChevronDown" 
        />
      </div>
    </slot>
  </component>
</template>