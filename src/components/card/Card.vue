<script setup>
import { computed } from 'vue';
import { mdiClose } from '@mdi/js';
import { background, getDefaultTextStyle, border } from '../../color';
import Button from '../Button.vue';

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
  color: {
    type: String,
    default: 'white',
  },
  saveBtnIconPath: String,
  cancelBtnIconPath: String,
  closable: Boolean,
  noHeader: Boolean,
  noFooter: Boolean,
  scrollable: Boolean,
});

const emit = defineEmits(['close', 'save', 'cancel']);

const textStyle = computed(() => getDefaultTextStyle(props.color));

const defaultStyle = computed(() => {
  let style = [
    'relative flex flex-col border min-w-0 rounded-md shadow-md',
    background[props.color],
    border[props.color],
    textStyle.value.color,
  ];
  return style;
});

const separatorColor = computed(() => border[textStyle.value.type]);

</script>
<template>
  <div :class="defaultStyle">
    <Button
      v-if="closable" 
      class="absolute top-0 right-0 m-2" 
      :color="textStyle.type"
      size="small"
      :iconPath="mdiClose"
      rounded
      @click="$emit('close')" 
    />
    <!-- card header -->
    <slot v-if="!noHeader" name="header">
      <div :class="['flex justify-between items-center border-b rounded-t-md p-3 md:p-6', separatorColor]">
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
            'flex-auto p-3 md:p-6',
            scrollable ? 'max-h-[calc(100vh-224px)] overflow-y-auto' : 'overflow-hidden',
          ]"
        >
        <slot></slot>
      </div>
    </slot>
    <!-- card body end -->

    <!-- card footer -->
    <slot v-if="!noFooter" name="footer">
      <div :class="['flex items-center space-x-2 border-t rounded-b-md p-3 md:p-6', separatorColor]">
        <slot name="buttons">
          <Button :label="saveBtnLabel" :iconPath="saveBtnIconPath" :color="textStyle.type"  @click="$emit('save')" />
          <Button :label="cancelBtnLabel" :iconPath="cancelBtnIconPath" :color="textStyle.type" outline  @click="$emit('cancel')" />
        </slot>
      </div>
    </slot>
    <!-- card footer end -->
  </div>
</template>