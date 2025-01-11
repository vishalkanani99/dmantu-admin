<script setup>
  import { computed, watchEffect, reactive } from 'vue';
  import { mdiClose } from '@mdi/js';
  import Icon from './Icon.vue';

  const props = defineProps({
    label: String,
    color: String,
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

  const hasOnlyIcon = computed(() => props.iconPath && (!props.label && !props.closable));
  
  const sizeAttributes = reactive({
    textSize: 'text-xs',
    padding: hasOnlyIcon.value ? 'p-1' : 'px-2 py-1',
    iconSize: 12,
  });

  const defaultStyle = computed(() => {
    return [
      props.color,
      'inline-flex items-center gap-1 border border-[--color]',
      props.outline ? 'bg-transparent text-[--color]' : 'bg-[--color] text-[--color-inverse]',
      props.rounded ? 'rounded-full' : 'rounded-md',
      'leading-4 whitespace-nowrap',
      sizeAttributes.textSize,
      sizeAttributes.padding,
    ];
  });

  const closeIconStyle = computed(() => {
    return [
      'w-4 h-4 cursor-pointer rounded-full hover:p-[3px] -mr-1',
      props.outline ? 'hover:bg-[--color] hover:text-[--color-inverse]' : 'hover:bg-[--color-inverse] hover:text-[--color]',
    ];
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