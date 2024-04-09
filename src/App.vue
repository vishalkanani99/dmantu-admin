<script setup>
import { RouterView } from 'vue-router';
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div>
    <SideBar />
    <RouterView />
  </div>
</template>
