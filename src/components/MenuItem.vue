<script setup>
  import Icon from './Icon.vue';

  const props = defineProps({
    iconPath: String,
    label: String,
    route: String,
    isActive: Boolean,
  });
</script>
<template>
  <li class="m-2">
    <a 
      :class="[
        'flex items-center px-4 py-2',
        isActive ? 'bg-theme-light-blue text-theme-dark-blue' 
          : 'hover:bg-theme-light-blue hover:text-theme-dark-blue',
      ]" 
      :href="route">
      <Icon v-if="iconPath" :path="iconPath" />
      <span v-if="label" class="pl-4">{{ label }}</span>
    </a>
  </li>
</template>