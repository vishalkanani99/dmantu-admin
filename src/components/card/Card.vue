<script setup>
import { computed } from 'vue';
import { mdiClose } from '@mdi/js';
import { useTheme } from '../../composables/useTheme.js';
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
  saveBtnIconPath: String,
  cancelBtnIconPath: String,
  closable: Boolean,
  noHeader: Boolean,
  noFooter: Boolean,
  scrollable: Boolean,
});

const emit = defineEmits(['close', 'save', 'cancel']);

const { getColorInverse } = useTheme();

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
      :color="getColorInverse(color)"
      size="small"
      :iconPath="mdiClose"
      rounded
      @click="$emit('close')" 
    />
    <!-- card header -->
    <slot v-if="!noHeader" name="header">
      <CardHeader :separatorColor="getColorInverse(color)" :title="title" :subTitle="subTitle" />
    </slot>
    <!-- card header end -->

    <!-- card body -->
    <slot name="content">
      <CardBody :class="getColorInverse(color)" :scrollable="scrollable">
        <slot></slot>
      </CardBody>
    </slot>
    <!-- card body end -->

    <!-- card footer -->
    <slot v-if="!noFooter" name="footer">
      <CardFooter
        :btnColor="getColorInverse(color)"
        :separatorColor="getColorInverse(color)"
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