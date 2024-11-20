<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue';
import CalendarNav from './CalendarNav.vue';
import CalendarMonths from './CalendarMonths.vue';
import CalendarYears from './CalendarYears.vue';
import CalendarDays from './CalendarDays .vue';
import Timer from '../timer/Timer.vue';
import TimerView from '../timer/TimerView.vue';

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

const transitionName = shallowRef('calendar');
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
  transitionName.value = 'next-month';
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
  transitionName.value = 'prev-month';
  toggleView('days');
}

const toggleView = (view) => {
  if( view !== 'days' ) {
    transitionName.value = 'calendar';
  }
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
        v-if="hasTimer && (currentView === 'hour' || currentView === 'minute')"
        :key="currentView"
        v-model="dateObj"
        :isTwelveHrsView="isTwelveHrsView"
        :btnColor="btnColor"
        :isHoursView="currentView === 'hour'"
        
      />
    </TransitionGroup>
    <Timer
      v-if="hasTimer"
      v-model="dateObj"
      :color="btnColor"
      :isTwelveHrsView="isTwelveHrsView"
      @hour="toggleView('hour')"
      @minute="toggleView('minute')" 
    />
  </div>
</template>
<style>
.calendar-move, /* apply transition to moving elements */
.calendar-enter-active,
.calendar-leave-active,
.next-month-enter-active, 
.prev-month-enter-active, 
.next-month-leave-active, 
.prev-month-leave-active {
  @apply transition-all duration-150 ease-in-out;
}

.calendar-enter-from {
  @apply opacity-0 -translate-y-8;
}

.prev-month-enter-from {
  @apply opacity-0 translate-x-8;
}

.next-month-enter-from {
  @apply opacity-0 -translate-x-8;
}

.calendar-leave-from, 
.calendar-leave-to,
.prev-month-leave-from, 
.prev-month-leave-to,
.next-month-leave-from, 
.next-month-leave-to {
  @apply hidden;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.calendar-leave-active 
.next-month-leave-active 
.prev-month-leave-active {
  @apply w-full absolute;
}
</style>