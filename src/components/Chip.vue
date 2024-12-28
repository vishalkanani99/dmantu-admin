<script setup>
  import { computed, watchEffect, reactive } from 'vue';
  import { mdiClose } from '@mdi/js';
  import { background, text as textColor, getDefaultTextStyle, border } from '../color';
  import Icon from './Icon.vue';

  const props = defineProps({
    label: String,
    color: {
      type: String,
      default: 'theme',
    },
    size: {
      type: String,
      default: 'medium',
      validator(value, props) {
        // The value must match one of these strings
        return ['large', 'medium', 'small'].includes(value)
      },
    },
    iconPath: String,
    rounded: Boolean,
    outline: Boolean,
    closable: Boolean,
  });

  const emit = defineEmits(['close']);

  const textStyle = computed(() => getDefaultTextStyle(props.color));
  const hasOnlyIcon = computed(() => props.iconPath && (!props.label && !props.closable));
  
  const sizeAttributes = reactive({
    textSize: 'text-xs',
    padding: hasOnlyIcon.value ? 'p-1' : 'px-2 py-1',
    iconSize: 12,
  });

  const defaultStyle = computed(() => {
    let style = [
      'inline-flex items-center gap-1',
      props.rounded ? 'rounded-full' : 'rounded-md',
      'leading-4 whitespace-nowrap',
      sizeAttributes.textSize,
      sizeAttributes.padding,
    ];

    if( props.outline ) {
      style = [
        ...style,
        'border bg-transparent',
        border[props.color],
        textColor[props.color],
      ];
      return style;
    }

    style = [
      ...style,
      background[props.color],
      textStyle.value.color,
    ];

    return style;
  });

  const closeIconStyle = computed(() => {
    let style = [
      'w-4 h-4 cursor-pointer rounded-full hover:p-[3px] -mr-1',
      background.hover(props.color, true),
    ];

    if( props.outline ) {
      style.push(textStyle.value.colorOnHover);
    }

    return style;
  });

  watchEffect(() => {
    if( props.size === 'small' ) {
      sizeAttributes.textSize = 'text-[10px]';
      sizeAttributes.padding = hasOnlyIcon.value ? 'p-0.5' : 'px-1.5 py-0.5';
      sizeAttributes.iconSize = 10;
    }
    if( props.size === 'large' ) {
      sizeAttributes.textSize = 'text-sm';
      sizeAttributes.padding = hasOnlyIcon.value ? 'p-1.5' : 'px-2 py-1.5';
      sizeAttributes.iconSize = 14;
    }
  })
</script>
<template>
  <div
    :class="defaultStyle">
    <slot>
      <Icon v-if="iconPath" :path="iconPath" :size="sizeAttributes.iconSize" />
      <span v-if="label" class="text-[length:inherit] leading-[inherit]">{{ label }}</span>
      <Icon 
        v-if="closable"
        :class="closeIconStyle"
        :path="mdiClose" 
        :size="sizeAttributes.iconSize"
        @click="$emit('close')" 
      />
    </slot>
  </div>
</template>