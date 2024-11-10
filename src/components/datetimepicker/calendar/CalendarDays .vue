<script setup>
import { computed } from 'vue';
import { l10n, isEqualDates } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: Array,
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  month: {
    type: Number,
    default: new Date().getMonth(),
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedDate = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const isActiveDate = (day) => {
  let date = new Date(props.year, props.month, day);
  let currentDt = new Date(selectedDate.value[0], selectedDate.value[1], selectedDate.value[2]);
  return isEqualDates(date, currentDt);
}

const setDate = (day) => {
  selectedDate.value = [props.year, props.month, day];
}

const firstOfMonth = computed(() => {
  return ( new Date(props.year, props.month, 1).getDay() - props.firstDayOfWeek + 7 )%7
});

const prevMonthDays = computed(() => {
  const prevMonth = ( props.month - 1 + 12)%12;
  return getDaysinMonth( prevMonth );
});

const prependDays = computed(() => {
  let dayNumber = prevMonthDays.value + 1 - firstOfMonth.value;
  let days = [];

  while (dayNumber <= prevMonthDays.value) {
    days.push(dayNumber);
    dayNumber++
  }

  return days;
});

const buildDays = computed(() => {
  let dayNumber = 1;
  let numDays = getDaysinMonth();
  let days = [];
  let appendDays = [];

  while (dayNumber <= 42 - firstOfMonth.value) {
    let day = dayNumber;
    if(dayNumber > numDays){
      day = dayNumber % numDays;
      appendDays.push(day);
    } else {
      days.push(day);
    }
    dayNumber++;
  }

  return {
    days,
    appendDays,
  };
});

const buildWeekDays = computed(() => {
  let days = l10n.weekdays.shorthand.slice();

  if (props.firstDayOfWeek > 0 && props.firstDayOfWeek < days.length) {
    days = [].concat(days.splice(props.firstDayOfWeek, days.length), days.splice(0, props.firstDayOfWeek));
  }

  return days;
});

const getDaysinMonth = (givenMonth) => {

  let year = props.year,
      month = givenMonth || props.month;

  if (month === 1 && ( !( (year % 4) || (!(year % 100) && (year % 400))) ) ){
    return 29;
  }

  return l10n.daysInMonth[month];

}
</script>
<template>
  <div class="grid grid-cols-[repeat(7,_min-content)] justify-around gap-2">
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(day, index) in buildWeekDays" :key="index"
    >
      <span>{{ day }}</span>
    </div>
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(day, index) in prependDays" :key="index"
    >
      <Button class="w-full" :label="day.toString()" disabled outline rounded />
    </div>
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(day, index) in buildDays.days" :key="index"
    >
      <Button 
        class="w-full" 
        :label="day.toString()" 
        :outline="!isActiveDate(day)" 
        rounded
        @click="setDate(day)" 
      />
    </div>
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(day, index) in buildDays.appendDays" :key="index"
    >
      <Button class="w-full" :label="day.toString()" disabled outline rounded />
    </div>
  </div>
</template>