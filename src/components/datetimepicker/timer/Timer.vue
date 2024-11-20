<script setup>
import { computed, shallowRef } from 'vue';
import { mdiArrowRight, mdiArrowLeft } from '@mdi/js';
import Button from '../../Button.vue';
import Icon from '../../Icon.vue';
import { formatDate, toStr, pad } from '../utils';
import Field from '../../form/Field.vue';

const props = defineProps({
  modelValue: Date,
  color: String,
  isTwelveHrsView: Boolean,
});

const emit = defineEmits(['update:modelValue', 'hour', 'minute']);

const timePeriod = shallowRef(formatDate(props.modelValue, 'K'));

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const setTime = () => {
  timePeriod.value = timePeriod.value === 'AM' ? 'PM' : 'AM';

  let hours = modelValue.value.getHours();
  hours = hours % 12;
  hours = timePeriod.value === 'PM' ? hours + 12 : hours;

  modelValue.value.setHours(parseInt(hours));
  modelValue.value = modelValue.value;
}

const hourStr = computed(() => {
  let hrFormat = props.isTwelveHrsView ? 'h' : 'H';
  let hours = formatDate(modelValue.value, hrFormat);
  return toStr(pad(hours));
});

const minutesStr = computed(() => toStr(pad(modelValue.value.getMinutes())));

</script>
<template>
  <div class="flex justify-center items-center my-4">
    <Button
      :label="hourStr"
      :color="color"
      @click="$emit('hour')" 
    />
    <span class="mx-4">:</span>
    <Button
      :label="minutesStr"
      :color="color"
      @click="$emit('minute')" 
    />
    <Button
      v-if="isTwelveHrsView"
      class="ml-4"
      :label="timePeriod"
      :color="color"
      @click="setTime()" 
    />
  </div>
</template>