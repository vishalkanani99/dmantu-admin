<script setup>
import { shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
  mdiTwitter,
  mdiFacebook,
  mdiInstagram 
} from '@mdi/js';
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
      btnColor="theme"
    >
      <Card title="Popovers" noFooter>
        <template #content>
          <div class="p-6">
            <div class="flex items-center flex-wrap space-x-4 mb-6">
              <Popover text="Top">
                <Button label="Top"></Button>
              </Popover>
              <Popover text="Bottom" position="bottom">
                <Button label="Bottom"></Button>
              </Popover>
              <Popover text="Left" position="left">
                <Button label="Left"></Button>
              </Popover>
              <Popover text="Right" position="right">
                <Button label="Right"></Button>
              </Popover>
              <Popover v-model="showPopover" text="Right" controllable @click="showPopover = !showPopover">
                <Button label="Controllable"></Button>
              </Popover>
              <Popover>
                <template #popover>
                  <div class="flex items-center space-x-2">
                    <Button class="!p-1" :iconPath="mdiTwitter" color="theme-light" rounded></Button>
                    <Button class="!p-1" :iconPath="mdiFacebook" color="theme-light" rounded></Button>
                    <Button class="!p-1" :iconPath="mdiInstagram" color="theme-light" rounded></Button>
                  </div>
                </template>
                <Button label="Popover slot"></Button>
              </Popover>
            </div>
          </div>
        </template>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>