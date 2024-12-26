<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { search } from '../../composables/useFilter';
import Dropdown from '../dropdown/Dropdown.vue';
import MenuListItem from '../menu/MenuListItem.vue';
import Field from './Field.vue';

const props = defineProps({
  modelValue: String,
  color: {
    type: String,
    default: 'theme',
  },
  options: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
  displayKey: String,
  fieldProps: {
    type: Object,
    default(rawProps) {
      return {
        color: rawProps.color,
      }
    },
  },
})

const emit = defineEmits(['update:modelValue', 'select']);

const showDropdown = shallowRef(false);
const options = ref(props.options);
const selectedValue = ref('');

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const selectValue = (value) => {
  modelValue.value = selectedValue.value = getLabel(value);
  showDropdown.value = false;
  emit('select', value);
}

const open = () => {
  showDropdown.value = true;
  getOptions();
}

const close = (value) => {
  if(!value) {
    modelValue.value = selectedValue.value;
  }
}

const getOptions = async() => {
  options.value = await search(props.options, modelValue.value, props.displayKey);
}

const getLabel = (option) => {
  return props.displayKey ? option[props.displayKey].toString() : option.toString();
}

onMounted(() => {
  getOptions();
  selectedValue.value = props.modelValue;
})
</script>
<template>
  <Dropdown
    v-model="showDropdown"
    :items="options"
    :bgColor="color"
    @update:modelValue="close"
    controllable
  >
    <template #selector>
      <Field
        v-model="modelValue"
        v-bind="fieldProps"
        @input="getOptions" 
        @focus="open" 
      />
    </template>
    <template #item="{ item, key }">
      <MenuListItem 
        :label="getLabel(item)"
        :color="color"
        :isActive="selectedValue === getLabel(item)"
        @click="selectValue(item, key)" 
      />
    </template>
    <p v-if="options.length === 0" class="my-2 text-center">No records found</p>
  </Dropdown>
</template>