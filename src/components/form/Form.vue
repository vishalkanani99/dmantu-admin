<script setup>
import { computed } from 'vue';
import Card from '../card/Card.vue';
import { theme } from '../../color';

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
  color: String,
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
  twoColumns: Boolean,
  threeColumns: Boolean,
});

const emit = defineEmits(['close', 'save', 'cancel']);

const btnColor = computed(() => props.btnColor ?? theme.getInverse(props.color));
const headerColor = computed(() => props.headerColor ?? theme.getInverse(props.color));
const bodyColor = computed(() => props.bodyColor ?? theme.getInverse(props.color));
const footerColor = computed(() => props.footerColor ?? theme.getInverse(props.color));
</script>
<template>
  <form>
    <Card
      :color="color"
      :headerColor="headerColor"
      :bodyColor="bodyColor"
      :footerColor="footerColor"
      :btnColor="btnColor"
      :title="title"
      :subTitle="subTitle"
      :saveBtnLabel="saveBtnLabel"
      :cancelBtnLabel="cancelBtnLabel"
      :saveBtnIconPath="saveBtnIconPath"
      :cancelBtnIconPath="cancelBtnIconPath"
      :closable="closable"
      :noHeader="noHeader"
      :noFooter="noFooter"
      @close="$emit('close')"
      @save="$emit('save')"
      @cancel="$emit('cancel')"
    >
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #content>
        <slot name="content">
          <div 
            :class="[
              bodyColor,
              'p-4 text-[--color]',
              { 'space-y-4' : !twoColumns && !threeColumns },
              { 'grid grid-cols-1 md:grid-cols-2 gap-4' : twoColumns },
              { 'grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4' : threeColumns },
              { 'max-h-[calc(100vh-224px)] overflow-y-auto': scrollable }
            ]"
          >
            <slot></slot>
          </div>
        </slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </Card>
  </form>
</template>