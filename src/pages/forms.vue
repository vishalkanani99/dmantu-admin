<script setup>
import { ref, shallowRef } from 'vue';
import { mdiFormSelect, mdiCog } from '@mdi/js';
import SectionTitle from '../components/SectionTitle.vue';
import FieldGroup from '../components/FieldGroup.vue';
import Field from '../components/Field.vue';

</script>
<template>
  <div class="space-y-6">
    <SectionTitle 
      title="Form" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme" 
    />
    <form>
      <FieldGroup label="Name" labelFor="name">
        <Field id="name" />
      </FieldGroup>
    </form>
  </div>
</template>