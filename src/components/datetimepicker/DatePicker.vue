<script setup>
import { computed, ref, shallowRef } from 'vue';
import { getDefaultTextStyle } from '../../color';
import { formatDate } from './utils';
import Field from '../form/Field.vue';
import Calendar from './calendar/Calendar.vue';
import Dropdown from '../dropdown/Dropdown.vue';

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
  },
  inputColor: {
    type: String,
    default: 'theme-light',
  },
  calendarColor: {
    type: String,
    default: 'theme',
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
const btnColor = computed(() => getDefaultTextStyle(props.calendarColor).type);

const toggle = (el) => {
  el.target.blur();
  showCalendar.value = !showCalendar.value;
}

const close = (newDateObj) => {
  formattedDate.value = formatDate(newDateObj, props.format);
  showCalendar.value = false;
}
</script>
<template>
  <Dropdown
    v-model="showCalendar"
    :bgColor="calendarColor"
    controllable
    maxHeight
  >
    <template #selector>
      <Field 
        v-model="formattedDate"
        :color="inputColor"  
        @focus="toggle"
      />
    </template>
    <Calendar 
      class="p-2" 
      v-model="dateObj"
      :firstDayOfWeek="firstDayOfWeek"
      :prependYears="prependYears" 
      :appendYears="appendYears"
      :btnColor="btnColor"
      @update:modelValue="close" 
    />
  </Dropdown>
</template>