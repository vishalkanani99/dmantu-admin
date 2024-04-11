<script setup>
import { shallowRef } from 'vue';
import { RouterView } from 'vue-router';
import SideBar from './components/SideBar.vue'
import OverLayer from './components/OverLayer.vue';

const showOverLayer = shallowRef(true);
</script>

<template>
  <div>
    <SideBar class="z-50" />
    <RouterView />
    <OverLayer v-model="showOverLayer" />
  </div>
</template>
