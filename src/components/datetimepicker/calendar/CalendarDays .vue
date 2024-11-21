<script setup>
import { computed } from 'vue';
import { l10n, isEqualDates, toStr } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => {
      return new Date();
    }
  },
  minDate: {
    type: Date,
    validator(value, props) {
      return props.maxDate > value;
    }
  },
  maxDate: {
    type: Date,
    validator(value, props) {
      return props.minDate < value;
    }
  }, 
  disabled: Array, // eg. [{ 'from': new Date('2024', '11', '12'), 'to': new Date('2024', '11', '18') }, new Date('2025', '08', '12')],
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
  btnColor: String,
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
  return isEqualDates(date, selectedDate.value);
}

const setDate = (day) => {
  selectedDate.value = new Date(props.year, props.month, day);
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

const isDisableDate = (day) => {

  let currentDate = new Date(props.year, props.month, day);
  
  let isOutsideMinDate = props.minDate && props.minDate.constructor === Date && props.minDate > currentDate;
  let isOutsideMaxDate = props.maxDate && props.maxDate.constructor === Date && props.maxDate < currentDate;

  if( isOutsideMinDate || isOutsideMaxDate ) {
    return true;
  }

  let isDisabled = false;

  if( props.disabled ) {
    for(let key in props.disabled ){

      if(props.disabled[key].constructor === Date && isEqualDates(currentDate, props.disabled[key])) {
        isDisabled = true;
        break;
      }

      if(!props.disabled[key].constructor === Object) {
        continue;
      }

      if(!props.disabled[key].hasOwnProperty('from') || !props.disabled[key]['from'].constructor === Date) {
        continue;
      }

      if(!props.disabled[key].hasOwnProperty('to') || !props.disabled[key]['to'].constructor === Date) {
        continue;
      }

      let fromDate = props.disabled[key]['from'];
      let toDate = props.disabled[key]['to'];

      if( fromDate < toDate && currentDate >= fromDate && currentDate <= toDate ){
        isDisabled = true;
        break;
      }
    }
  }
  
  return isDisabled;
}

const buildDays = computed(() => {
  let dayNumber = 1;
  let numDays = getDaysinMonth();
  let daysObj = [];
  let appendDays = [];

  while (dayNumber <= 42 - firstOfMonth.value) {
    let day = dayNumber;
    if(dayNumber > numDays){
      day = dayNumber % numDays;
      appendDays.push(day);
    } else {
      daysObj.push({ day, disabled: isDisableDate(day) });
    }
    dayNumber++;
  }

  return {
    daysObj,
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
      <Button class="w-full" :color="btnColor" :label="toStr(day)" disabled outline rounded />
    </div>
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(dayObj, index) in buildDays.daysObj" :key="index"
    >
      <Button 
        class="w-full"
        :color="btnColor" 
        :label="toStr(dayObj.day)" 
        :outline="!isActiveDate(dayObj.day)"
        :disabled="dayObj.disabled" 
        rounded
        @click="setDate(dayObj.day)" 
      />
    </div>
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(day, index) in buildDays.appendDays" :key="index"
    >
      <Button class="w-full" :color="btnColor" :label="toStr(day)" disabled outline rounded />
    </div>
  </div>
</template>