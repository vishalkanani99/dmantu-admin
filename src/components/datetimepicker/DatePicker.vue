<script setup>
import { computed, ref, shallowRef } from 'vue';
import { formatDate } from './utils';
import Field from '../form/Field.vue';
import Calendar from './calendar/Calendar.vue';

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => {
      return new Date();
    }
  },
  format: {
    type: String,
    default: 'Y-m-d',
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

const formattedDate = ref(formatDate(props.modelValue, props.format));

const showCalendar = shallowRef(false);

const open = (el) => {
  el.target.blur();
  showCalendar.value = true;
}

const close = () => {
  formattedDate.value = formatDate(dateObj.value, props.format);
  showCalendar.value = false;
}
</script>
<template>
  <div>
    <Field 
      v-model="formattedDate"  
      @focus="open"
    />
    <Calendar 
      v-if="showCalendar" 
      v-model="dateObj"
      :firstDayOfWeek="firstDayOfWeek"
      :prependYears="prependYears" 
      :appendYears="appendYears"
      @update:modelValue="close" 
    />
  </div>
</template>