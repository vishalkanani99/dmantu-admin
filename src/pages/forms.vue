<script setup>
import { ref, shallowRef } from 'vue';
import { mdiFormSelect, mdiCog } from '@mdi/js';
import SectionTitle from '../components/SectionTitle.vue';


</script>
<template>
  <div class="space-y-6">
    <SectionTitle 
      title="Form" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme" 
    />

  </div>
</template>