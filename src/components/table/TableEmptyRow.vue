<script setup>
import TableRow from "./TableRow.vue";
import TableCell from "./TableCell.vue";

const props = defineProps({
  text: {
    type: String,
    default: "No records found",
  },
  bgColor: String, 
  colspan: Number,
});

</script>

<template>
  <TableRow :bgColor="bgColor">
    <TableCell :colspan="colspan" class="justify-center">
      <slot>
        <p class="text-center">{{ text }}</p>
      </slot>
    </TableCell>
  </TableRow>
</template>
