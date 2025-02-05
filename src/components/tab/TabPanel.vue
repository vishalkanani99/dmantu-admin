<script setup>
const props = defineProps({
  isActive: Boolean,
  transitionName: {
    type: String,
    default: 'slide-right',
  }
});

</script>

<template>
  <Transition :name="transitionName">
    <div v-if="isActive" class="p-3 md:p-4">
      <slot></slot>
    </div>
  </Transition>
</template>