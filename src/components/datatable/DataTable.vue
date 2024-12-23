<script setup>
import { ref, shallowRef, computed, onMounted, reactive } from "vue";
import { useDebounce } from "../../composables/useDebounce.js";
import Loader from "../Loader.vue";
import Table from "../table/Table.vue";
import TableBody from "../table/TableBody.vue";
import TableEmptyRow from "../table/TableEmptyRow.vue";
import DataTableTools from "./DataTableTools.vue";
import DataTableHeader from "./DataTableHeader.vue";
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
  bgColor: {
    type: String,
    default: 'theme'
  },
  activeColor: String,
  borderColor: {
    type: String,
    default: 'theme-light'
  },
  isCheckable: Boolean,
  isNestedSort: Boolean,
  isCollapsible: Boolean,
  isEditable: Boolean,
  isLoading: Boolean,
  isSsr: Boolean,
});

const emit = defineEmits(["update:modelValue", "update", "edit", "delete"]);

const rows = ref([]);
const totalRows = ref(props.data.length);
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
  sortField: '',
});

const activePageRows = computed(() => {
  if( props.isSsr ) {
    return props.data;
  }
  return rows.value;
});

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const totalRecords = computed({
  get: () => props.isSsr ? props.totalRecords : totalRows.value,
  set: (value) => {
    totalRows.value = value;
  },
});

const sort = (field = '') => {

  sortableColumns.value = sortableColumns.value.map((obj) => {
    if( field === obj.key ) {
      obj.orderBy = obj.orderBy === 'asc' ? 'desc' : 'asc';
    }
    return obj;
  });

  // Sortable columns with sort order
  const sortableArr = 
    props.isNestedSort 
      ? sortableColumns.value 
      : sortableColumns.value.filter((obj, index) => field ? field === obj.key : index === 0 );

  const sortArr = [];

  sortableArr.forEach((col, index) => {
    const sortOrder = col.sortOrder ?? index;
    sortArr[sortOrder] = [col.key, col.orderBy];
  });

  config.sortBy = sortArr.filter((val) => val);

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

const updatePage = useDebounce(async () => {
  config.page = 1;
  update();
})

const update = useDebounce(async () => {
  emit('update', config);
  if(isSsr.value) { return; }
  rows.value = props.data;
  rows.value = await searchData(rows.value, config.search, config.searchBy, props.recursiveKey);
  totalRecords.value = rows.value.length;
  rows.value = await sortColumn(rows.value, config.sortBy, props.recursiveKey);
  rows.value = await paginate();
  updateCheckedRows();
})

const paginate = async () => {
  const promises = rows.value.slice((config.page * config.limit) - config.limit, (config.page * config.limit));
  const results = await Promise.all(promises);
  return results;
}

const initFilter = () => {
  sortableColumns.value = props.columns.filter((c) => c.sortable);
  searchableColumns.value = props.columns.filter((c) => c.searchable);
  sort();
}

onMounted(() => {
  initFilter();
})
</script>

<template>
  <!-- Tools -->
  <DataTableTools
    :config="config"
    :limitOptions="limitOptions"
    :searchableColumns="searchableColumns"
    :sortableColumns="sortableColumns"
    @update="updatePage"
    @sort="sort" 
  />
  <Table
    :bgColor="bgColor"
    :borderColor="borderColor"
  >
    <DataTableHeader
      v-model="checkedAll"
      :columns="columns"
      :sortBy="config.sortBy"
      :isCheckable="isCheckable"
      :isCollapsible="isCollapsible"
      :isEditable="isEditable"
      @sort="sort"
      @updateCheckedRows="updateCheckedRows"
    />
    <TableBody>
      <Loader :bgColor="bgColor" v-if="isLoading" />
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
      <TableEmptyRow
        v-if="activePageRows.length === 0"
        :colspan="colspan" 
      >
        <slot name="empty"></slot>
      </TableEmptyRow>
    </TableBody>
  </Table>
  <Pagination 
    v-if="activePageRows.length > 0"
    v-model="config.page"
    :color="bgColor"
    :activeColor="activeColor"
    :limit="config.limit"
    :recordsTotal="totalRecords"
    @update:modelValue="update"
  >
  </Pagination>
</template>
