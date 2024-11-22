<script setup>
import { computed, ref } from 'vue';
import { toStr } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: Date,
  prepend: {
    type: Number,
    default: 100,
  },
  append: {
    type: Number,
    default: 100,
  },
  btnColor: String,
});

const emit = defineEmits(['update:modelValue']);

const yearContainerRef = ref();
const yearRef = ref();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const setYear = (yr) => {
  modelValue.value.setFullYear(yr);
  modelValue.value = modelValue.value;
}

const currentYr = computed(() => new Date().getFullYear());

const totalYears = computed(() => {
  let prependYears = [];
  let appendYears = [];

  for(let y = currentYr.value - props.prepend; y < currentYr.value; y++ ) {
    prependYears.push(y);
  }

  for(let y = currentYr.value; y < currentYr.value + props.append; y++ ) {
    appendYears.push(y);
  }
  
  return [ ...prependYears, ...appendYears ];
});

const isActiveYear = (year, elIndex) => {
  let isActive = modelValue.value.getFullYear() === year;
  if( isActive && yearRef.value && yearRef.value[elIndex] && yearRef.value[elIndex].$el ) {
    yearContainerRef.value.scrollTop = yearRef.value[elIndex].$el.offsetTop - (yearRef.value[elIndex].$el.offsetHeight * 2 );
  }
  return isActive;
}
</script>
<template>
  <div ref="yearContainerRef" class="grid grid-cols-[repeat(3,_min-content)] justify-around  w-full gap-2 max-h-72 overflow-y-auto">
    <div 
      class="flex justify-center items-center" 
      v-for="(yr, index) in totalYears" :key="index"
    >
      <Button
        ref="yearRef" 
        class="w-full" 
        :color="btnColor" 
        :label="toStr(yr)" 
        :outline="!isActiveYear(yr, index)" 
        @click="setYear(yr)" 
      />
    </div>
  </div>
</template>