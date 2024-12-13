<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue';
import { getDefaultTextStyle } from '../../color';
import { formatDate } from './utils';
import { useScreen } from '../../composables/useScreen';
import { useScrollOver } from '../../composables/useScrollOver';
import Field from '../form/Field.vue';
import Calendar from './calendar/Calendar.vue';
import DropdownContainer from '../dropdown/DropdownContainer.vue';
import Modal from '../Modal.vue';
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
  hasModalView: Boolean,
});

const { isSm, isXs } = useScreen();

const emit = defineEmits(['update:modelValue']);

const containerRef = ref();
const dropdownContainerHeight = ref(0);
const { visibleAtBottom } = useScrollOver(containerRef, dropdownContainerHeight);

const dateObj = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const formattedDate = ref(formatDate(props.modelValue, props.format));

const showCalendar = shallowRef(false);
const btnColor = computed(() => getDefaultTextStyle(props.calendarColor).type);

const typeOfComponent = computed(() => props.hasModalView ? Modal : DropdownContainer );
const bindProps = computed(() => {
  let componentProps = {
    bgColor: props.calendarColor,
    maxHeight: true,
  };

  if(props.hasModalView) {
    componentProps = {
      color: props.calendarColor,
      size: isSm.value || isXs.value ? 'large' : 'small',
      origin: isSm.value || isXs.value ? 'bottom' : 'center',
      noHeader: true,
      noFooter: true,
      noPadding: true,
      centered: true,
      closable: false,
      scrollable: true,
    }
  } else {
    componentProps.onEnter = dropdownContainerRef;
    componentProps.onAfterLeave = dropdownContainerRef;
    componentProps.position = visibleAtBottom.value ? 'bottom' : 'top';
  }

  return componentProps;
});

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

const dropdownContainerRef = (el) => {
  dropdownContainerHeight.value = el ? el.clientHeight : 0;
}

const trackClickEvent = (el) => {
  const isElementExist = document.body.contains(el.target);
  if(!isElementExist || !containerRef.value) return;
  if(containerRef.value.contains(el.target)) return;
  showCalendar.value = false;
}

onMounted(() => {
  document.addEventListener('click', trackClickEvent);
})
</script>
<template>
  <div ref="containerRef" class="relative select-none">
    <Field 
      v-model="formattedDate"
      :color="inputColor"  
      @focus="toggle"
    />
    <component
      :is="typeOfComponent"
      v-model="showCalendar"
      v-bind="bindProps"
    >
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
        <template #header>
          <span class="my-2 font-bold">{{ formattedDate }}</span>
        </template>
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
    </component>
  </div>
</template>