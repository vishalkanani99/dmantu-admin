<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  bgColor: String,
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
      props.bgColor,
      'absolute inset-0 flex z-10 opacity-50 bg-[--color]',
    ]"
  >
    <img class="w-8 h-8 m-auto" src="/loader.gif">
  </div>
</template>
