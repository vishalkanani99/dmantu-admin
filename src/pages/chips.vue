<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiAccount, 
  mdiEmail,
  mdiRefresh,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiEye,
  mdiEyeOff,
} from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Chip from '../components/Chip.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Chips" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <Card title="Default" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Chip color="theme-dark" label="Theme Dark"></Chip>
          <Chip color="theme" label="Theme"></Chip>
          <Chip color="theme-light" label="Theme Light"></Chip>
          <Chip color="white" label="white"></Chip>
          <Chip color="black" label="Black"></Chip>
          <Chip color="gray" label="Gray"></Chip>
          <Chip color="info" label="Info"></Chip>
          <Chip color="success" label="Success"></Chip>
          <Chip color="warning" label="Warning"></Chip>
          <Chip color="danger" label="Danger"></Chip>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Chip color="theme-dark" label="Theme Dark" :iconPath="mdiAccount"></Chip>
          <Chip color="theme" label="Theme" :iconPath="mdiEmail"></Chip>
          <Chip color="theme-light" label="Theme Light" :iconPath="mdiRefresh"></Chip>
          <Chip color="black" label="Black" :iconPath="mdiAlertCircle"></Chip>
          <Chip color="gray" label="Gray" :iconPath="mdiCheckCircle"></Chip>
          <Chip color="info" label="Info" :iconPath="mdiEye"></Chip>
          <Chip color="success" label="Success" :iconPath="mdiEyeOff"></Chip>
          <Chip color="warning" label="Warning" :iconPath="mdiFormSelect"></Chip>
          <Chip color="danger" label="Danger" :iconPath="mdiCog"></Chip>
        </div>
      </Card>
      <Card title="Outline" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Chip color="theme-dark" label="Theme Dark" outline></Chip>
          <Chip color="theme" label="Theme" outline></Chip>
          <Chip color="black" label="Black" outline></Chip>
          <Chip color="gray" label="Gray" outline></Chip>
          <Chip color="info" label="Info" outline></Chip>
          <Chip color="success" label="Success" outline></Chip>
          <Chip color="warning" label="Warning" outline></Chip>
          <Chip color="danger" label="Danger" outline></Chip>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Chip color="theme-dark" label="Theme Dark" :iconPath="mdiAccount" outline></Chip>
          <Chip color="theme" label="Theme" :iconPath="mdiEmail" outline></Chip>
          <Chip color="black" label="Black" :iconPath="mdiAlertCircle" outline></Chip>
          <Chip color="gray" label="Gray" :iconPath="mdiCheckCircle" outline></Chip>
          <Chip color="info" label="Info" :iconPath="mdiEye" outline></Chip>
          <Chip color="success" label="Success" :iconPath="mdiEyeOff" outline></Chip>
          <Chip color="warning" label="Warning" :iconPath="mdiFormSelect" outline></Chip>
          <Chip color="danger" label="Danger" :iconPath="mdiCog" outline></Chip>
        </div>
      </Card>
      <Card title="Rounded" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Chip color="theme-dark" label="Theme Dark" rounded></Chip>
          <Chip color="theme" label="Theme" rounded></Chip>
          <Chip color="theme-light" label="Theme Light" rounded></Chip>
          <Chip color="black" label="Black" rounded></Chip>
          <Chip color="gray" label="Gray" rounded></Chip>
          <Chip color="info" label="Info" rounded></Chip>
          <Chip color="success" label="Success" rounded></Chip>
          <Chip color="warning" label="Warning" rounded></Chip>
          <Chip color="danger" label="Danger" rounded></Chip>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Chip color="theme-dark" label="Theme Dark" :iconPath="mdiAccount" rounded></Chip>
          <Chip color="theme" label="Theme" :iconPath="mdiEmail" rounded></Chip>
          <Chip color="theme-light" label="Theme Light" :iconPath="mdiRefresh" rounded></Chip>
          <Chip color="black" label="Black" :iconPath="mdiAlertCircle" rounded></Chip>
          <Chip color="gray" label="Gray" :iconPath="mdiCheckCircle" rounded></Chip>
          <Chip color="info" label="Info" :iconPath="mdiEye" rounded></Chip>
          <Chip color="success" label="Success" :iconPath="mdiEyeOff" rounded></Chip>
          <Chip color="warning" label="Warning" :iconPath="mdiFormSelect" rounded></Chip>
          <Chip color="danger" label="Danger" :iconPath="mdiCog" rounded></Chip>
        </div>
      </Card>
      <Card title="Closable" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Chip color="theme-dark" label="Theme Dark" closable></Chip>
          <Chip color="theme" label="Theme" closable></Chip>
          <Chip color="theme-light" label="Theme Light" closable></Chip>
          <Chip color="white" label="white" closable></Chip>
          <Chip color="black" label="Black" closable></Chip>
          <Chip color="gray" label="Gray" closable></Chip>
          <Chip color="info" label="Info" closable></Chip>
          <Chip color="success" label="Success" closable></Chip>
          <Chip color="warning" label="Warning" closable></Chip>
          <Chip color="danger" label="Danger" closable></Chip>
        </div>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Chip color="theme-dark" label="Theme Dark" outline closable></Chip>
          <Chip color="theme" label="Theme" outline closable></Chip>
          <Chip color="black" label="Black" outline closable></Chip>
          <Chip color="gray" label="Gray" outline closable></Chip>
          <Chip color="info" label="Info" outline closable></Chip>
          <Chip color="success" label="Success" outline closable></Chip>
          <Chip color="warning" label="Warning" outline closable></Chip>
          <Chip color="danger" label="Danger" outline closable></Chip>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Chip color="theme-dark" label="Theme Dark" :iconPath="mdiAccount" rounded closable></Chip>
          <Chip color="theme" label="Theme" :iconPath="mdiEmail" rounded closable></Chip>
          <Chip color="theme-light" label="Theme Light" :iconPath="mdiRefresh" rounded closable></Chip>
          <Chip color="black" label="Black" :iconPath="mdiAlertCircle" rounded closable></Chip>
          <Chip color="gray" label="Gray" :iconPath="mdiCheckCircle" rounded closable></Chip>
          <Chip color="info" label="Info" :iconPath="mdiEye" rounded closable></Chip>
          <Chip color="success" label="Success" :iconPath="mdiEyeOff" rounded closable></Chip>
          <Chip color="warning" label="Warning" :iconPath="mdiFormSelect" rounded closable></Chip>
          <Chip color="danger" label="Danger" :iconPath="mdiCog" rounded closable></Chip>
        </div>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>