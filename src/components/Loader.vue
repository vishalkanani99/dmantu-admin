<script setup>
import { ref, watchEffect } from "vue";
import { background } from "../color";

const props = defineProps({
  bgColor: {
    type: String,
    default: 'theme'
  },
});

const loaderRef = ref();

watchEffect(() => {
  loaderRef.value?.parentElement.classList.add('relative');
})
</script>

<template>
  <div
    ref="loaderRef" 
    :class="[
      'absolute inset-0 flex z-10 opacity-50',
      background[bgColor]
    ]"
  >
    <img class="w-8 h-8 m-auto" src="/loader.gif">
  </div>
</template>
