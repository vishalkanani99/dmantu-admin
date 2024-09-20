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
  }
})

const emit = defineEmits(['update:modelValue']);

const showDropdown = shallowRef(false);
const itemIndex = shallowRef();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const selectValue = (value, index) => {
  modelValue.value = value;
  itemIndex.value = index;
  toggle();
}

const toggle = () => {
  showDropdown.value = !showDropdown.value;
}
</script>
<template>
  <Dropdown
    v-model="showDropdown"
    :items="options"
    :bgColor="color"
    controllable
  >
    <template #selector>
      <MenuListItem
        class="h-10" 
        :label="modelValue"
        :isOpen="showDropdown"
        :color="color"
        hasMenu 
        @click="toggle" 
      />
    </template>
    <template #item="{ item, key }">
      <MenuListItem 
        :label="item"
        :color="color"
        :isActive="item === modelValue && itemIndex === key"
        @click="selectValue(item, key)" 
      />
    </template>
  </Dropdown>
</template>