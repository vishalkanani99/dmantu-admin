<script setup>
import Card from '../card/Card.vue';

const props = defineProps({
  isActive: Boolean,
  color: String,
});

</script>

<template>
  <Card :class="{'hidden':!isActive}" :color="color" noHeader>
    <slot></slot>
    <template #buttons>
      <slot name="buttons"></slot>
    </template>
  </Card>
</template>