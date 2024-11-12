<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue';
import CalendarNav from './CalendarNav.vue';
import CalendarMonths from './CalendarMonths.vue';
import CalendarYears from './CalendarYears.vue';
import CalendarDays from './CalendarDays .vue';

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => {
      return new Date();
    }
  },
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  prependYears: {
    type: Number,
    default: 100,
  },
  appendYears: {
    type: Number,
    default: 100,
  }
});

const emit = defineEmits(['update:modelValue']);

const dateObj = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

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

const update = (view) => {
  year.value = dateObj.value.getFullYear();
  month.value = dateObj.value.getMonth();
  toggleView(view);
}

onMounted(() => {
  update('days');
})
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
      v-model="dateObj"
      @update:modelValue="update('months')" 
    />
    <CalendarYears 
      v-if="currentView === 'years'"
      v-model="dateObj"
      :prepend="prependYears"
      :append="appendYears"
      @update:modelValue="update('years')" 
    />
    <CalendarDays
      v-if="currentView === 'days'"
      v-model="dateObj" 
      :firstDayOfWeek="firstDayOfWeek" 
      :year="year" 
      :month="month"  
    />
  </div>
</template>