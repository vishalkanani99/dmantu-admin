<script setup>
import { computed } from 'vue';
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
const prependYears = computed(() => {
  let years = [];
  for(let y = currentYr.value - props.prepend; y < currentYr.value; y++ ) {
    years.push(y);
  }
  return years;
});
const appendYears = computed(() => {
  let years = [];
  for(let y = currentYr.value; y < currentYr.value + props.append; y++ ) {
    years.push(y);
  }
  return years;
});

const isActiveYear = (year) => {
  return modelValue.value.getFullYear() === year;
}
</script>
<template>
  <div class="grid grid-cols-[repeat(3,_min-content)] justify-around gap-2 max-h-72 overflow-y-auto">
    <div 
      class="flex justify-center items-center" 
      v-for="(yr, index) in prependYears" :key="index"
    >
      <Button class="w-full" :color="btnColor" :label="toStr(yr)" :outline="!isActiveYear(yr)" @click="setYear(yr)" />
    </div>
    <div 
      class="flex justify-center items-center" 
      v-for="(yr, index) in appendYears" :key="index"
    >
      <Button class="w-full" :color="btnColor" :label="toStr(yr)" :outline="!isActiveYear(yr)" @click="setYear(yr)" />
    </div>
  </div>
</template>