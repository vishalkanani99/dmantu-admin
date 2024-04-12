<script setup>
import { shallowRef } from 'vue';
import { RouterView } from 'vue-router';
import SideBar from './components/SideBar.vue'
import OverLayer from './components/OverLayer.vue';
import Button from './components/Button.vue';

const showSideBar = shallowRef(false);
const showOverLayer = shallowRef(false);
</script>

<template>
  <div>
    <Button label="Show Sidebar" @click="showOverLayer = !showOverLayer, showSideBar = !showSideBar" />
    <SideBar v-model="showSideBar" class="z-50" @close="showOverLayer = false" />
    <RouterView />
    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </div>
</template>
