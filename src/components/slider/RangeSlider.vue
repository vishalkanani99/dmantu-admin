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
const { initSwiper: initLeftHandler, clearSwiper: clearLeftHandler } = useSwiper();
const { initSwiper: initRightHandler, clearSwiper: clearRightHandler } = useSwiper();

const containerRef = ref();
const leftHandlerRef = ref();
const rightHandlerRef = ref();
const filledTrackRef = ref();
const tickRef = ref();

const offsetWidth = shallowRef(0);

const leftHandlerPreviousPosition = shallowRef(0); // Position after handler stopped
const rightHandlerPreviousPosition = shallowRef(0); // Position after handler stopped

const leftHandlerDraggingPosition = shallowRef(0); // Position on dragging
const rightHandlerDraggingPosition = shallowRef(0); // Position on dragging

const leftHandlerPosition = shallowRef(0);
const rightHandlerPosition = shallowRef(0);

const isLeftHandlerDragging = shallowRef(false);
const isRightHandlerDragging = shallowRef(false);

const hasMaxLeftHandlerPosition = computed(() => leftHandlerDraggingPosition.value > offsetWidth.value);
const hasMinLeftHandlerPosition = computed(() => leftHandlerDraggingPosition.value < 0);
const hasMaxRightHandlerPosition = computed(() => rightHandlerDraggingPosition.value > offsetWidth.value);
const hasMinRightHandlerPosition = computed(() => rightHandlerDraggingPosition.value < 0);

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
  offsetWidth.value = containerRef.value.offsetWidth;
  if(isRangeSlider.value) return;
  // convert modelvalue into define range value
  if((modelValue.value / step.value) !== 1) {
    modelValue.value = step.value;
  }
  leftHandlerDraggingPosition.value = leftHandlerPreviousPosition.value = (modelValue.value * offsetWidth.value) / 100;
  setHandlerPostion();
}

const validateLeftHandlerPosition = () => {
  if(hasMaxLeftHandlerPosition.value) {
    leftHandlerDraggingPosition.value = offsetWidth.value;
  }

  if(hasMinLeftHandlerPosition.value) {
    leftHandlerDraggingPosition.value = 0;
  }
}

const validateRightHandlerPosition = () => {
  if(hasMaxRightHandlerPosition.value) {
    rightHandlerDraggingPosition.value = offsetWidth.value;
  }

  if(hasMinRightHandlerPosition.value) {
    rightHandlerDraggingPosition.value = 0;
  }
}

const leftHandlerDragging = (value) => {
  if( hasMaxLeftHandlerPosition.value || hasMinLeftHandlerPosition.value ) return;
  isLeftHandlerDragging.value = true;
  leftHandlerDraggingPosition.value = leftHandlerPreviousPosition.value + value;
  validateLeftHandlerPosition();
  setHandlerPostion();
}

const stopLeftHandlerDragging = (value) => {
  if( !isLeftHandlerDragging.value ) return;
  isLeftHandlerDragging.value = false;
  leftHandlerPreviousPosition.value = leftHandlerDraggingPosition.value;
  if(props.divider){
    setNearByTick();
  }
}

const rightHandlerDragging = (value) => {
  if( hasMaxRightHandlerPosition.value || hasMinRightHandlerPosition.value ) return;
  isRightHandlerDragging.value = true;
  rightHandlerDraggingPosition.value = rightHandlerPreviousPosition.value + value;
  validateRightHandlerPosition();
  setHandlerPostion();
}

const stopRightHandlerDragging = (value) => {
  if( !isRightHandlerDragging.value ) return;
  isRightHandlerDragging.value = false;
  leftHandlerPreviousPosition.value = leftHandlerDraggingPosition.value;
  if(props.divider){
    setNearByTick();
  }
}

const changeHandlerPostion = (e) => {
  let isLeftHandlerEl =  e.target === leftHandlerRef.value || leftHandlerRef.value.contains(e.target);
  let isRightHandlerEl =  rightHandlerRef.value 
    && (e.target === rightHandlerRef.value || rightHandlerRef.value.contains(e.target));
  let isFilledTrackEl = filledTrackRef.value.contains(e.target);

  if( isLeftHandlerDragging.value || isRightHandlerDragging.value || isLeftHandlerEl || isRightHandlerEl ) return;
  let elOffsetX = isFilledTrackEl ? e.offsetX + e.target.offsetLeft : e.offsetX;

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
  
  if( isRangeSlider.value ) {
    let nearByLeftHandler = Math.abs(leftHandlerDraggingPosition.value - elOffsetX);
    let nearByRightHandler = Math.abs(rightHandlerDraggingPosition.value - elOffsetX);
    
    if(nearByRightHandler < nearByLeftHandler) {
      rightHandlerDraggingPosition.value = rightHandlerPreviousPosition.value = elOffsetX;
      setHandlerPostion();
      setNearByTick();
      return;
    }
  }
  leftHandlerDraggingPosition.value = leftHandlerPreviousPosition.value = elOffsetX;
  setHandlerPostion();
  if(props.divider){
    setNearByTick();
  }
}

