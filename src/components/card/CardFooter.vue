<script setup>
import Button from '../Button.vue';
import { border } from '../../color';

const props = defineProps({
  btnColor: String,
  separatorColor: String,
  saveBtnLabel: String,
  cancelBtnLabel: String,
  saveBtnIconPath: String,
  cancelBtnIconPath: String,
});

const emit = defineEmits(["save", "cancel"]);
</script>
<template>
  <div 
    :class="[
      'flex items-center space-x-2 border-t rounded-b-md p-3 md:p-4',
      border[separatorColor],
    ]"
  >
    <slot>
      <Button :label="saveBtnLabel" :iconPath="saveBtnIconPath" :color="btnColor"  @click="$emit('save')" />
      <Button :label="cancelBtnLabel" :iconPath="cancelBtnIconPath" :color="btnColor" outline  @click="$emit('cancel')" />
    </slot>
  </div>
</template>