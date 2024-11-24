<script setup>
import { computed, ref, shallowRef } from 'vue';
import { getDefaultTextStyle } from '../../color';
import { formatDate } from './utils';
import Field from '../form/Field.vue';
import Calendar from './calendar/Calendar.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import Button from '../Button.vue';

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
      // The value must match one of these strings
      return props.maxDate > value;
    }
  },
  maxDate: {
    type: Date,
    validator(value, props) {
      // The value must match one of these strings
      return props.minDate < value;
    }
  },
  disabled: Array,
  format: {
    type: String,
    default: 'Y-m-d h:i K',
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
  },
  hasTimer: {
    type: Boolean,
    default: true,
  },
  isTwelveHrsView: {
    type: Boolean,
    default: true,
  },
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

const formatDateObj = (newDateObj) => {
  formattedDate.value = formatDate(newDateObj, props.format);
}

const close = () => {
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
      class="w-full p-2" 
      v-model="dateObj"
      :minDate="minDate"
      :maxDate="maxDate"
      :disabled="disabled"
      :firstDayOfWeek="firstDayOfWeek"
      :prependYears="prependYears" 
      :appendYears="appendYears"
      :btnColor="btnColor"
      :hasTimer="hasTimer"
      :isTwelveHrsView="isTwelveHrsView"
      @update:modelValue="formatDateObj" 
    >
      <template #footer>
        <Button 
          class="mb-2" 
          label="Done" 
          :color="btnColor"
          rounded
          @click="close" 
        />
      </template>
    </Calendar>
  </Dropdown>
</template>