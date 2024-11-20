<script setup>
import { computed } from 'vue';
import { toStr, pad, formatDate } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: Date,
  btnColor: String,
  isHoursView: Boolean,
  isTwelveHrsView: Boolean,
});

const emit = defineEmits(['update:modelValue']);

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
  modelValue.value = modelValue.value;
}

const list = computed(() => {
  let nums = !props.isHoursView ? 60 : 24;
  if( props.isHoursView && props.isTwelveHrsView ){
    return 12;
  }
  return nums;
});

const isActive = (value) => {
  if(!props.isHoursView) {
    return modelValue.value.getMinutes() === value;
  }
  let hrs = modelValue.value.getHours();
  if(props.isTwelveHrsView) {
    hrs = hrs % 12;
    hrs = hrs === 0 ? 12 : hrs;
  }
  return hrs === value;
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
  <div class="grid grid-cols-[repeat(3,_min-content)] justify-around gap-2 max-h-72 overflow-y-auto">
    <div 
      class="flex justify-center items-center" 
      v-for="(num, index) in list" :key="index"
    >
      <Button 
        class="w-full" 
        :color="btnColor" 
        :label="getLabel(getTimeFormat(num, index))" 
        :outline="!isActive(getTimeFormat(num, index))" 
        @click="setTime(getTimeFormat(num, index))" 
      />
    </div>
  </div>
</template>