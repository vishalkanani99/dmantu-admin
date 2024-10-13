<script setup>
import { ref, shallowRef, computed, onMounted, onUnmounted } from 'vue';
import { useSwiper } from '../../composables/useSwiper';
import { background, text, border } from '../../color';
import Popover from '../Popover.vue';

const props = defineProps({
  modelValue: [Number, Array],
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
    validator(value, props) {
      // The value must be greater than min
      return props.min < value;
    }
  },
  divider: {
    type: Number,
    default: 0,
    validator(value, props) {
      // The value must be greater than 0
      return value > 0;
    }
  },
  color: {
    type: String,
    default: 'theme-dark',
  },
  tickColor: {
    type: String,
    default: 'theme',
  },
  textColor: {
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
  popoverColor: {
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
const handlerPosition = shallowRef(0);
const handlerRef = ref();
const tickRef = ref();
const isDragging = shallowRef(false);

const hasMaxSliderPosition = computed(() => newPosition.value > offsetWidth.value);
const hasMinSliderPosition = computed(() => newPosition.value < 0);
const totalTicks = computed(() => props.divider + 1); // Additionally added for position 0
const tickStep = computed(() => 100 / (totalTicks.value - 1)); 

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  } 
});

const step = computed(() => {
  if( props.max <= props.min ) return 1;
  return 100 / (props.max - props.min);
});

const initSlider = () => {
  offsetWidth.value = containerRef.value.offsetWidth;
  // convert modelvalue into define range value
  if((modelValue.value / step.value) !== 1) {
    modelValue.value = step.value;
  }
  newPosition.value = position.value = (modelValue.value * offsetWidth.value) / 100;
  setHandlerPostion();
}

const validatePosition = () => {
  if(hasMaxSliderPosition.value) {
    newPosition.value = offsetWidth.value;
  }

  if(hasMinSliderPosition.value) {
    newPosition.value = 0;
  }
}

const dragging = (value) => {
  if( hasMaxSliderPosition.value || hasMinSliderPosition.value ) return;
  isDragging.value = true;
  newPosition.value = position.value + value;
  validatePosition();
  setHandlerPostion();
}

const stopDragging = (value) => {
  if( !isDragging.value ) return;
  isDragging.value = false;
  position.value = newPosition.value;
  if(props.divider){
    setNearByTick();
  }
}

const changeHandlerPostion = (e) => {
  let isHandlerEl =  e.target === handlerRef.value || handlerRef.value.contains(e.target);
  if( isDragging.value || isHandlerEl ) return;
  let elOffsetX = e.offsetX;

  if(props.divider) {
    for( let tick in tickRef.value ){
      if( tickRef.value[tick].contains(e.target) ) {
        elOffsetX = 
          e.target === tickRef.value[tick] 
            ? e.target.offsetLeft 
            : e.target.offsetParent.offsetLeft;
        break;
      }
    }
  }

  newPosition.value = position.value = elOffsetX;
  setHandlerPostion();
}

const setHandlerPostion = () => {
  let positionInPercentage = Math.round((( newPosition.value * 100 ) / offsetWidth.value));
  handlerPosition.value = positionInPercentage > 100 ? 100 : positionInPercentage;
  setModelValue();
}

const setModelValue = () => {
  modelValue.value = (handlerPosition.value / step.value) + props.min;
}

const setNearByTick = () => {
  let nearByTick = Math.round(( props.divider * newPosition.value ) / offsetWidth.value);
  position.value = newPosition.value =  Math.round(( offsetWidth.value * nearByTick ) / props.divider);
  validatePosition();
  setHandlerPostion();
}

const getTickPosition = (tick) => {
  return Math.round(tickStep.value * (tick - 1));
}

const getTickLabel = (tick) => {
  let label = (getTickPosition(tick) / step.value) + props.min;
  return label % 1 === 0 ? label : Math.round(label);
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
          width: `${handlerPosition}%`,
          left: '0px',
        }"
      >

      </div>

      <!-- Ticks -->
      <template v-if="divider">
        <div
          ref="tickRef"
          v-for="tick in totalTicks"
          :key="tick"
          :class="[
            'absolute top-[50%] -translate-x-[50%] -translate-y-[50%]',
            background[tickColor],
            'w-2 h-2 rounded-full shadow-md',
            { 'bg-transparent': tick === 1 || tick === totalTicks }
          ]"
          :style="{
            left: `${getTickPosition(tick)}%`,
          }"
          :value="getTickPosition(tick)"
        >
          <!-- Ticks Label -->
          <span
            :class="[
              'absolute top-[calc(.75rem+2px)] left-[50%] -translate-x-[50%]',
              text[textColor],
            ]"
          >
            {{ getTickLabel(tick) }}
          </span>
        </div>
      </template>

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
          left: `${handlerPosition}%`,
        }"
      >
        <Popover
          :text="modelValue"
          :color="popoverColor"
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
        </Popover>
      </div>
    </div>
  </div>
</template>