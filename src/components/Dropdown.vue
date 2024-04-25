<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import { throttle } from 'lodash';
import Icon from './Icon.vue';
import Menu from './Menu.vue';
import Button from './Button.vue';

const props = defineProps({
  label: String,
  items: {
    type: Array,
    default: () => [],
  },
  color: String,
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

const beforeDropdownStyle = computed(() => {
  let style = [
    'before:content["*"]',
    'before:absolute',
    'before:mr-2',
    'before:right-0',
    'before:top-[-16px]',
    'before:w-0 before:h-0',
    'before:z-10',
    'before:border-x-[8px] before:border-b-[16px]',
    'before:border-l-transparent before:border-r-transparent before:border-b-theme-600',
  ];
  return style;
});
const dropdownStyle = computed(() => {
  let style = [
    'absolute',
    'right-0',
    'min-w-max',
    'bg-theme-600',
    'z-10',
    'shadow-md',
    'rounded-md',
    'mt-4',
    'text-theme-100',
    beforeDropdownStyle.value,
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
        <Button :color="color">
          <span v-if="label" class="pl-1">{{ label }}</span>
          <Icon :path="btnIcon" class="pl-3" :size="16" />
        </Button>
      </slot>
    </div>
    <Transition name="fade" mode="out-in">
      <div
        v-if="showList"
        ref="dropdownRef"
        :class="dropdownStyle">
        <slot>
          <Menu :items="items" />
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