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
import { theme } from '../color';
import AutoComplete from './form/AutoComplete.vue';
import Button from './Button.vue';
import Dropdown from './dropdown/Dropdown.vue';
import Avatar from './Avatar.vue';
import Icon from './Icon.vue';
import SideBarMenu from './sidebar/SideBarMenu.vue';
import SideBarHeader from './sidebar/SideBarHeader.vue';
import MenuListItem from './menu/MenuListItem.vue';
import OverLayer from './OverLayer.vue';
import Card from './card/Card.vue';
import ListCard from './card/ListCard.vue';
import CardHeader from './card/CardHeader.vue';
import CardFooter from './card/CardFooter.vue';
import CardBody from './card/CardBody.vue';
import Chip from './Chip.vue';

const props = defineProps({
  hasMenuBtn: Boolean,
});

const emit = defineEmits(['toggleMenu']);
const showMobileMenu = shallowRef(false);
const search = ref();

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
      theme.activeColors.default,
      'fixed top-0 inset-x-0 flex justify-between items-center h-20 px-6 py-4 gap-2',
      'bg-[--color] text-[--color-inverse] shadow-xl',
    ]"
  >
    <Button 
      v-if="hasMenuBtn" 
      class="order-first" 
      :color="theme.activeColors.inverse" 
      :iconPath="mdiMenu" 
      @click="$emit('toggleMenu')" 
    />
    <AutoComplete
      v-model="search"
      class="w-full md:w-1/4"
      :color="theme.activeColors.inverse"
      :options="optionsArrObjs"
      displayKey="value"
      :fieldProps="{
        color: theme.activeColors.inverse,
        placeholder: 'Search',
        inputLeftIcon: mdiMagnify,
        rounded: true,
      }"
    />
    <div class="hidden md:flex order-last items-center gap-2">
      <Dropdown :bgColor="theme.activeColors.inverse" :items="items" maxHeight>
        <template #selector>
          <Button :color="theme.activeColors.inverse" :iconPath="mdiBellOutline" size="small" :badgeColor="theme.activeColors.dark" hasAnimatedBadge />
        </template>
        <Card class="w-96 h-96" :color="theme.activeColors.inverse">
          <template #header>
            <CardHeader class="!px-3 !py-2" :separatorColor="theme.activeColors.default">
              <template #title>
                <strong>Notifications</strong>
              </template>
              <Chip label="9 new" :color="theme.activeColors.default" />
            </CardHeader>
          </template>
          <template #content>
            <CardBody class="!p-0" scrollable>
              <div class="flex items-center flex-wrap gap-px">
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="John Doe">
                  <template #title>
                    <strong>John Doe</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="30 minutes ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="Gian Leon">
                  <template #title>
                    <strong>Gian Leon</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="50 minutes ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="Ariadna Meireles">
                  <template #title>
                    <strong>Ariadna Meireles</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="1 hour ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="Guilherme Matias">
                  <template #title>
                    <strong>Guilherme Matias</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="2 hours ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
              </div>
            </CardBody>
          </template>
          <template #footer>
            <CardFooter class="!px-3 !py-2 justify-center" :separatorColor="theme.activeColors.default">
              <Button :color="theme.activeColors.default" label="Read more" isPlain />
            </CardFooter>
          </template>
        </Card>
      </Dropdown>
      <Dropdown :bgColor="theme.activeColors.inverse" :items="items" maxHeight>
        <template #selector>
          <Button :color="theme.activeColors.inverse" :iconPath="mdiEmailOutline" size="small" :badgeColor="theme.activeColors.dark" badgeLabel="+4" />
        </template>
        <Card class="w-96 h-96" :color="theme.activeColors.inverse">
          <template #header>
            <CardHeader class="!px-3 !py-2" :separatorColor="theme.activeColors.default">
              <template #title>
                <strong>Messages</strong>
              </template>
              <Chip label="4 new" :color="theme.activeColors.default" />
            </CardHeader>
          </template>
          <template #content>
            <CardBody class="!p-0" scrollable>
              <div class="flex items-center flex-wrap gap-px">
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="John Doe">
                  <template #title>
                    <strong>John Doe</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="30 minutes ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="Gian Leon">
                  <template #title>
                    <strong>Gian Leon</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="50 minutes ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="Ariadna Meireles">
                  <template #title>
                    <strong>Ariadna Meireles</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="1 hour ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
                <ListCard class="!p-2 !rounded-none" :color="theme.activeColors.default" imgAlt="Guilherme Matias">
                  <template #title>
                    <strong>Guilherme Matias</strong>
                    <p class="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Chip label="2 hours ago" :color="theme.activeColors.inverse" size="small" />
                  </template>
                </ListCard>
              </div>
            </CardBody>
          </template>
          <template #footer>
            <CardFooter class="!px-3 !py-2 justify-center" :separatorColor="theme.activeColors.default">
              <Button :color="theme.activeColors.default" label="Read more" isPlain />
            </CardFooter>
          </template>
        </Card>
      </Dropdown>
      <Dropdown :bgColor="theme.activeColors.inverse" :items="items">
        <template #selector="{ btnIcon }">
          <div class="flex items-center gap-2 cursor-pointer">
            <Avatar :color="theme.activeColors.inverse" username="John Doe" class="w-8 h-8" />
            <span>John Doe</span>
            <Icon :path="btnIcon" />
          </div>
        </template>
      </Dropdown>
    </div>
    <Button  
      class="md:hidden order-last" 
      :color="theme.activeColors.inverse" 
      :iconPath="mdiDotsVertical"
      rounded 
      @click="showMobileMenu = true" 
    />
    <Teleport to="body">
      <SideBarMenu
        class="md:hidden" 
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
        :color="theme.activeColors.inverse"
        position="right" 
        isClosable 
      >
        <template #headerBody>
          <SideBarHeader
            class="!px-5" 
            :btnColor="theme.activeColors.default" 
            isClosable
            @close="showMobileMenu = false"
          >
            <div class="flex w-full items-center gap-2">
              <Avatar :color="theme.activeColors.default" username="John Doe" class="w-8 h-8" />
              <span class="text-base">John Doe</span>
            </div>
          </SideBarHeader>
        </template>
        <template #menuItem="{item}">
          <MenuListItem
            :color="theme.activeColors.inverse" 
            :label="item?.label ?? ''" 
            :iconPath="item?.iconPath ?? ''"
            :to="item?.to ?? ''"
          >
            <template #badge>
              <Chip
                v-if="item.badgeLabel"
                class="justify-center w-7 h-7"
                :color="theme.activeColors.default"
                :label="item.badgeLabel"
                rounded 
              />
            </template>
          </MenuListItem>
        </template>
        <template #footer>
          <Button :color="theme.activeColors.default" :iconPath="mdiLogout" rounded />
        </template>
      </SideBarMenu>
    </Teleport>
    <OverLayer v-model="showMobileMenu" />
  </div>
</template>