<script setup>
import { reactive } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import Progress from '../components/progressbar/Progress.vue';
import ProgressBar from '../components/progressbar/ProgressBar.vue';

const form = reactive({
  progress1: 500,
  progress2: 100,
  progress3: 100,
});
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Progress Bars" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Progress Bars" :color="theme.activeColors.inverse" noFooter>
        <FieldGroup label="Progress Bar">
          <ProgressBar 
            v-model="form.progress1" 
            class="mb-4" 
            :trackColor="theme.activeColors.default" 
            :activeTrackColor="theme.activeColors.dark" 
            :max="1000" 
          />
        </FieldGroup>
        <FieldGroup label="Progress Bar With Progress Slot">
          <ProgressBar v-model="form.progress2" class="mb-4" :max="100" >
            <template #progress>
              <Progress
                :value="20"
                color="info"
                roundedL 
              >
              </Progress>
              <Progress
                :value="30"
                color="danger" 
              >
              </Progress>
              <Progress
                :value="40"
                color="warning"
              >
              </Progress> 
            </template>
          </ProgressBar>
        </FieldGroup>
        <FieldGroup label="Progress Bar With Progress Label Slot">
          <ProgressBar v-model="form.progress3" :max="100" >
            <template #progress>
              <Progress
                :value="50"
                color="info"
                roundedL 
              >
                Completed
              </Progress>
              <Progress
                :value="50"
                color="danger"
                roundedR 
              >
                Remaining
              </Progress>
            </template>
          </ProgressBar>
        </FieldGroup>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>