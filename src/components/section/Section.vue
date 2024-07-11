<script setup>
import SectionTitle from './SectionTitle.vue';

const props = defineProps({
  iconPath: String,
  title: String,
  btnLabel: String,
  btnIconPath: String,
  btnColor: String,
});

const emit = defineEmits(['btnClick']);
</script>
<template>
  <section class="space-y-6 py-6">
    <slot name="title">
      <SectionTitle 
        :title="title" 
        :iconPath="iconPath"
        :btnLabel="btnLabel" 
        :btnIconPath="btnIconPath" 
        :btnColor="btnColor" 
      />
    </slot>
    <slot></slot>
  </section>
</template>