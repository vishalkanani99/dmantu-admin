<script setup>
import { shallowRef, computed } from 'vue';
import { mdiTrashCan, mdiPencil, mdiChevronRight } from '@mdi/js';
import DataTableRows from './DataTableRows.vue';
import FieldOption from "../form/FieldOption.vue";
import Avatar from "../Avatar.vue";
import Button from "../Button.vue";

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  row: {
    type: Object,
    default: () => {}
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

const showChildRows = shallowRef(false);
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const toggleRow = () => {
  showChildRows.value = !showChildRows.value;
}

</script>
<template>
  <tr>    
    <slot :row="row">
      <td v-if="isCollapsible" class="justify-center md:w-9">
        <div v-if="row[recursiveKey]" class="center">
          <Button
            :class="[
              'transition-transform',
              showChildRows ? 'rotate-90' : 'rotate-0',
            ]" 
            :iconPath="mdiChevronRight" 
            rounded
            @click="toggleRow" 
          />
        </div>
      </td>
      <td v-if="isCheckable" class="justify-center md:w-16">
        <span class="center">
          <FieldOption
            v-model="modelValue"
            :value="row"
          />
        </span>
      </td>
      <td
        v-for="(col, index) in columns" 
        :key="index"
        :data-label="col.label"
      >
        <div v-if="col.imageable" class="center">
          <Avatar
            class="w-12 h-12"
            username="Not Available"
            :avatar="row[col.src]"
          />
        </div>
        <span v-else>{{ row[col.key] }}</span>
      </td>
      <td v-if="isEditable" class="justify-center">
        <div class="center">
          <Button :iconPath="mdiPencil" color="info" @click="$emit('edit', row)"></Button>
          <Button :iconPath="mdiTrashCan" color="danger" @click="$emit('delete', row)"></Button>
        </div>
      </td>
    </slot>
  </tr>
  <slot name="afterRow" :row="row">
    <DataTableRows 
      v-if="row[recursiveKey] && showChildRows"
      v-model="modelValue"
      :rows="row[recursiveKey]"
      :columns="columns"
      :isCheckable="isCheckable"
      :isCollapsible="isCollapsible"
      :isEditable="isEditable"
      @edit="(value) => $emit('edit', value)"
      @delete="(value) => $emit('edit', value)"
    >
      <template #columns="{ row, columns }">
        <slot name="columns" :row="row" :columns="columns"></slot>
      </template>
    </DataTableRows>
  </slot>
</template>