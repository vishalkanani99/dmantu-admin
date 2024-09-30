<script setup>
  import { computed } from 'vue';
  import { mdiClose } from '@mdi/js';
  import { background, text, getDefaultTextStyle, border } from '../color';
  import Icon from './Icon.vue';

  const props = defineProps({
    label: String,
    color: {
      type: String,
      default: 'theme',
    },
    iconPath: String,
    rounded: Boolean,
    outline: Boolean,
    closable: Boolean,
  });

  const emit = defineEmits(['close']);

  const textStyle = getDefaultTextStyle(props.color);

  const defaultStyle = computed(() => {
    let style = [
      'relative inline-flex items-center',
      'px-3',
      props.closable ? 'py-1' : 'py-1.5',
      props.rounded ? 'rounded-full' : 'rounded-md',
      'leading-none whitespace-nowrap',
      'text-xs',
    ];

    if( props.outline ) {
      style = [
        ...style,
        'border bg-transparent',
        border[props.color],
        text[props.color],
      ];
      return style;
    }

    style = [
      ...style,
      background[props.color],
      textStyle.color,
    ];

    return style;
  });

  const closeIconStyle = computed(() => {
    let style = [
      'w-5 h-5 cursor-pointer rounded-full',
      props.rounded ? '-mr-1' : '-mr-2',
      background.hover(props.color, true),
    ];

    if( props.outline ) {
      style.push(textStyle.colorOnHover);
    }

    return style;
  });
</script>
<template>
  <div
    :class="defaultStyle">
    <slot>
      <Icon v-if="iconPath" class="w-4 h-4 mr-1" :path="iconPath" size="14" />
      <span v-if="label" :class="{ 'pr-2': closable }">{{ label }}</span>
      <Icon 
        v-if="closable"
        :class="closeIconStyle"
        :path="mdiClose" 
        size="14"
        @click="$emit('close')" 
      />
    </slot>
  </div>
</template>