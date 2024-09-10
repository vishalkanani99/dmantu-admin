<script setup>
import { computed } from 'vue';
import { mdiDotsVertical } from '@mdi/js';
import Button from '../Button.vue';
import Dropdown from '../Dropdown.vue';
import Card from './Card.vue';
import FieldOption from '../form/FieldOption.vue';
import Icon from '../Icon.vue';

const props = defineProps({
  modelValue: [Array, String, Number, Boolean, Object],
  imageSrc: String,
  title: String,
  subTitle: String,
  menuBtnColor: {
    type: String,
    default: 'white',
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
  saveBtnLabel: {
    type: String,
    default: 'Save',
  },
  cancelBtnLabel: {
    type: String,
    default: 'Cancel',
  },
  menuBtnIconPath: String,
  saveBtnIconPath: String,
  cancelBtnIconPath: String,
  selectable: Boolean,
  noFooter: Boolean,
});

const emit = defineEmits(['update:modelValue', 'menuClick']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <Card
    :saveBtnLabel="saveBtnLabel"
    :cancelBtnLabel="cancelBtnLabel"
    :saveBtnIconPath="saveBtnIconPath"
    :cancelBtnIconPath="cancelBtnIconPath"
  >
    <template #header>
      <div class="relative">
        <div class="overflow-hidden rounded-t-md h-64">
          <img v-if="imageSrc" class="h-full w-full select-none drag-none pointer-events-none" :src="imageSrc" />
        </div>
        <div class="absolute m-2 top-0 left-0">
          <slot name="topLeft">
            <FieldOption
              v-if="selectable" 
              v-model="modelValue" 
            />
          </slot>
        </div>
        <div class="absolute m-2 top-0 right-0">
          <slot name="topRight">
            <Dropdown
              v-if="menuItems.length"
              :items="menuItems"
              :bgColor="menuBtnColor"
              :ItemColor="menuBtnColor"
              @menuClick="(value) => $emit('menuClick', value)"
            >
              <template #selector>
                <Button :color="menuBtnColor" rounded >
                  <Icon :path="menuBtnIconPath ?? mdiDotsVertical" size="14" />
                </Button>
              </template>
            </Dropdown>
          </slot>
        </div>
      </div>
    </template>
    <slot name="content">
      <div class="flex justify-between items-center mb-4">
        <span>
          <h2 v-if="title">{{ title }}</h2>
          <h4 v-if="subTitle">{{ subTitle }}</h4>
        </span>
        <slot name="titleBarSectionRight"></slot>
      </div>
      <slot></slot>
    </slot>
    <template v-if="!noFooter" #footer>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>