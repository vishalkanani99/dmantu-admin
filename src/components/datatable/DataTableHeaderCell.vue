<script setup>
import { computed } from "vue";
import TableHeaderCell from "../table/TableHeaderCell.vue";

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  sortable: Boolean,
});

const emit = defineEmits(['sort']);

const bindProps = computed(() => {
  let cellProps = {};
  if( props.sortable ) {
    cellProps.onClick = () => emit('sort');
  }
  return cellProps;
})

const cellStyle = computed(() => {
  let style = [
    'relative cursor-pointer',
  ];
  if( props.sortable ){
    style = [
      ...style,
      'before:content-["▴"] before:absolute before:h-0 before:w-0 before:right-4 before:top-[20%]',
      'after:content-["▾"] after:absolute after:h-0 after:w-0 after:right-4 after:bottom-[65%]',
    ]
  }
  return style;
})
</script>

<template>
  <TableHeaderCell
    v-bind="bindProps" 
    :class="cellStyle" 
  >
    <slot>{{ label }}</slot>
  </TableHeaderCell>
</template>
