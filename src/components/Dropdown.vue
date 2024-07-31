<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { mdiMenuDown, mdiMenuUp, mdiTriangle } from '@mdi/js';
import { throttle } from 'lodash';
import Icon from './Icon.vue';
import Menu from './Menu.vue';
import Button from './Button.vue';
import { background, getDefaultTextStyle, text } from '../color';

const props = defineProps({
  label: String,
  items: {
    type: Array,
    default: () => [],
  },
  btnColor: {
    type: String,
    default: 'theme-light',
  },
  bgColor: {
    type: String,
    default: 'theme-light',
  },
  ItemColor: {
    type: String,
    default: 'theme-light',
  },
});


const dropdownRef = ref(null);
const selectorRef = ref(null);
const showList = shallowRef(false);

const toggle = throttle(() => {
  showList.value = !showList.value;
})

const trackClickEvent = (el) => {
  const isSelectorRefAsTargetEl = selectorRef.value && selectorRef.value.contains(el.target);
  const isDropdownRefContainTargetEl = dropdownRef.value && dropdownRef.value.contains(el.target);
  if(isSelectorRefAsTargetEl || isDropdownRefContainTargetEl) {
    return;
  }
  showList.value = false;
}

const btnIcon = computed(() => showList.value ? mdiMenuUp : mdiMenuDown );

const dropdownContainerStyle = computed(() => {
  let textStyle = getDefaultTextStyle(props.bgColor);
  let style = [
    'absolute',
    'right-0',
    'min-w-max',
    'z-10',
    'shadow-md',
    'rounded-md',
    'mt-4',
    background[props.bgColor],
    textStyle.color,
  ];
  return style;
});

onMounted(() => {
  document.addEventListener('click', trackClickEvent);
})
</script>
<template>
  <div class="relative select-none">
    <div ref="selectorRef" @click="toggle()">
      <slot name="selector" :btnIcon="btnIcon">
        <Button :color="btnColor">
          <span v-if="label" class="pl-1">{{ label }}</span>
          <Icon :path="btnIcon" class="pl-3" />
        </Button>
      </slot>
    </div>
    <Transition name="fade" mode="out-in">
      <div
        v-if="showList"
        ref="dropdownRef"
        :class="dropdownContainerStyle">
        <Icon
          :class="[
            'absolute right-0 top-[-18px] mr-2', 
            text[bgColor],
          ]" 
          :path="mdiTriangle" />
        <slot>
          <Menu :items="items" :color="ItemColor" />
        </slot>
      </div>
    </Transition>
  </div>
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