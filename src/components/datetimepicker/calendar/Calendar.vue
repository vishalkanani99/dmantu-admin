<script setup>
import { computed, ref, shallowRef } from 'vue';
import CalendarNav from './CalendarNav.vue';
import CalendarMonths from './CalendarMonths.vue';
import CalendarYears from './CalendarYears.vue';
import CalendarWeekDays from './CalendarWeekDays.vue';
import CalendarDays from './CalendarDays .vue';

const props = defineProps({
  firstDayOfWeek: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['']);

const currentView = shallowRef('days');
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());

const nextMonthYear = () => {
  let nextMonth = parseInt(month.value) + 1;
  let nextYear = parseInt(year.value) + 1;
  let isValidMonth = nextMonth < 12;
  let isValidYear = nextYear < 100000;

  if( !isValidMonth ) {
    month.value = 0;
    year.value = isValidYear ? nextYear : 99999;
    return;
  }

  month.value = nextMonth;
  toggleView('days');
}

const prevMonthYear = () => {
  let prevMonth = parseInt(month.value) - 1;
  let prevYear = parseInt(year.value) - 1;
  let isValidMonth = prevMonth >= 0;
  let isValidYear = prevYear > 99;

  if( !isValidMonth ) {
    month.value = 11;
    year.value = isValidYear ? prevYear : 100;
    return;
  }

  month.value = prevMonth;
  toggleView('days');
}

const toggleView = (view) => {
  currentView.value = currentView.value === view ? 'days' : view;
}

</script>
<template>
  <div>
    <CalendarNav 
      class="mb-2" 
      :year="year" 
      :month="month" 
      @next="nextMonthYear"
      @prev="prevMonthYear"
      @toggleMonth="toggleView('months')"
      @toggleYear="toggleView('years')"
    />
    <CalendarMonths 
      v-if="currentView === 'months'"
      v-model="month"
      @update:modelValue="toggleView('months')" 
    />
    <CalendarYears 
      v-if="currentView === 'years'"
      v-model="year"
      @update:modelValue="toggleView('years')" 
    />
    <template v-if="currentView === 'days'" >
      <CalendarWeekDays :firstDayOfWeek="firstDayOfWeek" />
      <CalendarDays 
        :firstDayOfWeek="firstDayOfWeek" 
        :year="year" 
        :month="month"  
      />
    </template>
  </div>
</template>