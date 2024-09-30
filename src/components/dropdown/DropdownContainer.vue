<script setup>
import { ref, computed } from 'vue';
import { background, getDefaultTextStyle } from '../../color';

const props = defineProps({
  modelValue: Boolean,
  bgColor: {
    type: String,
    default: 'theme-light',
  },
  position: {
    type: String,
    default: 'bottom',
    validator(value, props) {
      // The value must match one of these strings
      return ['top', 'bottom'].includes(value)
    },
  },
});

const emit = defineEmits(['update:modelValue']);

const showList = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
})

const dropdownContainerStyle = computed(() => {
  let textStyle = getDefaultTextStyle(props.bgColor);
  let style = [
    'absolute', 
    'right-0',
    'w-full min-w-max',
    'z-10',
    'shadow-md',
    'rounded-md',
    'max-h-64',
    'overflow-y-auto',
    props.position === 'bottom' ? 'mt-2 top-[100%]' :  'mb-2 bottom-[100%]',
    background[props.bgColor],
    textStyle.color,
  ];
  return style;
});

</script>
<template>
  <Transition name="dropdown">
    <div
      v-if="showList"
      :class="dropdownContainerStyle">
      <slot></slot>
    </div>
  </Transition>
</template>
<style>
.dropdown-enter-active,
.dropdown-leave-active {
  @apply transition-[max-height] !overflow-hidden;
}
.dropdown-enter-from,
.dropdown-leave-to {
  @apply !max-h-0 !overflow-hidden;
}
</style>