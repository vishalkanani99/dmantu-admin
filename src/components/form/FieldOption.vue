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
  label: String,
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
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
      v-model="modelValue"
      v-bind="$attrs"
      :type="inputType"
    />
    <span class="check" />
    <span v-if="label" :class="{ 'label pl-2': label }">{{ label }}</span>
  </label>
</template>
