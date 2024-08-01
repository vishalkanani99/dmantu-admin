<script setup>
import { computed } from 'vue';
import { mdiDotsVertical } from '@mdi/js';
import Button from '../Button.vue';
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
  noFooter: Boolean,
});

const emit = defineEmits(['menuClick']);

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
          <img v-if="imageSrc" class="h-full w-full" :src="imageSrc" />
        </div>
        <div v-if="modelValue" class="absolute m-2 top-0 left-0">
          <FieldOption v-model="modelValue" />
        </div>
        <Button 
          class="absolute m-2 top-0 right-0 h-8 w-8" 
          :color="menuBtnColor"
          rounded 
          @click="$emit('menuClick')"
        >
          <Icon :path="menuBtnIconPath ?? mdiDotsVertical" size="16" />
        </Button>
      </div>
    </template>
    <slot name="content">
      <div class="flex justify-between items-center mb-4">
        <span>
          <h2 v-if="title">{{ title }}</h2>
          <h4 v-if="subTitle">{{ subTitle }}</h4>
        </span>
        <slot name="right"></slot>
      </div>
      <slot></slot>
    </slot>
    <template v-if="!noFooter" #footer>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>