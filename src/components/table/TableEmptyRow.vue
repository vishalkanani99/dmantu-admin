<script setup>
import TableRow from "./TableRow.vue";
import TableCell from "./TableCell.vue";

const props = defineProps({
  text: {
    type: String,
    default: "No records found",
  },
  color: String, 
  colspan: Number,
});

</script>

<template>
  <TableRow :color="color">
    <TableCell :colspan="colspan" class="justify-center">
      <slot>
        <p class="text-center">{{ text }}</p>
      </slot>
    </TableCell>
  </TableRow>
</template>
