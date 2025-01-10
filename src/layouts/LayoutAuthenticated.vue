<script setup>
import { shallowRef, ref, computed, onMounted } from 'vue';
import { useScreen } from '../composables/useScreen';
import { useTheme } from '../composables/useTheme';
import SectionMain from '../components/section/SectionMain.vue';
import NavBar from '../components/NavBar.vue';
import SideBarMenu from '../components/sidebar/SideBarMenu.vue';
import OverLayer from '../components/OverLayer.vue';
import { menu } from '../menu';

const { isSm, isXs } = useScreen();
const { activeColors } = useTheme();

const showSideBar = shallowRef(false);
const isCompactSidebar = shallowRef(false);
const showOverLayer = shallowRef(false);
const showSideBarDropdown = shallowRef(false);
const dropdownItem = ref({});
const searchField = ref();

const isClosableSidebar = computed(() => isSm.value || isXs.value);

const toggleMenu = () => {
  showSideBar.value = !showSideBar.value;
  showOverLayer.value = showSideBar.value;
}

const toggleDropdownSideBar = (item) => {
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
    :color="activeColors.inverse"
  >
    <NavBar 
      :class="[
        isCompactSidebar ? 'md:ml-24' : 'md:ml-64',
        'transition-[margin] z-20',
      ]"
      :color="activeColors.default"
      :hasMenuBtn="isClosableSidebar" 
      @toggleMenu="toggleMenu" 
    />
    <slot></slot>

    <Teleport to="body">
      <SideBarMenu 
        v-model="showSideBar" 
        v-model:isCompact="isCompactSidebar"
        :color="activeColors.dark" 
        :items="menu"
        :isClosable="isClosableSidebar"
        @close="showOverLayer = false" 
        @update:isCompact="toggleDropdownSideBar"
        @dropdownClick="toggleDropdownSideBar"
      />
      
      <SideBarMenu 
        v-model="showSideBarDropdown"
        :class="{'left-24 ml-1' : showSideBarDropdown}"
        :color="activeColors.dark" 
        :items="dropdownItem.items" 
        isClosable 
      >
        <template #header>
          <h2>{{ dropdownItem.label }}</h2>
        </template>
      </SideBarMenu>
    </Teleport>
    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </SectionMain>
</template>
