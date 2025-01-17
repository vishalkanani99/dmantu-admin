<script setup>
  import { mdiChevronDown } from '@mdi/js';
  import { computed } from 'vue';
  import { theme } from '../../color';
  import Button from '../Button.vue';
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
    color: String,
    size: {
      type: String,
      default: 'medium',
      validator(value, props) {
        // The value must match one of these strings
        return ['large', 'medium', 'small'].includes(value)
      },
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
    const backgroundStyle = [
      props.color,
      props.isActive
        ? 'font-bold bg-[--color-ml]'
        : 'bg-[--color] hover:bg-[--color-m]',
      'text-[--color-inverse]',
    ]; 
    
    let fontSize = 'text-base';
    let padding = props.iconPath && !props.label ? 'p-2' : 'px-3 py-2';

    if(props.size === 'small'){
      fontSize = 'text-sm';
      padding = props.iconPath && !props.label ? 'p-1' : 'px-2 py-1';
    }

    if(props.size === 'large'){
      fontSize = 'text-lg';
      padding = props.iconPath && !props.label ? 'p-3' : 'px-4 py-3';
    }

    const style = [
      {'relative' : props.badgeLabel || props.hasMenu},
      'flex items-center select-none cursor-pointer rounded-md gap-2',
      ...backgroundStyle,
      {'justify-center' : props.isCompact},
      { 'w-full' : !props.to },
      fontSize,
      padding,
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

  const iconSize = computed(() => {
    let size = 18;
    if( props.size === 'small' ) {
      size = 14;
    }
    if( props.size === 'large' ) {
      size = 22;
    }
    return size;
  })
</script>
<template>
  <component
    :is="rootEl" 
    :class="defaultStyle" 
    v-bind="bindProps"
  >
    <slot>
      <Icon v-if="iconPath" :path="iconPath" :size="iconSize" />
      <span v-if="label" :class="[{'hidden': isCompact}, 'text-inherit text-[length:inherit]']">{{ label }}</span>
      <div 
        v-if="$slots.badge || badgeLabel || hasMenu" 
        class="absolute right-0 mr-2 inline-flex justify-center items-center gap-1"
      >
        <slot name="badge">
          <Chip
            v-if="badgeLabel"
            :color="badgeColor ?? theme.getInverse(color)"
            :size="size"
            :label="badgeLabel"
            rounded
          />
        </slot>
        <Icon 
          v-if="hasMenu" 
          :class="['rotate-0 transition-[transform]', {'!-rotate-180':isOpen}]" 
          :path="mdiChevronDown"
          :size="iconSize" 
        />
      </div>
    </slot>
  </component>
</template>