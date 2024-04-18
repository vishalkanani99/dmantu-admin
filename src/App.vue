<script setup>
import { shallowRef, ref, computed } from 'vue';
import { RouterView } from 'vue-router';
import { useScreen } from './composables/useScreen';
import Field from './components/Field.vue';
import FieldGroup from './components/FieldGroup.vue';
import NavBar from './components/NavBar.vue';
import SideBarMenu from './components/SideBarMenu.vue';
import OverLayer from './components/OverLayer.vue';

const { isSmallScreen, isExtraSmallScreen } = useScreen();
const isClosableSidebar = computed(() => isSmallScreen.value || isExtraSmallScreen.value);
const showSideBar = shallowRef(!isClosableSidebar.value);
const isCompactSidebar = shallowRef(false);
const showOverLayer = shallowRef(false);
const searchField = ref();

const toggleMenu = () => {
  showSideBar.value = !showSideBar.value;
  showOverLayer.value = showSideBar.value;
}
</script>

<template>
  <div>
    <NavBar 
      :class="[
        isCompactSidebar ? 'md:ml-24' : 'md:ml-64',
        'transition-all',
      ]"
      :hasMenuBtn="isClosableSidebar" 
      @toggleMenu="toggleMenu" />
    <SideBarMenu v-model="showSideBar" v-model:isCompact="isCompactSidebar" @close="showOverLayer = false" />  
    <RouterView />
    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </div>
</template>
