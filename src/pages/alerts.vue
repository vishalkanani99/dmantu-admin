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
import Alert from '../components/Alert.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Alerts" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
      <Card title="Available Types" noFooter>
        <div class="flex items-center flex-wrap space-y-4">
          <Alert type="success" boldText="Success" text="text"></Alert>
          <Alert type="warning" boldText="Warning" text="text"></Alert>
          <Alert type="danger" boldText="Danger" text="text"></Alert>
          <Alert type="info" boldText="Info" text="text"></Alert>
        </div>
      </Card>
      <Card title="Available Colors" noFooter>
        <div class="flex items-center flex-wrap space-y-4">
          <Alert color="theme-dark" text="Theme Dark" :iconPath="mdiAccount"></Alert>
          <Alert color="theme" text="Theme" :iconPath="mdiEmail"></Alert>
          <Alert color="theme-light" text="Theme Light" :iconPath="mdiRefresh"></Alert>
          <Alert color="black" text="Black" :iconPath="mdiAlertCircle"></Alert>
          <Alert color="gray" text="Gray" :iconPath="mdiCheckCircle"></Alert>
          <Alert color="info" text="Info" :iconPath="mdiEye"></Alert>
          <Alert color="success" text="Success" :iconPath="mdiEyeOff"></Alert>
          <Alert color="warning" text="Warning" :iconPath="mdiFormSelect"></Alert>
          <Alert color="danger" text="Danger" :iconPath="mdiCog"></Alert>
        </div>
      </Card>
      <Card title="Outline" noFooter>
        <div class="flex items-center flex-wrap space-y-4">
          <Alert color="theme-dark" text="Theme Dark" :iconPath="mdiAccount" outline></Alert>
          <Alert color="theme" text="Theme" :iconPath="mdiEmail" outline></Alert>
          <Alert color="black" text="Black" :iconPath="mdiAlertCircle" outline></Alert>
          <Alert color="gray" text="Gray" :iconPath="mdiCheckCircle" outline></Alert>
          <Alert color="info" text="Info" :iconPath="mdiEye" outline></Alert>
          <Alert color="success" text="Success" :iconPath="mdiEyeOff" outline></Alert>
          <Alert color="warning" text="Warning" :iconPath="mdiFormSelect" outline></Alert>
          <Alert color="danger" text="Danger" :iconPath="mdiCog" outline></Alert>
        </div>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>