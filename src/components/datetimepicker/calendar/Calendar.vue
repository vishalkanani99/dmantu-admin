<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue';
import CalendarNav from './CalendarNav.vue';
import CalendarMonths from './CalendarMonths.vue';
import CalendarYears from './CalendarYears.vue';
import CalendarDays from './CalendarDays .vue';
import Timer from '../timer/Timer.vue';
import TimerView from '../timer/TimerView.vue';
import '../../../assets/css/transition.css';

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
  },
  btnColor: String,
  hasTimer: Boolean,
  isTwelveHrsView: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const dateObj = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const transitionName = shallowRef('slide-down');
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
  toggleView('days', 'slide-right');
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
  toggleView('days', 'slide-left');
}

const toggleView = (view, transition = 'slide-down') => {
  transitionName.value = transition;
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
  <div class="relative">
    <CalendarNav 
      class="mb-2" 
      :year="year" 
      :month="month"
      :btnColor="btnColor" 
      @next="nextMonthYear"
      @prev="prevMonthYear"
      @toggleMonth="toggleView('months')"
      @toggleYear="toggleView('years')"
    />
    <TransitionGroup :name="transitionName">
      <CalendarMonths 
        v-if="currentView === 'months'"
        v-model="dateObj"
        :btnColor="btnColor"
        @update:modelValue="update('months')" 
      />
      <CalendarYears 
        v-if="currentView === 'years'"
        v-model="dateObj"
        :prepend="prependYears"
        :append="appendYears"
        :btnColor="btnColor"
        @update:modelValue="update('years')" 
      />
      <CalendarDays
        v-if="currentView === 'days'"
        :key="month"
        v-model="dateObj" 
        :firstDayOfWeek="firstDayOfWeek" 
        :year="year" 
        :month="month"
        :btnColor="btnColor"  
      />
      <TimerView
        v-if="hasTimer && (currentView === 'hours' || currentView === 'minutes')"
        :key="currentView"
        v-model="dateObj"
        :isTwelveHrsView="isTwelveHrsView"
        :btnColor="btnColor"
        :isHoursView="currentView === 'hours'"
        
      />
    </TransitionGroup>
    <Timer
      v-if="hasTimer"
      v-model="dateObj"
      :color="btnColor"
      :isTwelveHrsView="isTwelveHrsView"
      @hour="toggleView('hours', 'slide-up')"
      @minute="toggleView('minutes', 'slide-up')" 
    />
  </div>
</template>