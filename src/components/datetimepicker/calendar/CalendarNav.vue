<script setup>
import { computed } from 'vue';
import { mdiArrowRight, mdiArrowLeft } from '@mdi/js';
import Button from '../../Button.vue';
import Icon from '../../Icon.vue';
import { l10n } from '../utils';

const props = defineProps({
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  month: {
    type: Number,
    default: new Date().getMonth(),
  },
  btnColor: String,
});

const emit = defineEmits(['next', 'prev', 'toggleMonth', 'toggleYear']);

const monthStr = computed(() => l10n.months.longhand[props.month].toString());
const yearStr = computed(() => props.year.toString());
</script>
<template>
  <div class="flex items-center justify-between mt-2 mb-4">
    <Button class="!p-1" :color="btnColor" rounded outline @click="$emit('prev')">
      <Icon class="w-4 h-4" :path="mdiArrowLeft" />
    </Button>
    <div class="flex items-center gap-2">
      <Button :color="btnColor" :label="monthStr" outline rounded @click="$emit('toggleMonth')" />
      <Button :color="btnColor" :label="yearStr" outline rounded @click="$emit('toggleYear')" />
    </div>
    <Button class="!p-1" :color="btnColor" rounded outline @click="$emit('next')">
      <Icon class="w-4 h-4" :path="mdiArrowRight" />
    </Button>
  </div>
</template>