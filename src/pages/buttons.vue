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
import Button from '../components/Button.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Buttons" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <Card title="Default" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Button color="theme-dark" label="Theme Dark"></Button>
          <Button color="theme" label="Theme"></Button>
          <Button color="theme-light" label="Theme Light"></Button>
          <Button color="white" label="white"></Button>
          <Button color="black" label="Black"></Button>
          <Button color="gray" label="Gray"></Button>
          <Button color="info" label="Info"></Button>
          <Button color="success" label="Success"></Button>
          <Button color="warning" label="Warning"></Button>
          <Button color="danger" label="Danger"></Button>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Button color="theme-dark" label="Theme Dark" :iconPath="mdiAccount"></Button>
          <Button color="theme" label="Theme" :iconPath="mdiEmail"></Button>
          <Button color="theme-light" label="Theme Light" :iconPath="mdiRefresh"></Button>
          <Button color="black" label="Black" :iconPath="mdiAlertCircle"></Button>
          <Button color="gray" label="Gray" :iconPath="mdiCheckCircle"></Button>
          <Button color="info" label="Info" :iconPath="mdiEye"></Button>
          <Button color="success" label="Success" :iconPath="mdiEyeOff"></Button>
          <Button color="warning" label="Warning" :iconPath="mdiFormSelect"></Button>
          <Button color="danger" label="Danger" :iconPath="mdiCog"></Button>
        </div>
      </Card>
      <Card title="Outline" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Button color="theme-dark" label="Theme Dark" outline></Button>
          <Button color="theme" label="Theme" outline></Button>
          <Button color="black" label="Black" outline></Button>
          <Button color="gray" label="Gray" outline></Button>
          <Button color="info" label="Info" outline></Button>
          <Button color="success" label="Success" outline></Button>
          <Button color="warning" label="Warning" outline></Button>
          <Button color="danger" label="Danger" outline></Button>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Button color="theme-dark" label="Theme Dark" :iconPath="mdiAccount" outline></Button>
          <Button color="theme" label="Theme" :iconPath="mdiEmail" outline></Button>
          <Button color="black" label="Black" :iconPath="mdiAlertCircle" outline></Button>
          <Button color="gray" label="Gray" :iconPath="mdiCheckCircle" outline></Button>
          <Button color="info" label="Info" :iconPath="mdiEye" outline></Button>
          <Button color="success" label="Success" :iconPath="mdiEyeOff" outline></Button>
          <Button color="warning" label="Warning" :iconPath="mdiFormSelect" outline></Button>
          <Button color="danger" label="Danger" :iconPath="mdiCog" outline></Button>
        </div>
      </Card>
      <Card title="Rounded" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Button color="theme-dark" label="Theme Dark" rounded></Button>
          <Button color="theme" label="Theme" rounded></Button>
          <Button color="theme-light" label="Theme Light" rounded></Button>
          <Button color="black" label="Black" rounded></Button>
          <Button color="gray" label="Gray" rounded></Button>
          <Button color="info" label="Info" rounded></Button>
          <Button color="success" label="Success" rounded></Button>
          <Button color="warning" label="Warning" rounded></Button>
          <Button color="danger" label="Danger" rounded></Button>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Button color="theme-dark" label="Theme Dark" :iconPath="mdiAccount" rounded></Button>
          <Button color="theme" label="Theme" :iconPath="mdiEmail" rounded></Button>
          <Button color="theme-light" label="Theme Light" :iconPath="mdiRefresh" rounded></Button>
          <Button color="black" label="Black" :iconPath="mdiAlertCircle" rounded></Button>
          <Button color="gray" label="Gray" :iconPath="mdiCheckCircle" rounded></Button>
          <Button color="info" label="Info" :iconPath="mdiEye" rounded></Button>
          <Button color="success" label="Success" :iconPath="mdiEyeOff" rounded></Button>
          <Button color="warning" label="Warning" :iconPath="mdiFormSelect" rounded></Button>
          <Button color="danger" label="Danger" :iconPath="mdiCog" rounded></Button>
        </div>
      </Card>
      <Card title="Icon" noFooter>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Button color="theme-dark" :iconPath="mdiAccount"></Button>
          <Button color="theme" :iconPath="mdiEmail"></Button>
          <Button color="theme-light" :iconPath="mdiRefresh"></Button>
          <Button color="black" :iconPath="mdiAlertCircle"></Button>
          <Button color="gray" :iconPath="mdiCheckCircle"></Button>
          <Button color="info" :iconPath="mdiEye"></Button>
          <Button color="success" :iconPath="mdiEyeOff"></Button>
          <Button color="warning" :iconPath="mdiFormSelect"></Button>
          <Button color="danger" :iconPath="mdiCog"></Button>
        </div>
        <div class="flex items-center flex-wrap space-x-4 mb-6">
          <Button color="theme-dark" :iconPath="mdiAccount" rounded></Button>
          <Button color="theme" :iconPath="mdiEmail" rounded></Button>
          <Button color="theme-light" :iconPath="mdiRefresh" rounded></Button>
          <Button color="black" :iconPath="mdiAlertCircle" rounded></Button>
          <Button color="gray" :iconPath="mdiCheckCircle" rounded></Button>
          <Button color="info" :iconPath="mdiEye" rounded></Button>
          <Button color="success" :iconPath="mdiEyeOff" rounded></Button>
          <Button color="warning" :iconPath="mdiFormSelect" rounded></Button>
          <Button color="danger" :iconPath="mdiCog" rounded></Button>
        </div>
        <div class="flex items-center flex-wrap space-x-4">
          <Button color="theme-dark" :iconPath="mdiAccount" rounded outline></Button>
          <Button color="theme" :iconPath="mdiEmail" rounded outline></Button>
          <Button color="black" :iconPath="mdiAlertCircle" rounded outline></Button>
          <Button color="gray" :iconPath="mdiCheckCircle" rounded outline></Button>
          <Button color="info" :iconPath="mdiEye" rounded outline></Button>
          <Button color="success" :iconPath="mdiEyeOff" rounded outline></Button>
          <Button color="warning" :iconPath="mdiFormSelect" rounded outline></Button>
          <Button color="danger" :iconPath="mdiCog" rounded outline></Button>
        </div>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>