<script setup>
import Icon from './Icon.vue';
import Button from './Button.vue';

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
  <section class="flex justify-between items-center px-6 py-4">
    <div class="flex justify-start items-center">
      <Icon v-if="iconPath" :path="iconPath" />
      <h2 v-if="title" :class="{'pl-2': iconPath}">{{ title }}</h2>
    </div>
    <Button 
      v-if="btnLabel || btnIconPath" 
      :label="btnLabel" 
      :iconPath="btnIconPath" 
      :color="btnColor"
      @click="emit('btnClick')"
    />
  </section>
</template>