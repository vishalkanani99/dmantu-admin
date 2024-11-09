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
});

const emit = defineEmits(['next', 'prev', 'toggleMonth', 'toggleYear']);

const monthStr = computed(() => l10n.months.longhand[props.month].toString());
const yearStr = computed(() => props.year.toString());
</script>
<template>
  <div class="flex items-center justify-between">
    <Button class="!p-1" rounded outline @click="$emit('prev')">
      <Icon class="w-4 h-4" :path="mdiArrowLeft" />
    </Button>
    <div class="flex items-center gap-2">
      <Button :label="monthStr" outline rounded @click="$emit('toggleMonth')" />
      <Button :label="yearStr" outline rounded @click="$emit('toggleYear')" />
    </div>
    <Button class="!p-1" rounded outline @click="$emit('next')">
      <Icon class="w-4 h-4" :path="mdiArrowRight" />
    </Button>
  </div>
</template>