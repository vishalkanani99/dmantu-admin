<script setup>
import { ref, shallowRef, computed, onMounted, onUnmounted } from 'vue';
import { useSwiper } from '../../composables/useSwiper';
import { background, border } from '../../color';

const props = defineProps({
  modelValue: [Number, Array],
  min: {
    type: Number,
    default: 0,
  },
  max: Number,
  ticks: Boolean,
  color: {
    type: String,
    default: 'theme-dark',
  },
  trackColor: {
    type: String,
    default: 'theme-light',
  },
  handlerColor: {
    type: String,
    default: 'theme-light',
  },
  handlerBorderColor: {
    type: String,
    default: 'theme-dark',
  },
});

const emit = defineEmits(['update:modelValue']);
const { initSwiper, clearSwiper } = useSwiper();

const containerRef = ref();
const offsetWidth = shallowRef(0);
const position = shallowRef(0); // Position after handler stopped
const newPosition = shallowRef(0); // Position on dragging
const handlerRef = ref();
const isDragging = shallowRef(false);

const hasMaxSliderPosition = computed(() => newPosition.value > offsetWidth.value);
const hasMinSliderPosition = computed(() => newPosition.value < 0);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  } 
});

const initSlider = () => {
  offsetWidth.value = containerRef.value.offsetWidth;
  newPosition.value = position.value = (modelValue.value * offsetWidth.value) / 100;
  setHandlerPostion();
}

const dragging = (value) => {
  if( hasMaxSliderPosition.value || hasMinSliderPosition.value ) return;
  isDragging.value = true;
  newPosition.value = position.value + value;
  setHandlerPostion();
}

const stopDragging = (value) => {
  if( !isDragging.value ) return;
  isDragging.value = false;

  if(hasMaxSliderPosition.value) {
    newPosition.value = offsetWidth.value;
  }

  if(hasMinSliderPosition.value) {
    newPosition.value = 0;
  }
  
  position.value = newPosition.value;
}

const changeHandlerPostion = (e) => {
  let isHandlerEl =  e.target === handlerRef.value || handlerRef.value.contains(e.target);
  if( isDragging.value || isHandlerEl ) return;
  newPosition.value = position.value = e.offsetX;
  setHandlerPostion();
}

const setHandlerPostion = () => {
  let positionInPercentage = Math.round((( newPosition.value * 100 ) / offsetWidth.value));
  modelValue.value = positionInPercentage > 100 ? 100 : positionInPercentage;
}

onMounted(() => {
  initSlider();
  initSwiper(handlerRef.value, dragging, stopDragging);
})

onUnmounted(() =>{
  clearSwiper(handlerRef.value);
})
</script>
<template>
  <div class="bg-transparent my-2 w-full select-none">
    <!-- Track -->
    <div 
      ref="containerRef"
      :class="[
        'relative flex items-center',
        background[color],
        'h-3 rounded-md cursor-pointer'
      ]"
      @click="changeHandlerPostion"
    >
      <!-- Track Filler -->
      <div
        :class="[
          'absolute top-[50%] -translate-y-[55%]',
          background[trackColor],
          'h-full rounded-md shadow-md'
        ]"
        :style="{
          width: `${modelValue}%`,
          left: '0px',
        }"
      >

      </div>

      <!-- Handler -->
      <div
        ref="handlerRef" 
        :class="[
          'absolute top-[50%] -translate-x-[50%] -translate-y-[50%]',
          'inline-flex flex-col items-center',
          background[handlerColor],
          'rounded-md shadow-md'
        ]" 
        :style="{
          left: `${modelValue}%`,
        }"
      >
        <div 
          :class="[
            'h-5 w-5 border rounded-md shadow-md',
            border[handlerBorderColor],
            background[handlerColor],
          ]"
          :style="{
            scale: isDragging ? '1.5' : '1',
          }"
        >
        </div>
      </div>
    </div>
  </div>
</template>