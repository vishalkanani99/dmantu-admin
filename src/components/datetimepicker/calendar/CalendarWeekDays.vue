<script setup>
import { computed } from 'vue';
import { l10n } from '../utils';

const props = defineProps({
  firstDayOfWeek: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['']);

const buildWeekDays = computed(() => {
  let days = l10n.weekdays.shorthand.slice();

  if (props.firstDayOfWeek > 0 && props.firstDayOfWeek < days.length) {
    days = [].concat(days.splice(props.firstDayOfWeek, days.length), days.splice(0, props.firstDayOfWeek));
  }

  return days;
});
</script>
<template>
  <div class="grid grid-cols-[repeat(7,_min-content)] justify-around gap-2">
    <div 
      class="flex justify-center items-center w-10 h-10" 
      v-for="(day, index) in buildWeekDays" :key="index"
    >
      <span>{{ day }}</span>
    </div>
  </div>
</template>