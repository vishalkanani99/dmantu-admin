<script setup>
import { mdiTable } from '@mdi/js';
import SectionTitle from '../components/SectionTitle.vue';

</script>
<template>
  <div>
    <SectionTitle 
      title="Basic Table" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiTable" 
      btnColor="theme-light" 
    />
  </div>
</template>