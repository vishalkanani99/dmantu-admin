<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Chip from '../components/Chip.vue';
import ListCard from '../components/card/ListCard.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Alerts" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Default" :color="theme.activeColors.inverse" noFooter>
        <div class="flex items-center flex-wrap space-y-4 mb-6">
          <ListCard color="theme" imgAlt="List 2" title="Theme" subTitle="Sub Title"></ListCard>
          <ListCard color="black" imgAlt="List 4" title="Black" subTitle="Sub Title"></ListCard>
          <ListCard color="gray" imgAlt="List 5" title="Gray" subTitle="Sub Title"></ListCard>
          <ListCard color="info" imgAlt="List 6" title="Info" subTitle="Sub Title"></ListCard>
          <ListCard color="success" imgAlt="List 7" title="Success" subTitle="Sub Title"></ListCard>
          <ListCard color="warning" imgAlt="List 8" title="Warning" subTitle="Sub Title"></ListCard>
          <ListCard color="danger" imgAlt="List 9" title="Danger" subTitle="Sub Title"></ListCard>
        </div>
      </Card>
      <Card title="Outline" :color="theme.activeColors.inverse" noFooter>
        <div class="flex items-center flex-wrap space-y-4 mb-6">
          <ListCard color="theme" imgAlt="List 2" title="Theme" subTitle="Sub Title" outline></ListCard>
          <ListCard color="black" imgAlt="List 4" title="Black" subTitle="Sub Title" outline></ListCard>
          <ListCard color="gray" imgAlt="List 5" title="Gray" subTitle="Sub Title" outline></ListCard>
          <ListCard color="info" imgAlt="List 6" title="Info" subTitle="Sub Title" outline></ListCard>
          <ListCard color="success" imgAlt="List 7" title="Success" subTitle="Sub Title" outline></ListCard>
          <ListCard color="warning" imgAlt="List 8" title="Warning" subTitle="Sub Title" outline></ListCard>
          <ListCard color="danger" imgAlt="List 9" title="Danger" subTitle="Sub Title" outline></ListCard>
        </div>
      </Card>
      <Card title="Custom" :color="theme.activeColors.inverse" noFooter>
        <div class="flex items-center flex-wrap space-y-4 mb-6">
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" hoverShadow>
            <template #rightSection>
              <Chip color="success" label="Success"></Chip>
              <Chip color="warning" label="Warning"></Chip>
              <Chip color="danger" label="Danger"></Chip>
              <h2>Default</h2>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" outline hoverShadow>
            <template #rightSection>
              <Chip color="success" label="Success"></Chip>
              <Chip color="warning" label="Warning"></Chip>
              <Chip color="danger" label="Danger"></Chip>
              <h2>Outline</h2>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" outline hoverShadow />
        </div>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>