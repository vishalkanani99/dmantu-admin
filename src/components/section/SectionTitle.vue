<script setup>
import Icon from '../Icon.vue';
import Button from '../Button.vue';

const props = defineProps({
  color: String,
  iconPath: String,
  title: String,
  btnLabel: String,
  btnIconPath: String,
  btnColor: String,
});

const emit = defineEmits(['btnClick']);
</script>

<template>
  <div 
    :class="[
      color,
      'flex justify-between items-center text-[--color]'
    ]"
  >
    <div class="flex justify-start items-center">
      <Icon v-if="iconPath" class="rounded-full w-12 h-12 p-2 bg-[--color] text-[--color-inverse]" :path="iconPath" :size="28" />
      <h2 v-if="title" :class="{'pl-2': iconPath}">{{ title }}</h2>
    </div>
    <Button 
      v-if="btnLabel || btnIconPath" 
      :label="btnLabel" 
      :iconPath="btnIconPath" 
      :color="btnColor"
      @click="$emit('btnClick')"
    />
  </div>
</template>