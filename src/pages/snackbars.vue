<script setup>
import { ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiAlertCircle,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Button from '../components/Button.vue';
import Field from '../components/form/Field.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import FieldOption from '../components/form/FieldOption.vue';
import Snackbar from '../components/snackbar/Snackbar.vue';

const origin = shallowRef('top');
const direction = shallowRef('top');
const position = shallowRef('center');
const color = shallowRef('theme');
const lifetime = shallowRef(5000);
const items = ref([]);

function create(title, subTitle = '', text = '') {
  items.value.push({ 
    title: title,
    subTitle: subTitle,
    text: text
  })
}

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Snackbars" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card
        title="Snackbars"
        class="flex flex-col md:w-7/12 lg:w-5/12 xl:w-4/12 md:mx-auto"
        saveBtnLabel="Create"
        cancelBtnLabel="Create with header"
        :color="theme.activeColors.inverse"
        :headerColor="theme.activeColors.default"
        :footerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        @save="create('Lorem Ipsum is simply dummy text of the printing and typesetting industry')"
        @cancel="create('Title', 'Subtitle', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry')"
      >
        <FieldGroup class="mb-6" label="Origins" optionsGroup>
          <FieldOption v-model="origin" type="radio" name="origin" label="Top" value="top" />
          <FieldOption v-model="origin" type="radio" name="origin" label="Bottom" value="bottom" />
          <FieldOption v-model="origin" type="radio" name="origin" label="Left" value="left" />
          <FieldOption v-model="origin" type="radio" name="origin" label="Right" value="right" />
        </FieldGroup>
        <FieldGroup class="mb-6" label="Direction" optionsGroup >
          <FieldOption v-model="direction" type="radio" name="direction" label="Top" value="top" />
          <FieldOption v-model="direction" type="radio" name="direction" label="Bottom" value="bottom" />
        </FieldGroup>
        <FieldGroup class="mb-6" label="Position" optionsGroup >
          <FieldOption v-model="position" type="radio" name="position" label="Left" value="left" />
          <FieldOption v-model="position" type="radio" name="position" label="Right" value="right" />
          <FieldOption v-model="position" type="radio" name="position" label="Center" value="center" />
        </FieldGroup>
        <FieldGroup class="mb-6" label="Lifetime">
          <Field v-model="lifetime" :color="theme.activeColors.inverse"></Field>
        </FieldGroup>
        <FieldGroup class="mb-6" label="Colors" optionsGroup >
          <FieldOption v-model="color" type="radio" name="color" label="Theme" value="theme" />
          <FieldOption v-model="color" type="radio" name="color" label="White" value="white" />
          <FieldOption v-model="color" type="radio" name="color" label="Black" value="black" />
          <FieldOption v-model="color" type="radio" name="color" label="Gray" value="gray" />
          <FieldOption v-model="color" type="radio" name="color" label="Info" value="info" />
          <FieldOption v-model="color" type="radio" name="color" label="Success" value="success" />
          <FieldOption v-model="color" type="radio" name="color" label="Warning" value="warning" />
          <FieldOption v-model="color" type="radio" name="color" label="Danger" value="danger" />
        </FieldGroup>
      </Card>
      <Snackbar 
        v-model="items" 
        :position="position" 
        :origin="origin" 
        :direction="direction" 
        :color="color" 
        :icon="mdiAlertCircle"
        :lifetime="lifetime"
      />
    </Section>
  </LayoutAuthenticated>
</template>