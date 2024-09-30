<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { debounce } from 'lodash';
import { search } from '../../../composables/useFilter';
import { getFlatArr } from '../../../composables/useHelper';
import Dropdown from '../../dropdown/Dropdown.vue';
import ComboBoxMenu from './ComboBoxMenu.vue';
import ComboBoxSelector from './ComboBoxSelector.vue';

const props = defineProps({
  modelValue: [String, Object, Array],
  color: {
    type: String,
    default: 'theme-light',
  },
  options: {
    type: Array,
    default: () => [],
  },
  displayKey: String, // Required if options are objects
	recursiveKey: {
    type: String,
    default: 'children', // Required if options are recursive objects
  },
  taggable: Boolean,
})

const emit = defineEmits(['update:modelValue', 'select']);

const showDropdown = shallowRef(false);
const options = ref(props.options);
const searchValue = ref('');

// Options will not be recursive on search
const recursiveKey = computed(() => searchValue.value ? '' : props.recursiveKey);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const isMultiselect = computed(() => modelValue.value && modelValue.value.constructor === Array );

const selectedValue = computed(() => {

  if( !modelValue.value ) return;
  
  if( isMultiselect.value ) {
    return modelValue.value.map((value) => getLabel(value));
  }

  return [
    getLabel(modelValue.value)
  ]

})

const selectValue = (value) => {
  if( !isMultiselect.value ) {
    modelValue.value = value;
    showDropdown.value = false;
  }
  emit('select', value);
}

const open = () => {
  showDropdown.value = true;
  getOptions();
}

const getOptions = debounce(async() => {
  options.value = props.options;
  if(props.taggable) {
    // Flat an array If options are array of object and taggable prop is true
    options.value = await getFlatArr(options.value);
    options.value = options.value.map((option) => option[props.displayKey]);
  }
  options.value = await search(options.value, searchValue.value, props.displayKey, props.recursiveKey);
})

const getLabel = (option) => {
  return props.displayKey && typeof option === 'object' 
    ? option[props.displayKey].toString() 
    : option.toString();
}

const clear = () => {
  modelValue.value = isMultiselect.value ? [] : '';
  searchValue.value = '';
  getOptions();
}

const createTag = debounce((event) => {
  if( event.keyCode === 13 || event.keyCode === 188 ) {

    let trimSearchStr = searchValue.value.trim();
    let commaPos = trimSearchStr.search(',');
    let newTag = commaPos > -1 ? trimSearchStr.slice(0, commaPos) : trimSearchStr;

    modelValue.value = selectedValue.value;

    if( newTag && !modelValue.value.includes(newTag) ) {
      modelValue.value = [ ...modelValue.value, newTag ];
    }

    searchValue.value = '';
    getOptions();
  }
})

const removeTag = (index) => {
  modelValue.value.splice(index, 1);
  getOptions();
}

const bindEvents = computed(() => {
  let events = {
    onFocus: () => open(),
    onInput: () => getOptions(),
    onClear: () => clear(),
  }

  if( props.taggable ) {
    events.onKeyup = (event) => createTag(event);
    events.onRemove = (index) => removeTag(index);
  }

  return events;
});

onMounted(() => {
  getOptions();
})
</script>
<template>
  <Dropdown
    v-model="showDropdown"
    :items="options"
    :bgColor="color"
    controllable
  >
    <template #selector>
      <ComboBoxSelector
        v-model="searchValue"
        :selectedValue="selectedValue"
        :color="color"
        v-bind="bindEvents"
      />
    </template>
    <template #default>
      <ComboBoxMenu
				v-model="modelValue"
				:options="options"
				:color="color"
        :displayKey="displayKey" 
				:recursiveKey="recursiveKey"
        @select="selectValue" 
			/>
			<p v-if="options.length === 0" class="my-2 text-center">No records found</p>
    </template>
  </Dropdown>
</template>