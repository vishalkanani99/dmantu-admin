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

const containerRef = ref();

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
    'min-w-max',
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
  <Transition name="fade" mode="out-in">
    <div
      v-if="showList"
      ref="containerRef"
      :class="dropdownContainerStyle">
      <slot></slot>
    </div>
  </Transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>