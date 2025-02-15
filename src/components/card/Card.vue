<script setup>
import { computed } from 'vue';
import { mdiClose } from '@mdi/js';
import { theme } from '../../color';
import Button from '../Button.vue';
import CardHeader from './CardHeader.vue';
import CardFooter from './CardFooter.vue';
import CardBody from './CardBody.vue';

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
  headerColor: String,
  bodyColor: String,
  footerColor: String,
  btnColor: String,
  saveBtnIconPath: String,
  cancelBtnIconPath: String,
  closable: Boolean,
  noHeader: Boolean,
  noFooter: Boolean,
  scrollable: Boolean,
});

const emit = defineEmits(['close', 'save', 'cancel']);

const btnColor = computed(() => props.btnColor ?? theme.getInverse(props.color));
const headerColor = computed(() => props.headerColor ?? theme.getInverse(props.color));
const bodyColor = computed(() => props.bodyColor ?? theme.getInverse(props.color));
const footerColor = computed(() => props.footerColor ?? theme.getInverse(props.color));

const defaultStyle = computed(() => {
  let style = [
    props.color,
    'relative flex flex-col border min-w-0 rounded-md shadow-md drop-shadow',
    'bg-[--color] border-[--color] text-[--color-inverse]',
  ];
  return style;
});

</script>
<template>
  <div :class="defaultStyle">
    <Button
      v-if="closable" 
      class="absolute top-0 right-0 m-2" 
      :color="btnColor"
      size="small"
      :iconPath="mdiClose"
      rounded
      @click="$emit('close')" 
    />
    <!-- card header -->
    <slot v-if="!noHeader" name="header">
      <CardHeader :separatorColor="headerColor" :title="title" :subTitle="subTitle" />
    </slot>
    <!-- card header end -->

    <!-- card body -->
    <slot name="content">
      <CardBody :class="bodyColor" :scrollable="scrollable">
        <slot></slot>
      </CardBody>
    </slot>
    <!-- card body end -->

    <!-- card footer -->
    <slot v-if="!noFooter" name="footer">
      <CardFooter
        :btnColor="btnColor"
        :separatorColor="footerColor"
        :saveBtnLabel="saveBtnLabel"
        :cancelBtnLabel="cancelBtnLabel"
        :saveBtnIconPath="saveBtnIconPath"
        :cancelBtnIconPath="cancelBtnIconPath"
        @save="$emit('save')"
        @cancel="$emit('cancel')"
      />
    </slot>
    <!-- card footer end -->
  </div>
</template>