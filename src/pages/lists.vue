<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiCheckCircle,
} from '@mdi/js';
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
      btnColor="theme"
    >
      <Card title="Default" noFooter>
        <div class="flex items-center flex-wrap space-y-4 mb-6">

          <ListCard color="theme-dark" imgAlt="List 1" title="Theme Dark" subTitle="Sub Title" label="Label"></ListCard>
          <ListCard color="theme" imgAlt="List 2" title="Theme" subTitle="Sub Title" label="Label" labelColor="success"></ListCard>
          <ListCard color="theme-light" imgAlt="List 3" title="Theme Light" subTitle="Sub Title" label="Label"></ListCard>
          <ListCard color="black" imgAlt="List 4" title="Black" subTitle="Sub Title" label="Label" labelColor="danger"></ListCard>
          <ListCard color="gray" imgAlt="List 5" title="Gray" subTitle="Sub Title" label="Label" labelColor="info"></ListCard>
          <ListCard color="info" imgAlt="List 6" title="Info" subTitle="Sub Title" label="Label" labelColor="warning"></ListCard>
          <ListCard color="success" imgAlt="List 7" title="Success" subTitle="Sub Title"></ListCard>
          <ListCard color="warning" imgAlt="List 8" title="Warning" subTitle="Sub Title"></ListCard>
          <ListCard color="danger" imgAlt="List 9" title="Danger" subTitle="Sub Title"></ListCard>
        </div>
      </Card>
      <Card title="Outline" noFooter>
        <div class="flex items-center flex-wrap space-y-4 mb-6">
          <ListCard color="theme-dark" imgAlt="List 1" title="Theme Dark" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="theme" imgAlt="List 2" title="Theme" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="black" imgAlt="List 4" title="Black" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="gray" imgAlt="List 5" title="Gray" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="info" imgAlt="List 6" title="Info" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="success" imgAlt="List 7" title="Success" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="warning" imgAlt="List 8" title="Warning" subTitle="Sub Title" label="Label" outline></ListCard>
          <ListCard color="danger" imgAlt="List 9" title="Danger" subTitle="Sub Title" label="Label" outline></ListCard>
        </div>
      </Card>
      <Card title="Custom" noFooter>
        <div class="flex items-center flex-wrap space-y-4 mb-6">
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" hoverShadow>
            <template #labels>
              <Chip color="success" label="Success"></Chip>
              <Chip color="warning" label="Warning"></Chip>
              <Chip color="danger" label="Danger"></Chip>
            </template>
            <template #afterLabels>
              <h2>Default</h2>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" outline hoverShadow>
            <template #labels>
              <Chip color="success" label="Success"></Chip>
              <Chip color="warning" label="Warning"></Chip>
              <Chip color="danger" label="Danger"></Chip>
            </template>
            <template #afterLabels>
              <h2>Outline</h2>
            </template>
          </ListCard>
          <ListCard color="info" imgAlt="labels" title="List with labels" subTitle="Sub Title" outline hoverShadow>
            <template #listEnd>
              <div class="text-center md:text-right space-y-2">
                <p>Outline</p>
                <Chip color="success" label="Success" :iconPath="mdiCheckCircle" outline></Chip>
              </div>
            </template>
          </ListCard>
        </div>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>