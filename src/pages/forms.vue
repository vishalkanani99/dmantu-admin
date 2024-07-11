<script setup>
import { ref, shallowRef } from 'vue';
import { mdiFormSelect, mdiCog } from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import FieldGroup from '../components/FieldGroup.vue';
import Field from '../components/Field.vue';
import Card from '../components/card/Card.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Form" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <form>
        <FieldGroup label="Name" labelFor="name">
          <Field id="name" />
        </FieldGroup>
      </form>
      <Card
        title="First card"
        subTitle="Sub Title"
        closable
      >
        <p>lorem ipsum sit amet</p>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>