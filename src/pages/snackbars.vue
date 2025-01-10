<script setup>
import { ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiAlertCircle,
} from '@mdi/js';
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
    >
      <Card title="Snackbars" noFooter>
        <div class="flex justify-center md:justify-start items-center space-x-2 md:space-x-16 mb-6">
          <FieldGroup class="hidden md:block" label="Origins" optionsGroup >
            <FieldOption v-model="origin" type="radio" name="origin" label="Top" value="top" />
            <FieldOption v-model="origin" type="radio" name="origin" label="Bottom" value="bottom" />
            <FieldOption v-model="origin" type="radio" name="origin" label="Left" value="left" />
            <FieldOption v-model="origin" type="radio" name="origin" label="Right" value="right" />
          </FieldGroup>
          <FieldGroup class="block md:hidden" label="Origins">
            <Field v-model="origin" type="select" color="theme-light">
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </Field>
          </FieldGroup>
          <FieldGroup class="hidden md:block" label="Direction" optionsGroup >
            <FieldOption v-model="direction" type="radio" name="direction" label="Top" value="top" />
            <FieldOption v-model="direction" type="radio" name="direction" label="Bottom" value="bottom" />
          </FieldGroup>
          <FieldGroup class="block md:hidden" label="Direction">
            <Field v-model="direction" type="select" color="theme-light">
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </Field>
          </FieldGroup>
          <FieldGroup class="hidden md:block" label="Position" optionsGroup >
            <FieldOption v-model="position" type="radio" name="position" label="Left" value="left" />
            <FieldOption v-model="position" type="radio" name="position" label="Right" value="right" />
            <FieldOption v-model="position" type="radio" name="position" label="Center" value="center" />
          </FieldGroup>
          <FieldGroup class="block md:hidden" label="Position">
            <Field v-model="position" type="select" color="theme-light">
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
            </Field>
          </FieldGroup>
          <FieldGroup label="Lifetime">
            <Field v-model="lifetime" color="theme-light"></Field>
          </FieldGroup>
        </div>
        <div class="flex justify-center md:justify-start items-center space-x-2 md:space-x-16 mb-6">
          <FieldGroup class="hidden md:block" label="Colors" optionsGroup >
            <FieldOption v-model="color" type="radio" name="color" label="Theme dark" value="theme-dark" />
            <FieldOption v-model="color" type="radio" name="color" label="Theme" value="theme" />
            <FieldOption v-model="color" type="radio" name="color" label="Theme light" value="theme-light" />
            <FieldOption v-model="color" type="radio" name="color" label="White" value="white" />
            <FieldOption v-model="color" type="radio" name="color" label="Black" value="black" />
            <FieldOption v-model="color" type="radio" name="color" label="Gray" value="gray" />
            <FieldOption v-model="color" type="radio" name="color" label="Info" value="info" />
            <FieldOption v-model="color" type="radio" name="color" label="Success" value="success" />
            <FieldOption v-model="color" type="radio" name="color" label="Warning" value="warning" />
            <FieldOption v-model="color" type="radio" name="color" label="Danger" value="danger" />
          </FieldGroup>
          <FieldGroup class="block md:hidden" label="Colors">
            <Field v-model="color" type="select" color="theme-light">
              <option value="theme-dark">Theme dark</option>
              <option value="theme">Theme</option>
              <option value="theme-light">Theme light</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="gray">Gray</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
            </Field>
          </FieldGroup>
        </div>
        <div class="flex flex-col md:flex-row items-center flex-wrap space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Button label="Snackbar" @click="create('Lorem Ipsum is simply dummy text of the printing and typesetting industry')"></Button>
          <Button label="Snackbar with header" @click="create('Title', 'Subtitle', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry')"></Button>
        </div> 
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