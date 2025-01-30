<script setup>
import { computed, ref } from 'vue';
import { mdiStar } from '@mdi/js';
import Icon from '../Icon.vue';

const props = defineProps({
  modelValue: Number,
  max: {
    type: Number,
    default: 5,
    validator(value, props) {
      return props.modelValue <= value;
    }
  },
  color: {
    type: String,
    default: 'warning',
  },
  colorOnUncheck: {
    type: String,
    default: 'gray',
  },
  iconPath: String,
  readOnly: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const prevValue = ref(props.modelValue);
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const halfStarWidth = computed(() => (modelValue.value * 100) / props.max );
const iconPath = computed(() => props.iconPath ?? mdiStar );

const setPreviousValue = (value) => {
  if(props.readOnly) return;
  prevValue.value = value;
}
const update = (value) => {
  if(props.readOnly) return;
  modelValue.value = value;
  setPreviousValue(value);
}
</script>
<template>
  <div class="flex items-center">
    <div 
      class="relative inline-flex transition-all select-none"
      v-for="(star) in max"
    >
      <Icon
        :class="[
          readOnly ? 'pointer-events-none' : 'cursor-pointer',
        ]"
        :key="star"
        :path="iconPath"
        :color="prevValue >= star ? color : colorOnUncheck"
        @mouseover="setPreviousValue(star)"
        @mouseleave="setPreviousValue(modelValue)"
        @click="update(star)" 
      />
      <div
        v-if="!Number.isInteger(prevValue) && Math.ceil(prevValue) === star" 
        class="absolute top-0 left-0 overflow-hidden" 
        :style="{ width: `${halfStarWidth}%` }"
      >
        <Icon
          :class="[
            readOnly ? 'pointer-events-none' : 'cursor-pointer',
          ]"
          :key="star"
          :path="iconPath"
          :color="color"
          @mouseover="setPreviousValue(star)"
          @mouseleave="setPreviousValue(modelValue)"
          @click="update(star)" 
        />
      </div>
    </div>
  </div>
</template>