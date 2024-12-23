<script setup>
import { shallowRef, computed } from "vue";
import FieldOption from "../form/FieldOption.vue";
import TableHeader from "../table/TableHeader.vue";
import TableRow from "../table/TableRow.vue";
import DataTableHeaderCell from "./DataTableHeaderCell.vue";

const props = defineProps({
  modelValue: Boolean,
  columns: {
    type: Array,
    default: []
  },
  sortBy: {
    type: Array,
    default: []
  },
  isCheckable: Boolean,
  isCollapsible: Boolean,
  isEditable: Boolean,
});

const emit = defineEmits(["update:modelValue", "updateCheckedRows", 'sort']);

const sortBy = computed(() => props.sortBy);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const getSortableItemColor = (colKey) => {
  let itemColor = ''; 
  let sortableCols = sortBy.value.filter((col) => col[0] === colKey);
  if(sortableCols.length > 0){
    if( sortableCols[0][1] === 'asc' ) {
      itemColor = 'after:opacity-60';
    }
    if( sortableCols[0][1] === 'desc' ) {
      itemColor = 'before:opacity-60';
    }
  }
  return itemColor;
}

const update = (e) => {
  emit('updateCheckedRows', e);
}
</script>

<template>
  <TableHeader>
    <TableRow>
      <DataTableHeaderCell v-if="isCollapsible" />
      <DataTableHeaderCell v-if="isCheckable">
        <span class="flex justify-center items-center space-x-2">
          <FieldOption
            v-model="modelValue"
            :true-value="true"
            :false-value="false"
            @change="update"
          />
        </span>
      </DataTableHeaderCell>
      <DataTableHeaderCell
        v-for="(col, index) in columns"
        :class="getSortableItemColor(col.key)" 
        :sortable="col.sortable"
        :label="col.label"
        :key="index"
        @sort="$emit('sort', col.key)" 
      />
      <DataTableHeaderCell v-if="isEditable" />
    </TableRow>
  </TableHeader>
</template>