const setHandlerPostion = () => {
  let leftHandlerPositionInPercentage = Math.round((( leftHandlerDraggingPosition.value * 100 ) / offsetWidth.value));
  leftHandlerPosition.value = leftHandlerPositionInPercentage > 100 ? 100 : leftHandlerPositionInPercentage;
  if(isRangeSlider.value) {
    let rightHandlerPositionInPercentage = Math.round((( rightHandlerDraggingPosition.value * 100 ) / offsetWidth.value));
    rightHandlerPosition.value = rightHandlerPositionInPercentage > 100 ? 100 : rightHandlerPositionInPercentage;
  }
  setModelValue();
}

const setModelValue = () => {
  if(isRangeSlider.value) {
    modelValue.value = [
      (leftHandlerPosition.value / step.value) + props.min,
      (rightHandlerPosition.value / step.value) + props.min,
    ];
    return;
  }
  modelValue.value = (leftHandlerPosition.value / step.value) + props.min;
}

const setNearByTick = () => {
  let nearByTick = Math.round(( props.divider * leftHandlerDraggingPosition.value ) / offsetWidth.value);
  leftHandlerPreviousPosition.value = leftHandlerDraggingPosition.value =  Math.round(( offsetWidth.value * nearByTick ) / props.divider);
  validateLeftHandlerPosition();
  if(isRangeSlider.value) {
    let nearByTick = Math.round(( props.divider * rightHandlerDraggingPosition.value ) / offsetWidth.value);
    rightHandlerPreviousPosition.value = rightHandlerDraggingPosition.value =  Math.round(( offsetWidth.value * nearByTick ) / props.divider);
    validateRightHandlerPosition();
  }
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
  initLeftHandler(leftHandlerRef.value, leftHandlerDragging, stopLeftHandlerDragging);
  if( isRangeSlider.value ){
    initRightHandler(rightHandlerRef.value, rightHandlerDragging, stopRightHandlerDragging);
  }
})

onUnmounted(() =>{
  clearLeftHandler(leftHandlerRef.value);
  if( isRangeSlider.value ){
    clearRightHandler(rightHandlerRef.value);
  }
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
        ref="filledTrackRef"
        :class="[
          'absolute top-[50%] -translate-y-[55%]',
          background[trackColor],
          'h-full rounded-md shadow-md'
        ]"
        :style="{
          width: isRangeSlider ?  `${Math.abs(rightHandlerPosition - leftHandlerPosition)}%` : `${leftHandlerPosition}%`,
          left: isRangeSlider ?  `${Math.abs(Math.min(rightHandlerPosition, leftHandlerPosition))}%` : '0%',
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
        ref="leftHandlerRef" 
        :class="[
          'absolute top-[50%] -translate-x-[50%] -translate-y-[50%]',
          'inline-flex flex-col items-center',
          background[handlerColor],
          'rounded-md shadow-md z-10'
        ]" 
        :style="{
          left: `${leftHandlerPosition}%`,
        }"
      >
        <Popover
          :text="isRangeSlider ? modelValue[0].toString() : modelValue.toString()"
          :color="popoverColor"
        >
          <div 
            :class="[
              'h-5 w-5 border rounded-md shadow-md',
              border[handlerBorderColor],
              background[handlerColor],
            ]"
            :style="{
              scale: isLeftHandlerDragging ? '1.5' : '1',
            }"
          >
          </div>
        </Popover>
      </div>
      <div
        v-if="isRangeSlider"
        ref="rightHandlerRef" 
        :class="[
          'absolute top-[50%] -translate-x-[50%] -translate-y-[50%]',
          'inline-flex flex-col items-center',
          background[handlerColor],
          'rounded-md shadow-md z-20'
        ]" 
        :style="{
          left: `${rightHandlerPosition}%`,
        }"
      >
        <Popover
          :text="modelValue[1].toString()"
          :color="popoverColor"
        >
          <div 
            :class="[
              'h-5 w-5 border rounded-md shadow-md',
              border[handlerBorderColor],
              background[handlerColor],
            ]"
            :style="{
              scale: isRightHandlerDragging ? '1.5' : '1',
            }"
          >
          </div>
        </Popover>
      </div>

    </div>
  </div>
</template>