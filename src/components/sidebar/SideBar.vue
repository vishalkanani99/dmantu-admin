<script setup>
  import { computed } from 'vue';
  import SideBarHeader from './SideBarHeader.vue';
  import SideBarFooter from './SideBarFooter.vue';
  import SideBarBody from './SideBarBody.vue';
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
    <slot name="headerBody">
      <SideBarHeader 
        v-if="$slots.header" 
        :isClosable="isClosable" 
        :btnColor="textStyle.type" 
        @close="close"
      >
        <slot name="header"></slot>
      </SideBarHeader>
    </slot>
    <slot name="body">
      <SideBarBody>
        <slot></slot>
      </SideBarBody>
    </slot>
    <slot name="footerBody">
      <SideBarFooter v-if="$slots.footer">
        <slot name="footer" :color="textStyle.type"></slot>
      </SideBarFooter>
    </slot>
  </div>
</template>