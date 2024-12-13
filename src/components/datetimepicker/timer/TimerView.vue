<script setup>
import { computed, ref } from 'vue';
import { toStr, pad, formatDate } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: Date,
  btnColor: String,
  isHoursView: Boolean,
  isTwelveHrsView: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const timerContainerRef = ref();
const timerRef = ref();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const setTime = (time) => {
  time = parseInt(time);
  let hours = modelValue.value.getHours();
  let minutes = time;

  if( props.isHoursView ) {
    hours = props.isTwelveHrsView ? getTwelveHrsFormat(time) : time;
    minutes = modelValue.value.getMinutes();
  }

  modelValue.value.setHours(hours, minutes);
  modelValue.value = new Date(modelValue.value);
}

const list = computed(() => {
  let nums = !props.isHoursView ? 60 : 24;
  if( props.isHoursView && props.isTwelveHrsView ){
    return 12;
  }
  return nums;
});

const isActive = (value, index) => {
  let isActive = false;
  if(!props.isHoursView) {
    isActive = modelValue.value.getMinutes() === value;
  } else {
    let hrs = modelValue.value.getHours();
    if(props.isTwelveHrsView) {
      hrs = hrs % 12;
      hrs = hrs === 0 ? 12 : hrs;
    }
    isActive = hrs === value;
  }
  
  if(isActive){
    scrollToActive(index);
  }
  return isActive;
}

const scrollToActive = (elIndex) => {
  if( timerRef.value && timerRef.value[elIndex] && timerRef.value[elIndex].$el ) {
    timerContainerRef.value.scrollTop = timerRef.value[elIndex].$el.offsetTop - (timerRef.value[elIndex].$el.offsetHeight * 2 );
  }
}

const getTwelveHrsFormat = (hours) => {
  let timePeriod = formatDate(modelValue.value, 'K');
  hours = parseInt(hours);
  hours = hours % 12; 
  hours = timePeriod === 'PM' ? hours + 12 : hours;
  return hours;
}

const getTimeFormat = (num, index) => {
  return props.isHoursView && props.isTwelveHrsView ? num : index;
}

const getLabel = (num) => {
  return toStr(pad(num));
}

</script>
<template>
  <div ref="timerContainerRef" class="relative grid grid-cols-[repeat(3,_min-content)] justify-around gap-2 w-full max-h-72 overflow-y-auto">
    <div 
      class="flex justify-center items-center" 
      v-for="(num, index) in list" :key="index"
    >
      <Button
        ref="timerRef"
        class="w-full" 
        :color="btnColor" 
        :label="getLabel(getTimeFormat(num, index))" 
        :outline="!isActive(getTimeFormat(num, index), index)" 
        @click="setTime(getTimeFormat(num, index))" 
      />
    </div>
  </div>
</template>