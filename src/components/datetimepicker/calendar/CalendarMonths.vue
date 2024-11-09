<script setup>
import { computed } from 'vue';
import { l10n } from '../utils';
import Button from '../../Button.vue';

const props = defineProps({
  modelValue: Number,
});

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue',value);
  }
});

const setMonth = (month) => {
  modelValue.value = month;
}

</script>
<template>
  <div class="grid grid-cols-[repeat(3,_min-content)] justify-around gap-2">
    <div 
      class="flex justify-center items-center" 
      v-for="(month, index) in l10n.months.longhand" :key="index"
    >
      <Button class="w-full" :label="month" outline @click="setMonth(index)" />
    </div>
  </div>
</template>