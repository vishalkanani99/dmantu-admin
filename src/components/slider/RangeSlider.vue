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
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);
const { initMultipleSwiper } = useSwiper();

const containerRef = ref();
const offsetWidth = shallowRef(0);

const position = shallowRef([0, 0]); // Position after handler stopped
const newPosition = shallowRef([0, 0]); // Position on dragging
const handlerPosition = shallowRef([0, 0]);

const handlerRef = ref();
const filledTrackRef = ref();
const tickRef = ref();
const isDragging = shallowRef(-1);

const totalTicks = computed(() => props.divider + 1); // Additionally added for position 0
const tickStep = computed(() => 100 / (totalTicks.value - 1));
const isRangeSlider = computed(() => Array.isArray(props.modelValue) && props.modelValue.length === 2); 

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

  let registerSwiper = [
    [
      handlerRef.value[0],
      () => startDragging(0), 
      (value) => dragging(value, 0), 
      () => stopDragging(0),  
    ],
    [
      handlerRef.value[1],
      () => startDragging(1), 
      (value) => dragging(value, 1), 
      () => stopDragging(1),
    ],
  ];

  offsetWidth.value = containerRef.value.offsetWidth;

  // convert modelvalue into define range value
  if(isRangeSlider.value) {
    modelValue.value = [
      (modelValue.value[0] / step.value) !== 1 ? step.value : modelValue.value[0],
      (modelValue.value[1] / step.value) !== 1 ? step.value : modelValue.value[1],
    ];
    newPosition.value[0] = position.value[0] = (modelValue.value[0] * offsetWidth.value) / 100;
    newPosition.value[1] = position.value[1] = (modelValue.value[1] * offsetWidth.value) / 100;
  } else {
    modelValue.value = (modelValue.value / step.value) !== 1 ? step.value : modelValue.value;
    newPosition.value[0] = position.value[0] = (modelValue.value * offsetWidth.value) / 100;
  }
  setHandlerPostion();
  initMultipleSwiper(registerSwiper);
  if(!props.divider) return;
  setNearByTick();
}

const checkMaxPosition = (index) => {
  return newPosition.value[index] > offsetWidth.value;
}

const checkMinPosition = (index) => {
  return newPosition.value[index] < 0;
}

const validatePosition = (index) => {
  if(checkMaxPosition(index)){
    newPosition.value[index] = offsetWidth.value;
  }
  
  if(checkMinPosition(index)) {
    newPosition.value[index] = 0;
  }
}

const startDragging = (index) => {
  if(props.disabled) return;
  isDragging.value = index;
}

const dragging = (value, index) => {
  if( checkMaxPosition(index) || checkMinPosition(index) || isDragging.value < 0 ) return;
  newPosition.value[index] = position.value[index] + value;
  validatePosition(index);
  setHandlerPostion();
}

const stopDragging = (index) => {
  if( isDragging.value < 0 ) return;
  isDragging.value = -1;
  position.value[index] = newPosition.value[index];
  if(!props.divider) return;
  setNearByTick();
}

const changeHandlerPostion = (e) => {
  if( props.disabled ) return;

  let isHandlerEl =  false;
  for( let key in handlerRef.value ){
    if(!isRangeSlider.value && key === 1) break;
    if( handlerRef.value[key].contains(e.target) ) {
      isHandlerEl = true;
      break;
    }
  }

  if( isDragging.value >= 0 || isHandlerEl ) return;
  
  let isFilledTrackEl = filledTrackRef.value.contains(e.target);
  let elOffsetX = isFilledTrackEl ? e.offsetX + e.target.offsetLeft : e.offsetX;

  if(props.divider) {
    for( let tick in tickRef.value ){
      if( tickRef.value[tick].contains(e.target) ) {
        elOffsetX = tickRef.value[tick].offsetLeft;
        break;
      }
    }
  }

  let nearByHandler = newPosition.value.map((pos) => Math.abs(pos - elOffsetX));
    
  if( isRangeSlider.value && nearByHandler[1] < nearByHandler[0]) {
    newPosition.value[1] = position.value[1] = elOffsetX;
  } else {
    newPosition.value[0] = position.value[0] = elOffsetX;
  }

  setHandlerPostion();
  if(!props.divider) return;
  setNearByTick();
}

const setHandlerPostion = () => {
  for(let key in newPosition.value) {
    if(!isRangeSlider.value && key === 1) return;
    let handlerPosInPercentage = Math.round((( newPosition.value[key] * 100 ) / offsetWidth.value));
    handlerPosition.value[key] = handlerPosInPercentage > 100 ? 100 : handlerPosInPercentage;
  }
  setModelValue();
}

const setNearByTick = () => {
  for(let key in newPosition.value) {
    if(!isRangeSlider.value && key === 1) return;
    let nearByTick = Math.round(( props.divider * newPosition.value[key] ) / offsetWidth.value);
    position.value[key] = newPosition.value[key] =  Math.round(( offsetWidth.value * nearByTick ) / props.divider);
    validatePosition(key);
    setHandlerPostion();
  }
}

const setModelValue = () => {
  if(isRangeSlider.value) {
    modelValue.value = [
      (handlerPosition.value[0] / step.value) + props.min,
      (handlerPosition.value[1] / step.value) + props.min,
    ];
    return;
  }
  modelValue.value = (handlerPosition.value[0] / step.value) + props.min;
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
})

</script>
<template>
  <div 
    :class="[
      'bg-transparent my-2 w-full select-none',
      { 'pointer-events-none opacity-70' : disabled },
    ]"
  >
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
        ref="filledTrackRef"
        :class="[
          'absolute top-[50%] -translate-y-[55%]',
          background[trackColor],
          'h-full rounded-md shadow-md'
        ]"
        :style="{
          width: isRangeSlider ?  `${Math.abs(handlerPosition[1] - handlerPosition[0])}%` : `${handlerPosition[0]}%`,
          left: isRangeSlider ?  `${Math.abs(Math.min(handlerPosition[1], handlerPosition[0]))}%` : '0%',
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
            <slot name="label" :tick="tick">
              {{ getTickLabel(tick) }}
            </slot>
          </span>
        </div>
      </template>

      <!-- Handler -->
      <template v-for="(position, index) in handlerPosition">
        <div
          v-if="index === 0 || (index === 1 && isRangeSlider)"
          ref="handlerRef" 
          :class="[
            'absolute top-[50%] -translate-x-[50%] -translate-y-[50%]',
            'inline-flex flex-col items-center',
            background[handlerColor],
            'rounded-md shadow-md',
            {'z-50': isDragging === index},
          ]" 
          :style="{
            left: `${position}%`,
          }"
        >
          <Popover
            :text="isRangeSlider ? modelValue[index].toString() : modelValue.toString()"
            :color="popoverColor"
          >
            <div 
              :class="[
                'h-5 w-5 border rounded-md shadow-md',
                border[handlerBorderColor],
                background[handlerColor],
              ]"
              :style="{
                scale: isDragging === index ? '1.5' : '1',
              }"
            >
            </div>
          </Popover>
        </div>
      </template>

    </div>
  </div>
</template>