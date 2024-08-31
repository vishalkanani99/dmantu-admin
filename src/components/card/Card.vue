<script setup>
import { mdiClose } from '@mdi/js';
import Button from '../Button.vue';
import Icon from '../Icon.vue';

const props = defineProps({
  title: String,
  subTitle: String,
  saveBtnLabel: {
    type: String,
    default: 'Save',
  },
  cancelBtnLabel: {
    type: String,
    default: 'Cancel',
  },
  saveBtnIconPath: String,
  cancelBtnIconPath: String,
  closable: Boolean,
  noHeader: Boolean,
  noFooter: Boolean,
  scrollable: Boolean,
});

const emit = defineEmits(['close', 'save', 'cancel']);
</script>
<template>
  <div class="relative flex flex-col bg-white border min-w-0 rounded-md shadow-md">
    <Button
      v-if="closable" 
      class="absolute top-0 right-0 m-2" 
      color="theme-light"
      rounded
      @click="$emit('close')" 
    >
      <Icon :path="mdiClose" size="16" />
    </Button>
    <!-- card header -->
    <slot v-if="!noHeader" name="header">
      <div class="flex justify-between items-center border-b rounded-t-md p-6">
        <span>
          <h2 v-if="title">{{ title }}</h2>
          <h4 v-if="subTitle">{{ subTitle }}</h4>
        </span>
      </div>
    </slot>
    <!-- card header end -->

    <!-- card body -->
    <slot name="content">
        <div 
          :class="[ 
            'flex-auto p-6',
            scrollable ? 'max-h-[calc(100vh-224px)] overflow-y-auto' : 'overflow-hidden',
          ]"
        >
        <slot></slot>
      </div>
    </slot>
    <!-- card body end -->

    <!-- card footer -->
    <slot v-if="!noFooter" name="footer">
      <div class="flex items-center space-x-2 border-t rounded-b-md p-6">
        <slot name="buttons">
          <Button :label="saveBtnLabel" :iconPath="saveBtnIconPath"  @click="$emit('save')" />
          <Button :label="cancelBtnLabel" color="theme-light" :iconPath="cancelBtnIconPath" @click="$emit('cancel')" />
        </slot>
      </div>
    </slot>
    <!-- card footer end -->
  </div>
</template>