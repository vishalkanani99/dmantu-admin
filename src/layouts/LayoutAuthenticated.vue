<script setup>
import { shallowRef, ref, computed, onMounted, watch, defineAsyncComponent } from 'vue';
import { mdiCog } from '@mdi/js';
import { useScreen } from '../composables/useScreen';
import SectionMain from '../components/section/SectionMain.vue';
import NavBar from '../components/NavBar.vue';
import OverLayer from '../components/OverLayer.vue';
import { menu } from '../menu';
import Button from '../components/Button.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import FieldOption from '../components/form/FieldOption.vue';
import Modal from '../components/Modal.vue';
import { theme } from '../color';

const SideBarMenu = defineAsyncComponent(() =>
  import('../components/sidebar/SideBarMenu.vue')
)
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
  showSideBar.value = isMMMd.value;
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

    <slot :isMMMd="isMMMd"></slot>

    <Teleport to="body">
      <Modal 
        v-model="showSettingsBar"
        :color="theme.activeColors.inverse" 
        class="top-3/4" 
        title="Theme Settings" 
        size="full" 
        origin="bottom" 
        scrollable 
        noFooter
      >
        <FieldGroup label="Theme colors" :color="theme.activeColors.default" optionsGroup >
          <FieldOption v-model="themeColor" type="radio" label="Theme" color="theme" value="theme" @input="theme.setActive('theme')"/>
          <FieldOption v-model="themeColor" type="radio" label="Black" color="black" value="black" @input="theme.setActive('black')" />
          <FieldOption v-model="themeColor" type="radio" label="Gray" color="gray" value="gray" @input="theme.setActive('gray')" />
          <FieldOption v-model="themeColor" type="radio" label="Info" color="info" value="info" @input="theme.setActive('info')" />
          <FieldOption v-model="themeColor" type="radio" label="Success" color="success" value="success" @input="theme.setActive('success')" />
          <FieldOption v-model="themeColor" type="radio" label="Warning" color="warning" value="warning" @input="theme.setActive('warning')" />
          <FieldOption v-model="themeColor" type="radio" label="Danger" color="danger" value="danger" @input="theme.setActive('danger')" />
        </FieldGroup>
      </Modal>
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
      <Button 
        class="fixed right-0 bottom-0 m-6 md:m-9 z-50" 
        :color="theme.activeColors.dark" 
        :iconPath="mdiCog"
        size="large"
        rounded
        @click="showSettingsBar = !showSettingsBar" 
      />
    </Teleport>
    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </SectionMain>
</template>
