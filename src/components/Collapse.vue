<script setup>
import { ref, shallowRef, onMounted, computed } from 'vue';
import { mdiPlus, mdiMinus } from '@mdi/js';
import Button from './Button.vue';
import Icon from './Icon.vue';

const props = defineProps({
  expanded: {
    type: Boolean,
    default: false,
  },
  plain: Boolean,
  title: String,
});

const emit = defineEmits(["toggle"]);

const containerRef = ref(null);
const wrapperRef = ref(null);
const expand = shallowRef(false);
const expanding = shallowRef(false);

const containerStyle = computed(() => {
  let style = [
    { 'border-2 shadow-md block' : !props.plain }
  ];
  return style;
});

const handlerStyle = computed(() => {
  let style = [
    'flex flex-row flex-wrap justify-between items-center py-3 px-6 w-full',
    { 'border-b-2' : !props.plain },
  ];
  return style;
});

const wrapperStyle = computed(() => {
  let style = [
    'hidden overflow-hidden',
  ];
  return style;
});

const toggle = () => {
  if(expanding.value) {
    return;
  }
  expanding.value = true;
  expand.value = !expand.value;
  emit("toggle", containerRef.value);
  setTransition();
}

const setTransition = () => {
  let beforeTransitionHeight = wrapperRef.value.offsetHeight; 
  let height = 0;

  if(expand.value) {
    wrapperRef.value.classList.remove('hidden');
    height = wrapperRef.value.offsetHeight;
  }
  setHeight(beforeTransitionHeight);
  wrapperRef.value.style.transition = 'height 0.3s ease-in-out'; 
  setTimeout(() => {
    setHeight(height);
  }, 1);
  afterTransitionEnd();
}

const setHeight = (height) => {
  wrapperRef.value.style.height = `${height}px`;
}

const afterTransitionEnd = () => {
  setTimeout(() => {
    if(!expand.value) {
      wrapperRef.value.classList.add('hidden');
    }
    wrapperRef.value.style.removeProperty('transition');
    wrapperRef.value.style.removeProperty('height');
    expanding.value = false;
  }, 300);
}

defineExpose({
  containerRef,
  setHeight,
  expand,
})

onMounted(() => {
  if(props.expanded){
    toggle();
  }
})

</script>
<template>
  <div
    ref="containerRef" 
    :class="containerStyle">
    <!-- Collapse handler start -->
    <div @click="toggle()">
      <slot name="handler" :expand="expand">
        <Button 
          :class="handlerStyle" isPlain>
          <span class="order-first">{{ title }}</span>
          <Icon class="order-last" :path="expand ? mdiMinus : mdiPlus" />
        </Button> 
      </slot>
    </div>
    <!-- Collapse handler end -->
    <!-- content start -->
    <div
      ref="wrapperRef"
      :class="wrapperStyle">
      <slot></slot>
    </div>
    <!-- content end -->
  </div>
</template>