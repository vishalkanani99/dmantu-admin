<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 20,
  },
  viewbox: {
    type: String,
    default: '0 0 24 24',
  },
});

</script>

<template>
  <span class="inline-flex justify-center items-center">
    <svg
      :viewBox="viewbox"
      :width="size"
      :height="size" >
      <path fill="currentColor" :d="path" />
    </svg>
  </span>
</template>
