<script setup>
import { shallowRef, computed } from 'vue';
import Dropdown from '../dropdown/Dropdown.vue';
import MenuListItem from '../menu/MenuListItem.vue';

const props = defineProps({
  modelValue: String,
  color: String,
  options: {
    type: Array,
    default: () => [],
  },
  displayKey: String,
})

const emit = defineEmits(['update:modelValue', 'select']);

const showDropdown = shallowRef(false);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const selectValue = (value) => {
  modelValue.value = getLabel(value);
  emit('select', value);
  toggle();
}

const toggle = () => {
  showDropdown.value = !showDropdown.value;
}

const getLabel = (option) => {
  return props.displayKey ? option[props.displayKey].toString() : option.toString();
}
</script>
<template>
  <Dropdown
    v-model="showDropdown"
    :items="options"
    :bgColor="color"
    scrollable
    controllable
  >
    <template #selector>
      <MenuListItem
        class="h-10 border border-[--color-inverse]" 
        :label="modelValue"
        :isOpen="showDropdown"
        :color="color"
        size="small"
        hasMenu 
        @click="toggle" 
      />
    </template>
    <template #item="{ item, key }">
      <MenuListItem 
        :label="getLabel(item)"
        :color="color"
        size="small"
        :isActive="modelValue === getLabel(item)"
        @click="selectValue(item, key)" 
      />
    </template>
  </Dropdown>
</template>