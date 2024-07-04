<script setup>
import { computed } from 'vue';
import DataTableRow from './DataTableRow.vue';

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  rows: {
    type: Array,
    default: () => []
  },
  recursiveKey: {
    type: String,
    default: 'children'
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  isCheckable: Boolean,
  isCollapsible: Boolean,
  isEditable: Boolean,
});

const emit = defineEmits(["update:modelValue", "edit", "delete"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
 
</script>
<template>
  <DataTableRow 
    v-for="(row, index) in rows"
    v-model="modelValue" 
    :key="index"
    :row="row"
    :columns="columns"
    :isCheckable="isCheckable"
    :isCollapsible="isCollapsible"
    :isEditable="isEditable"
    @edit="(value) => $emit('edit', value)"
    @delete="(value) => $emit('edit', value)"
  >
    <template #default="{ row }">
      <slot name="columns" :row="row" :columns="columns"></slot>
    </template>
    <template #afterRow="{ row }">
      <slot name="afterRow" :row="row" :columns="columns"></slot>
    </template>
  </DataTableRow>
</template>