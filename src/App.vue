<script setup>
import { shallowRef, ref, computed } from 'vue';
import { RouterView } from 'vue-router';

import { useScreen } from './composables/useScreen';
import Field from './components/Field.vue';
import FieldGroup from './components/FieldGroup.vue';
import NavBar from './components/NavBar.vue';
import SideBarMenu from './components/SideBarMenu.vue';
import OverLayer from './components/OverLayer.vue';
import { menu } from './menu';

const { isSmallScreen, isExtraSmallScreen } = useScreen();
const isClosableSidebar = computed(() => isSmallScreen.value || isExtraSmallScreen.value);
const showSideBar = shallowRef(!isClosableSidebar.value);
const isCompactSidebar = shallowRef(false);
const showOverLayer = shallowRef(false);
const showSideBarDropdown = shallowRef(false);
const dropdownItem = ref({});
const searchField = ref();

const toggleMenu = () => {
  showSideBar.value = !showSideBar.value;
  showOverLayer.value = showSideBar.value;
}

const toggleDropdownSideBar = (item) => {
  console.log(item)
  showSideBarDropdown.value = typeof item === 'boolean' ? false : !showSideBarDropdown.value;
  dropdownItem.value = showSideBarDropdown.value ? item : {};
}
</script>

<template>
  <div>
    <NavBar 
      :class="[
        isCompactSidebar ? 'md:ml-24' : 'md:ml-64',
        'transition-all z-10',
      ]"
      :hasMenuBtn="isClosableSidebar" 
      @toggleMenu="toggleMenu" />
    <SideBarMenu 
      v-model="showSideBar" 
      v-model:isCompact="isCompactSidebar" 
      :items="menu"
      @close="showOverLayer = false" 
      @update:isCompact="toggleDropdownSideBar"
      @dropdownClick="toggleDropdownSideBar"
    />
    <SideBarMenu 
      v-model="showSideBarDropdown"
      :class="{'left-24 ml-1' : showSideBarDropdown}" 
      :items="dropdownItem.items" 
      isClosable 
    >
      <template #header>
        <h2>{{ dropdownItem.label }}</h2>
      </template>
    </SideBarMenu>  
    <section
      :class="[
        isCompactSidebar ? 'md:ml-24' : 'md:ml-64',
        'mt-20 p-6',
        'bg-theme-100',
        'transition-all',
        'overflow-y-auto',
      ]"
    >
      <RouterView />
    </section>
    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </div>
</template>
