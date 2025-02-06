<script setup>
import { shallowRef, ref, computed, onMounted, watch } from 'vue';
import { mdiCog } from '@mdi/js';
import { useScreen } from '../composables/useScreen';
import SectionMain from '../components/section/SectionMain.vue';
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/sidebar/SideBar.vue';
import SideBarMenu from '../components/sidebar/SideBarMenu.vue';
import OverLayer from '../components/OverLayer.vue';
import { menu } from '../menu';
import Button from '../components/Button.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import FieldOption from '../components/form/FieldOption.vue';
import { theme } from '../color';

const { isMMMd } = useScreen();

const themeColor = shallowRef(theme.activeColor);
const showSettingsBar = shallowRef(false);
const showSideBar = shallowRef(false);
const isCompactSidebar = shallowRef(false);
const showOverLayer = shallowRef(false);
const showSideBarDropdown = shallowRef(false);
const dropdownItem = ref({});
const searchField = ref();

const isClosableSidebar = computed(() => !isMMMd.value);

const toggleMenu = () => {
  showSideBar.value = !showSideBar.value;
  showOverLayer.value = showSideBar.value;
}

const toggleDropdownSideBar = (item) => {
  showSideBarDropdown.value = typeof item === 'boolean' ? false : !showSideBarDropdown.value;
  dropdownItem.value = showSideBarDropdown.value ? item : {};
}

watch(
  isClosableSidebar,
  () => {
    showSideBar.value = !isClosableSidebar.value;
    showSettingsBar.value = isCompactSidebar.value = false;
    showOverLayer.value = showSideBarDropdown.value = false;
    dropdownItem.value = {};
  }
);

onMounted(() => {
  showSideBar.value = !isClosableSidebar.value;
})
</script>

<template>
  <SectionMain
    :class="[ isCompactSidebar ? 'md:ml-24' : 'md:ml-64' ]"
    :color="theme.activeColors.inverse"
  >
    <NavBar 
      :class="[
        isCompactSidebar ? 'md:ml-24' : 'md:ml-64',
        'transition-[margin] z-20',
      ]"
      :hasMenuBtn="isClosableSidebar" 
      @toggleMenu="toggleMenu" 
    />
    <slot></slot>

    <Teleport to="body">
      <SideBar
        v-model="showSettingsBar"
        class="!w-1/2 md:!w-1/3 lg:!w-1/5 z-30 !overflow-visible"
        :color="theme.activeColors.inverse"
        position="right"
      >
        <Button 
          class="absolute rounded-r-none left-0 top-[50%] -translate-x-full translate-y-[50%]" 
          :color="theme.activeColors.dark" 
          :iconPath="mdiCog"
          @click="showSettingsBar = !showSettingsBar" 
        />
        <template #header>
          <strong>Theme Settings</strong>
        </template>
        <FieldGroup class="p-6" label="Theme colors" :color="theme.activeColors.default" optionsGroup verticalLayout >
          <FieldOption v-model="themeColor" type="radio" label="Theme" color="theme" value="theme" @input="theme.setActive('theme')"/>
          <FieldOption v-model="themeColor" type="radio" label="Black" color="black" value="black" @input="theme.setActive('black')" />
          <FieldOption v-model="themeColor" type="radio" label="Gray" color="gray" value="gray" @input="theme.setActive('gray')" />
          <FieldOption v-model="themeColor" type="radio" label="Info" color="info" value="info" @input="theme.setActive('info')" />
          <FieldOption v-model="themeColor" type="radio" label="Success" color="success" value="success" @input="theme.setActive('success')" />
          <FieldOption v-model="themeColor" type="radio" label="Warning" color="warning" value="warning" @input="theme.setActive('warning')" />
          <FieldOption v-model="themeColor" type="radio" label="Danger" color="danger" value="danger" @input="theme.setActive('danger')" />
        </FieldGroup>
      </SideBar>
      <SideBarMenu 
        v-model="showSideBar" 
        v-model:isCompact="isCompactSidebar"
        :color="theme.activeColors.dark" 
        :items="menu"
        :isClosable="isClosableSidebar"
        @close="showOverLayer = false" 
        @update:isCompact="toggleDropdownSideBar"
        @dropdownClick="toggleDropdownSideBar"
      />
      
      <SideBarMenu 
        v-model="showSideBarDropdown"
        :class="{'left-24 ml-1' : showSideBarDropdown}"
        :color="theme.activeColors.dark" 
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
