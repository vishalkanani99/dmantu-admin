<script setup>
import { ref, shallowRef, computed } from 'vue';
import { mdiCircleMedium } from '@mdi/js';
import { theme } from '../../../color';
import Icon from '../../Icon.vue';
import FieldOption from '../FieldOption.vue';
import Menu from '../../menu/Menu.vue';
import MenuListItem from '../../menu/MenuListItem.vue';

const props = defineProps({
  modelValue: [String, Object, Array],
  color: String,
  options: {
    type: Array,
    default: () => [],
  },
  displayKey: String,
  recursiveKey: {
    type: String,
    default: 'children',
  },
  optionTree: {
    type: Number,
    default: 0,
  },
  isMultiselect: Boolean,
})

const emit = defineEmits(['update:modelValue', 'select']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const MenuListItemRootEl = computed(() => props.isMultiselect ? 'label' : null);

const options = computed( () => props.options);

const selectValue = (value) => {
  emit('select', value);
}

const getLabel = (option) => {
  return props.displayKey && typeof option === 'object' 
    ? option[props.displayKey].toString() 
    : option.toString();
}

const isSelectedValue = (item) => {
  if( props.isMultiselect ) return;
  return getLabel(modelValue.value) === getLabel(item);
}
</script>
<template>
  <Menu 
    :color="color"
    :items="options"
  >
    <template #default="{ item, key }">
      <MenuListItem
        :type="MenuListItemRootEl" 
        :color="color"
        :isActive="isSelectedValue(item)"
        @click="selectValue(item, key)" 
      >
        <FieldOption 
          v-if="isMultiselect" 
          v-model="modelValue" 
          :color="theme.getInverse(color)" 
          :value="item" 
          rootEl="span" 
        />
        <Icon v-for="(i, k) in optionTree" :key="k" :path="mdiCircleMedium" size="16" />
        <span :class="{'pl-1': optionTree > 0 || isMultiselect }">{{ getLabel(item) }}</span>
      </MenuListItem>
      <ComboBoxMenu 
        v-if="item[recursiveKey]"
        v-model="modelValue"
        class="!m-0"
        :color="color"
        :options="item[recursiveKey]"
        :displayKey="displayKey" 
				:recursiveKey="recursiveKey"
        :optionTree="optionTree + 1"
        :isMultiselect="isMultiselect"
        @select="selectValue"
      />
    </template>
  </Menu>
</template>