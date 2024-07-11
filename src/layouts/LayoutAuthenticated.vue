<script setup>
import { shallowRef, ref, computed, onMounted } from 'vue';
import { useScreen } from '../composables/useScreen';
import SectionMain from '../components/section/SectionMain.vue';
import NavBar from '../components/NavBar.vue';
import SideBarMenu from '../components/SideBarMenu.vue';
import OverLayer from '../components/OverLayer.vue';
import { menu } from '../menu';

const { isSmallScreen, isExtraSmallScreen } = useScreen();
const showSideBar = shallowRef(false);
const isCompactSidebar = shallowRef(false);
const showOverLayer = shallowRef(false);
const showSideBarDropdown = shallowRef(false);
const dropdownItem = ref({});
const searchField = ref();

const isClosableSidebar = computed(() => isSmallScreen.value || isExtraSmallScreen.value);

const toggleMenu = () => {
  showSideBar.value = !showSideBar.value;
  showOverLayer.value = showSideBar.value;
}

const toggleDropdownSideBar = (item) => {
  console.log(item)
  showSideBarDropdown.value = typeof item === 'boolean' ? false : !showSideBarDropdown.value;
  dropdownItem.value = showSideBarDropdown.value ? item : {};
}

onMounted(() => {
  showSideBar.value = !isClosableSidebar.value;
})
</script>

<template>
  <SectionMain
    :class="[ isCompactSidebar ? 'md:ml-24' : 'md:ml-64' ]"
  >
    <NavBar 
      :class="[
        isCompactSidebar ? 'md:ml-24' : 'md:ml-64',
        'transition-all z-10',
      ]"
      :hasMenuBtn="isClosableSidebar" 
      @toggleMenu="toggleMenu" 
    />
    
    <SideBarMenu 
      v-model="showSideBar" 
      v-model:isCompact="isCompactSidebar" 
      :items="menu"
      :isClosable="isClosableSidebar"
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
    <slot></slot>

    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </SectionMain>
</template>
