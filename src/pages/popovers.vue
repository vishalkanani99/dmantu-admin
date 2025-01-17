<script setup>
import { shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
  mdiTwitter,
  mdiFacebook,
  mdiInstagram 
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Button from '../components/Button.vue';
import Popover from '../components/Popover.vue';

const showPopover = shallowRef(true);
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Popovers" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Popovers" :color="theme.activeColors.inverse" noFooter>
        <template #content>
          <div class="p-6">
            <div class="flex items-center flex-wrap space-x-4 mb-6">
              <Popover text="Top" :color="theme.activeColors.dark">
                <Button label="Top" :color="theme.activeColors.default"></Button>
              </Popover>
              <Popover text="Bottom" position="bottom" :color="theme.activeColors.dark">
                <Button label="Bottom" :color="theme.activeColors.default"></Button>
              </Popover>
              <Popover text="Left" position="left" :color="theme.activeColors.dark">
                <Button label="Left" :color="theme.activeColors.default"></Button>
              </Popover>
              <Popover text="Right" position="right" :color="theme.activeColors.dark">
                <Button label="Right" :color="theme.activeColors.default"></Button>
              </Popover>
              <Popover v-model="showPopover" text="Right" :color="theme.activeColors.dark" controllable @click="showPopover = !showPopover">
                <Button label="Controllable" :color="theme.activeColors.default"></Button>
              </Popover>
              <Popover :color="theme.activeColors.dark">
                <template #popover>
                  <div class="flex items-center space-x-2">
                    <Button class="!p-1" :iconPath="mdiTwitter" :color="theme.activeColors.inverse" rounded></Button>
                    <Button class="!p-1" :iconPath="mdiFacebook" :color="theme.activeColors.inverse" rounded></Button>
                    <Button class="!p-1" :iconPath="mdiInstagram" :color="theme.activeColors.inverse" rounded></Button>
                  </div>
                </template>
                <Button label="Popover slot" :color="theme.activeColors.default"></Button>
              </Popover>
            </div>
          </div>
        </template>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>