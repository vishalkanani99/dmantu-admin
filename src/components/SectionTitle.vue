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
  <section class="flex justify-between items-center text-theme-900">
    <div class="flex justify-start items-center">
      <Icon v-if="iconPath" class="rounded-full w-12 h-12 p-2 bg-theme-600 text-theme-100" :path="iconPath" :size="28" />
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