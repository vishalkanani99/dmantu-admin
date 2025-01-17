<script setup>
import { ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Steps from '../components/stepper/Steps.vue';
import Step from '../components/stepper/Step.vue';

const activeStep = shallowRef(3);
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Steppers" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Stepper" :color="theme.activeColors.inverse" noFooter>
        <Steps>
          <Step label="Step 1">
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubSteple source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
          </Step>
          <Step label="Step 2">
            <ul>
              <li><span class="w-24 font-bold inline-block">one:</span> One</li>
              <li><span class="w-24 font-bold inline-block">two:</span> Two</li>
            </ul>
          </Step>
          <Step label="Step 3">
            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
          </Step>
          <Step label="Step 4" disabled>
            <ul>
              <li><span class="w-24 font-bold inline-block">one:</span> One</li>
              <li><span class="w-24 font-bold inline-block">two:</span> Two</li>
            </ul>
          </Step>
        </Steps>
      </Card>

      <Card title="Vertical Stepper" :color="theme.activeColors.inverse" noFooter>
        <Steps v-model="activeStep" vertical>
          <Step label="Step 1">
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubSteple source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
          </Step>
          <Step label="Step 2">
            <ul>
              <li><span class="w-24 font-bold inline-block">one:</span> One</li>
              <li><span class="w-24 font-bold inline-block">two:</span> Two</li>
            </ul>
          </Step>
          <Step label="Step 3">
            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
          </Step>
          <Step label="Step 4" disabled>
            <ul>
              <li><span class="w-24 font-bold inline-block">one:</span> One</li>
              <li><span class="w-24 font-bold inline-block">two:</span> Two</li>
            </ul>
          </Step>
        </Steps>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>