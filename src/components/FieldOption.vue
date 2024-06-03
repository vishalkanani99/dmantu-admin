<script setup>
import { computed } from 'vue';
import '@/assets/css/field-option.css';

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  type: {
    type: String,
    default: "checkbox",
    validator: (value) => ["checkbox", "radio", "switch"].includes(value),
  },
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const inputType = computed(() =>
  props.type === "radio" ? "radio" : "checkbox"
);
</script>

<template>
  <label :class="type">
    <input
      v-model="computedValue"
      :type="inputType"
    />
    <span class="check" />
    <span class="pl-2">{{ label }}</span>
  </label>
</template>
