<script setup>
import { reactive } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
} from '@mdi/js';
import { theme } from '../../color';
import LayoutAuthenticated from '../../layouts/LayoutAuthenticated.vue';
import Section from '../../components/section/Section.vue';
import Card from '../../components/card/Card.vue';
import FieldGroup from '../../components/form/FieldGroup.vue';
import RangeSlider from '../../components/slider/RangeSlider.vue';

const form = reactive({
  slider: -200,
  slider1: 20,
  slider2: 20,
  range1: [10, 80],
  range2: [-40, 80],
  range3: [500, 200],
  range4: [50, 500],
});

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Range Sliders" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
      <Card title="Range Sliders" :color="theme.activeColors.inverse" noFooter>
        <FieldGroup class="mb-6" label="Slider">
          <RangeSlider 
            v-model="form.slider" 
            :color="theme.activeColors.default"
            :trackColor="theme.activeColors.dark"
            :handlerColor="theme.activeColors.dark"
            :min="-500"
            :max="500"
          />
        </FieldGroup>
        <FieldGroup class="mb-6" label="Slider Disabled">
          <RangeSlider 
            v-model="form.slider1" 
            :color="theme.activeColors.default"
            :trackColor="theme.activeColors.dark"
            :handlerColor="theme.activeColors.dark"
            :min="-500"
            :max="500"
            disabled
          />
        </FieldGroup>
        <FieldGroup class="mb-10" label="Slider With Divider Slot">
          <RangeSlider 
            v-model="form.slider2" 
            :color="theme.activeColors.default"
            :trackColor="theme.activeColors.dark"
            :tickColor="theme.activeColors.inverse"
            :handlerColor="theme.activeColors.dark"
            :min="0"
            :max="100"
            :divider="2"
          >
            <template #label="{tick}">
              <small v-if="tick === 1">Low</small>
              <small v-if="tick === 2">Normal</small>
              <small v-if="tick === 3">High</small>
            </template>
          </RangeSlider>
        </FieldGroup>
        <FieldGroup class="mb-6" label="Range Slider">
          <RangeSlider 
            v-model="form.range1"
            color="info" 
            trackColor="info-primary"
            handlerColor="info-inverse"
          />
        </FieldGroup>
        <FieldGroup class="mb-6" label="Range Slider With Min Max">
          <RangeSlider 
            v-model="form.range2" 
            :color="theme.activeColors.default"
            :trackColor="theme.activeColors.dark"
            :handlerColor="theme.activeColors.dark"
            :min="-50"
            :max="100"
          />
        </FieldGroup>
        <FieldGroup class="mb-6" label="Range Slider With Divider">
          <RangeSlider 
            v-model="form.range3" 
            :color="theme.activeColors.default"
            :trackColor="theme.activeColors.dark"
            :tickColor="theme.activeColors.inverse"
            :handlerColor="theme.activeColors.dark"
            :min="0"
            :max="1000"
            :divider="5"
          />
        </FieldGroup>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>