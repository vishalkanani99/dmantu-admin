<script setup>
import { ref, computed, shallowRef } from 'vue';
import { 
  mdiMenu, 
  mdiMagnify, 
  mdiBellOutline, 
  mdiEmailOutline, 
  mdiCog, 
  mdiPencil, 
  mdiLogout, 
  mdiDotsVertical 
} from '@mdi/js';
import { background, getDefaultTextStyle } from '../color';
import AutoComplete from './form/AutoComplete.vue';
import Button from './Button.vue';
import Dropdown from './dropdown/Dropdown.vue';
import Avatar from './Avatar.vue';
import Icon from './Icon.vue';
import SideBarMenu from './sidebar/SideBarMenu.vue';
import MenuListItem from './menu/MenuListItem.vue';
import OverLayer from './OverLayer.vue';

const props = defineProps({
  hasMenuBtn: Boolean,
  color: {
    type: String,
    default: 'theme',
  }
});

const emit = defineEmits(['toggleMenu']);
const showMobileMenu = shallowRef(false);
const search = ref();

const textStyle = computed(() => getDefaultTextStyle(props.color));

const items = computed(() => {
  const menu = [
    {
      label: 'Edit Profile',
      to: '/',
      iconPath: mdiPencil,
    },
    {
      label: 'Settings',
      to: '/',
      iconPath: mdiCog,
    },
    {
      label: 'Logout',
      to: '/',
      iconPath: mdiLogout,
    },
  ];
  return menu;
});

const optionsArrObjs = [
  { id: 1, value: 'Option 1'},
  { id: 2, value: 'Option 2'},
  { id: 3, value: 'Option 3'},
  { id: 4, value: 'Option 4'},
  { id: 5, value: 'Option 5'},
];
</script>
<template>
  <div 
    :class="[
      'fixed top-0 inset-x-0 flex justify-between items-center h-20 px-6 py-4 gap-2', 
      background[color], 
      textStyle.color,
    ]"
  >
    <Button 
      v-if="hasMenuBtn" 
      class="order-first" 
      :color="textStyle.type" 
      :iconPath="mdiMenu" 
      @click="$emit('toggleMenu')" 
    />
    <AutoComplete
      v-model="search"
      class="w-full md:w-1/4"
      :color="textStyle.type"
      :options="optionsArrObjs"
      displayKey="value"
      :fieldProps="{
        color: textStyle.type,
        placeholder: 'Search',
        inputLeftIcon: mdiMagnify,
        rounded: true,
      }"
    />
    <div class="hidden md:flex order-last items-center gap-2">
      <Dropdown :bgColor="textStyle.type" :items="items">
        <template #selector>
          <Button :color="textStyle.type" :iconPath="mdiBellOutline" size="small" hasAnimatedBadge />
        </template>
      </Dropdown>
      <Dropdown :bgColor="textStyle.type" :items="items">
        <template #selector>
          <Button :color="textStyle.type" :iconPath="mdiEmailOutline" size="small" badgeLabel="+9" />
        </template>
      </Dropdown>
      <Dropdown :bgColor="textStyle.type" :items="items">
        <template #selector="{ btnIcon }">
          <div class="flex items-center gap-2 cursor-pointer">
            <Avatar username="John Doe" class="w-8 h-8" />
            <span>John Doe</span>
            <Icon :path="btnIcon" />
          </div>
        </template>
      </Dropdown>
    </div>
    <Button  
      class="md:hidden order-last" 
      :color="textStyle.type" 
      :iconPath="mdiDotsVertical"
      rounded 
      @click="showMobileMenu = true" 
    />
    <Teleport to="body">
      <SideBarMenu 
        v-model="showMobileMenu"
        :items="[
          {
            label: 'Edit Profile',
            to: '/',
            iconPath: mdiPencil,
          },
          {
            label: 'Settings',
            to: '/',
            iconPath: mdiCog,
          },
          {
            label: 'Notification',
            to: '/',
            iconPath: mdiBellOutline,
          },
          {
            label: 'Email',
            to: '/',
            iconPath: mdiEmailOutline,
            badgeLabel: '+9',
          },
        ]"
        :color="textStyle.type"
        position="right" 
        isClosable 
      >
        <template #header>
          <div class="flex w-full items-center gap-2">
            <Avatar username="John Doe" class="w-8 h-8" />
            <span>John Doe</span>
          </div>
        </template>
        <template #menuItem="{item}">
          <MenuListItem
            :color="textStyle.type" 
            :label="item?.label ?? ''" 
            :iconPath="item?.iconPath ?? ''"
            :iconSize="14"
            :to="item?.to ?? ''"
            :badgeLabel="item?.badgeLabel"
          />
        </template>
        <template #footer>
          <Button :color="color" :iconPath="mdiLogout" rounded />
        </template>
      </SideBarMenu>
    </Teleport>
    <OverLayer v-model="showMobileMenu" />
  </div>
</template>