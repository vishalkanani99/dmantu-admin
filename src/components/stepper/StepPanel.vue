<script setup>
import Card from '../card/Card.vue';

const props = defineProps({
  isActive: Boolean
});

</script>

<template>
  <Card :class="{'hidden':!isActive}" noHeader>
    <slot></slot>
    <template #buttons>
      <slot name="buttons"></slot>
    </template>
  </Card>
</template>