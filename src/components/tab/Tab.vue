<script setup>
import { computed } from "vue";
import Button from "../Button.vue";

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null,
  },
  color: String,
  vertical: Boolean,
  isActive: Boolean,
  outline: Boolean,
  disabled: Boolean,
});

const tabStyle= computed(() => {
  return [
    props.color,
    'flex items-center px-3 py-2 select-none w-full',
    {'md:w-auto': !props.vertical},
    props.outline 
      ? 'bg-transparent text-[--color] hover:font-bold hover:border-b-2 border-b border-[--color]' 
      : 'text-[--color-inverse] hover:bg-[--color-m]',
    { 'font-bold' :  props.isActive},
    { 'border-b-4' :  props.isActive && props.outline},
    props.isActive && !props.outline ? 'bg-[--color-ml]' : 'bg-[--color]',
    props.disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'
  ];
});
</script>

<template>
  <Button
    :class="tabStyle"
    :label="label" 
    :iconPath="icon" 
    :disabled="disabled"
    isPlain 
  />
</template>