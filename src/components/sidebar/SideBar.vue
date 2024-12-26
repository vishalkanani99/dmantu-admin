<script setup>
  import { computed } from 'vue';
  import { mdiClose, } from '@mdi/js';
  import Button from '../Button.vue';
  import { background, border, getDefaultTextStyle } from '../../color';

  const props = defineProps({
    modelValue: Boolean,
    isClosable: Boolean,
    color: {
      type: String,
      default: 'theme',
    },
    position: {
      type: String,
      default: 'left',
      validator(value, props) {
        // The value must match one of these strings
        return ['left', 'right'].includes(value)
      },
    },
  });

  const emit = defineEmits(['update:modelValue', 'close']);

  const textStyle = computed(() => getDefaultTextStyle(props.color));

  const showSideBar = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });

  const defaultStyle = computed(() => {
    let transitionTranslate = {
      left: ['translate-x-0', '-translate-x-full', 'left-0'],
      right: ['translate-x-0', 'translate-x-full', 'right-0'],
    };
    const style = [
      'fixed flex flex-col items-center inset-y-0 min-h-dvh overflow-hidden',
      'w-dvw xs:w-64',
      background[props.color],
      textStyle.value.color,
      border[textStyle.value.type],
      transitionTranslate[props.position][2],
      showSideBar.value ? transitionTranslate[props.position][0] : transitionTranslate[props.position][1],
      'transition-transform transition-[width]',
    ];
    return style;
  });

  function close() {
    showSideBar.value = false;
    emit('close', false);
  }

</script>
<template>
  <div :class="defaultStyle">
    <div 
      class="relative top-0 flex items-center w-full border-b border-inherit px-6 py-4">
      <slot name="header"></slot>
      <Button 
        v-if="isClosable" 
        class="absolute right-0 mr-2" 
        :color="textStyle.type" 
        :iconPath="mdiClose"
        size="small"
        rounded 
        @click="close" 
      />
    </div>
    <div class="flex-1 w-full h-full overflow-y-auto">
      <slot></slot>
    </div>
    <div 
      v-if="$slots.footer" 
      class="bottom-0 flex justify-center items-center w-full border-t border-inherit px-6 py-4">
      <slot name="footer" :color="textStyle.type"></slot>
    </div>
  </div>
</template>