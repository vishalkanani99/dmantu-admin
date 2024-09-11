<script setup>
const props = defineProps({
  isActive: Boolean
});

</script>

<template>
  <div :class="['p-6', {'hidden':!isActive}]">
    <slot></slot>
  </div>
</template>