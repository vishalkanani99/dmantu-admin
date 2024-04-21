<script setup>
import { ref } from 'vue';
import { mdiMenu, mdiMagnify, mdiBellOutline, mdiEmailOutline } from '@mdi/js';
import Field from './Field.vue';
import FieldGroup from './FieldGroup.vue';
import Button from './Button.vue';

const props = defineProps({
  hasMenuBtn: Boolean,
});

const emit = defineEmits(['toggleMenu']);
const search = ref();
</script>
<template>
  <div class="fixed flex justify-between items-center top-0 left-0 right-0 bg-theme-600 min-h-[80px] px-6 py-4">
    <Button v-if="hasMenuBtn" class="order-first" color="theme-light" :iconPath="mdiMenu" @click="$emit('toggleMenu')" />
    <FieldGroup>
      <Field color="theme-light" v-model="search" :inputLeftIcon="mdiMagnify" rounded />
    </FieldGroup>
    <div class="flex order-last items-center space-x-2">
      <Button color="theme-light" :iconPath="mdiBellOutline" />
      <Button color="theme-light" :iconPath="mdiEmailOutline" />
    </div>
  </div>
</template>