<script setup>
defineProps({
  color: String,
});
</script>
<template>
  <div 
    :class="[
      color, 
      'min-h-dvh w-dvw lg:w-auto mt-20 p-6 transition-[margin]',
      'bg-[--color] text-[--color-inverse]',
    ]"
  >
    <slot></slot>
  </div>
</template>