<script setup>
import { ref, shallowRef, computed, onMounted, reactive } from "vue";
import { debounce } from 'lodash';
import { mdiArrowUpBold, mdiArrowDownBold, mdiFolderSearch } from '@mdi/js';
import FieldOption from "../FieldOption.vue";
import Field from "../Field.vue";
import FieldGroup from "../FieldGroup.vue";
import DataTableRows from "./DataTableRows.vue";
import Pagination from '../Pagination.vue';
import { search as searchData, sort as sortColumn} from '../../composables/useFilter.js';

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: []
  },
  totalRecords: Number,
  limitOptions: {
    type: Array,
    default: [5, 10, 20, 30, 50],
  },
  recursiveKey: {
    type: String,
    default: 'children'
  },
  isCheckable: Boolean,
  isCollapsible: Boolean,
  isEditable: Boolean,
  isLoading: Boolean,
  isSsr: Boolean,
});

const emit = defineEmits(["update:modelValue", "update", "edit", "delete"]);


const sortField = ref('');
const rows = ref([]);
const isSsr = ref(props.isSsr);
const checkedAll = ref(false);

const sortableColumns = ref([]);
const searchableColumns = ref([]);

const config = reactive({
  page: 1,
  limit: 5, 
  search: '',
  searchBy: '',
  sortBy: [],
});

const activePageRows = computed(() => {
  if( props.isSsr ) {
    return props.data;
  }
  return rows.value;
});

const totalRecords = computed( () => props.totalRecords ?? props.data.length );
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const sort = (field) => {
  config.sortBy.map((arr) => {
    if( field === arr[0] ) {
      arr[1] = arr[1] === 'asc' ? 'desc' : 'asc';
    }
    return arr;
  })
  update();
}

const getRowsWithSeparateChild = (rows, selectedRows = []) => {
  for(let row of rows){
    selectedRows.push(row);
    if(row[props.recursiveKey]){
      selectedRows = getRowsWithSeparateChild(row[props.recursiveKey], selectedRows);
    }
  }
  return selectedRows;
}

const colspan = computed(() => props.columns.length + props.isCheckable + props.isCollapsible + props.isEditable);
const rowsWithSeparateChild = computed(() => getRowsWithSeparateChild(activePageRows.value));

const updateCheckedRows = () => {
  modelValue.value = [];
  if(checkedAll.value){
    modelValue.value =  rowsWithSeparateChild.value;
  }
}

const updateCheckedAll = (value) => {
  checkedAll.value = value.length === rowsWithSeparateChild.value.length ?? 0;
}

const updatePage = debounce(async () => {
  config.page = 1;
  update();
})

const update = debounce(async () => {
  emit('update', config);
  if(isSsr.value) { return; }
  rows.value = props.data;
  rows.value = await searchData(rows.value, config.search, config.searchBy, props.recursiveKey);
  rows.value = await sortColumn(rows.value, config.sortBy, props.recursiveKey);
  rows.value = await paginate();
  updateCheckedRows();
})

const paginate = async () => {
  const promises = rows.value.slice((config.page * config.limit) - config.limit, (config.page * config.limit));
  const results = await Promise.all(promises);
  return results;
}

const getSortableFieldOrder = (field) => {
  let order = config.sortBy.find((arr) => arr[0] === field );
  return order ? order[1] : '';
}

const initFilter = () => {
  sortableColumns.value = props.columns.filter((c) => c.sortable);
  searchableColumns.value = props.columns.filter((c) => c.searchable);

  // Sortable columns with sort order
  const sortArr = [];
  sortableColumns.value.forEach((col, index) => {
    const sortOrder = col.sortOrder ?? index;
    sortArr[sortOrder] = [col.key, col.orderBy];
  });
  config.sortBy = sortArr.filter((val) => val);
}

onMounted(() => {
  initFilter();
  update();
})
</script>

<template>
    <!-- Tools -->
  <div class="flex flex-col md:flex-row md:justify-between items-center">
    <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
      <Field
        v-if="limitOptions.length > 0"
        v-model="config.limit" 
        type="select"
        color="white"
        @input="updatePage"
      >
        <option v-for="value in limitOptions" :key="value" :value="value">{{ value }}</option>
      </Field>
      <FieldGroup>
        <Field
          v-model="config.search"
          type="text" 
          placeholder="Search"
          :inputLeftIcon="mdiFolderSearch"
          :left="searchableColumns.length > 0"
          color="white"
          @input="updatePage"
        />
        <Field 
          v-if="searchableColumns.length > 0" 
          v-model="config.searchBy" 
          type="select" 
          color="white"
          right
          @input="updatePage"
        >
          <option value="">Select Column</option>
          <option v-for="(col, index) in searchableColumns" :key="index" :value="col.key">{{ col.label }}</option>
        </Field>
      </FieldGroup>
      <FieldGroup class="md:hidden">
        <Field 
          v-if="sortField" 
          :left="sortField ? true : false" 
          type="button" 
          :buttonIcon="getSortableFieldOrder(sortField) === 'asc' ? mdiArrowDownBold : mdiArrowUpBold" 
          @buttonClick="sort(sortField)"
        />
        <Field 
          v-model="sortField" 
          type="select"
          color="white" 
          :right="sortField ? true : false"
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
      <slot name="toolsLeftSlot"></slot>
    </div>
    <div class="flex mt-3">
      <slot name="toolsRightSlot"></slot>
    </div>
  </div>
  <!-- End Tools -->
  <table v-if="columns">
    <thead>
      <tr>
        <th v-if="isCollapsible"></th>
        <th v-if="isCheckable">
          <span class="center">
            <FieldOption
              v-if="activePageRows.length > 0"
              v-model="checkedAll"
              @change="updateCheckedRows"
            />
          </span>
        </th>
        <template v-for="(col, index) in columns" :key="index">
          <th 
            v-if="col.sortable"
            :class="[
              'relative cursor-pointer sortable', 
              getSortableFieldOrder(col.key) === 'asc' ? 'asc' : '',  
              getSortableFieldOrder(col.key) === 'desc' ? 'desc' : ''
            ]"
            @click="sort(col.key)" 
          >
            {{ col.label }}
          </th>
          <th v-else>
            {{ col.label }}
          </th>
        </template>
        <th v-if="isEditable"></th>
      </tr>
    </thead>
    <tbody :class="{'relative': isLoading}">
      <div v-if="isLoading" class="absolute inset-0 flex bg-theme-300 z-10 opacity-50">
        <img class="w-8 h-8 m-auto" src="/loader.gif">
      </div>
      <DataTableRows
        v-model="modelValue"
        :rows="activePageRows"
        :columns="columns"
        :isCheckable="isCheckable"
        :isCollapsible="isCollapsible"
        :isEditable="isEditable"
        @edit="(value) => $emit('edit', value)"
        @delete="(value) => $emit('delete', value)"
        @update:modelValue="updateCheckedAll"
      >
        <template #columns="{ row, columns }">
          <slot name="columns" :row="row" :columns="columns"></slot>
        </template>
      </DataTableRows>
      <template v-if="activePageRows.length === 0">
        <slot name="empty">
          <tr>
            <td :colspan="colspan" class="justify-center">
              <p class="text-center">No records found</p> 
            </td>
          </tr>
        </slot>
      </template>
    </tbody>
  </table>
  <Pagination 
    v-if="activePageRows.length > 0"
    v-model="config.page"
    :limit="config.limit"
    :recordsTotal="totalRecords"
    @update:modelValue="update"
  >
  </Pagination>
</template>
