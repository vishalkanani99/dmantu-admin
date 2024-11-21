<script setup>
import { computed } from 'vue';
import { l10n } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: Date,
  btnColor: String,
});

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue',value);
  }
});

const setMonth = (month) => {
  modelValue.value.setMonth(month);
  modelValue.value = modelValue.value;
}

const isActiveMonth = (month) => {
  return l10n.months.longhand[modelValue.value.getMonth()] === month;
}
</script>
<template>
  <div class="grid grid-cols-[repeat(3,_min-content)] justify-around w-full gap-2">
    <div 
      class="flex justify-center items-center" 
      v-for="(month, index) in l10n.months.longhand" :key="index"
    >
      <Button class="w-full" :color="btnColor" :label="month" :outline="!isActiveMonth(month)" @click="setMonth(index)" />
    </div>
  </div>
</template>