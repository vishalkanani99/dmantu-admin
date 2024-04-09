<script setup>
  import Icon from './Icon.vue';
  import Button from './Button.vue';

  const props = defineProps({
    iconPath: String,
    label: String,
    to: String,
    isActive: Boolean,
  });
</script>
<template>
  <li class="m-2">
    <Button 
      :class="[
        'flex items-center px-4 py-2 select-none cursor-pointer',
        isActive ? 'bg-theme-100 text-theme-900' 
          : 'hover:bg-theme-100 hover:text-theme-900',
      ]" 
      :to="to"
      :iconPath="iconPath"
      :label="label"
      isPlain>
    </Button>
  </li>
</template>