<script setup>
import { ref, shallowRef, computed } from "vue";
import { mdiArrowUpBold, mdiArrowDownBold, mdiFolderSearch } from '@mdi/js';
import FieldGroup from "../form/FieldGroup.vue";
import Field from "../form/Field.vue";

const props = defineProps({
  color: String,
  btnColor: String,
  config: {
    type: Object,
    required: true,
  },
  limitOptions: {
    type: Array,
    default: []
  },
  searchableColumns: {
    type: Array,
    default: []
  },
  sortableColumns: {
    type: Array,
    default: []
  },
});

const emit = defineEmits(["update", "sort"]);

const getSortableFieldOrder = (colKey) => {
  let sortableField = props.config.sortBy.find((col) => col[0] === colKey);
  return sortableField ? sortableField[1] : '';
}
</script>

<template>
  <div class="flex flex-col md:flex-row md:justify-between items-center">
    <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
      <Field
        v-model="config.limit" 
        type="select"
        :color="color"
        outerStyle="w-1/6"
        @input="$emit('update')"
      >
        <option 
          v-for="value in limitOptions" 
          :key="value" 
          :value="value"
        >
          {{ value }}
        </option>
      </Field>
      <FieldGroup multiFields>
        <Field
          v-model="config.search"
          type="text" 
          placeholder="Search"
          :inputLeftIcon="mdiFolderSearch"
          :left="searchableColumns.length > 0"
          :color="color"
          @input="$emit('update')"
        />
        <Field 
          v-model="config.searchBy" 
          type="select" 
          :color="color"
          right
          outerStyle="w-1/2"
          @input="$emit('update')"
        >
          <option value="">Select Column</option>
          <option 
            v-for="(col, index) in searchableColumns" 
            :key="index" 
            :value="col.key"
          >
            {{ col.label }}
          </option>
        </Field>
      </FieldGroup>
      <FieldGroup multiFields class="md:hidden">
        <Field 
          v-if="config.sortField" 
          :left="config.sortField ? true : false" 
          type="button" 
          :buttonIcon="getSortableFieldOrder(config.sortField) === 'asc' ? mdiArrowDownBold : mdiArrowUpBold"
          :color="btnColor" 
          @click="$emit('sort', config.sortField)"
        />
        <Field 
          v-model="config.sortField" 
          type="select"
          :color="color" 
          :right="config.sortField ? true : false"
        >
          <option value="">Sort By</option>
          <option v-for="(col, index) in sortableColumns" :key="index" :value="col.key">
              {{ col.label }}
              <template>
                  {{ getSortableFieldOrder(col.key) === 'asc' ? ' - ↑ (desc)' : ' - ↓ (asc)'}} 
              </template>
          </option>
        </Field>
      </FieldGroup>
    </div>
  </div>
</template>
