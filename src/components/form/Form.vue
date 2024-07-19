<script setup>
import Card from '../card/Card.vue';

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
  twoColumns: Boolean,
  threeColumns: Boolean,
});

const emit = defineEmits(['close', 'save', 'cancel']);
</script>
<template>
  <form>
    <Card
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
              'p-4',
              { 'grid grid-cols-1 md:grid-cols-2 gap-4' : twoColumns },
              { 'grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4' : threeColumns },
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