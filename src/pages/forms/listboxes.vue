<script setup>
import { reactive } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
} from '@mdi/js';
import { theme } from '../../color';
import LayoutAuthenticated from '../../layouts/LayoutAuthenticated.vue';
import Section from '../../components/section/Section.vue';
import FieldGroup from '../../components/form/FieldGroup.vue';
import ListBox from '../../components/form/ListBox.vue';
import AutoComplete from '../../components/form/AutoComplete.vue';
import ComboBox from '../../components/form/combobox/ComboBox.vue';
import Form from '../../components/form/Form.vue';


const optionsArrStr = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const optionsArrObjs = [
  { id: 1, name: 'Option 1'},
  { id: 2, name: 'Option 2'},
  { id: 3, name: 'Option 3'},
  { id: 4, name: 'Option 4'},
  { id: 5, name: 'Option 5'},
];

const optionsArrRecursiveObjs = [
  { id: 1, name: 'Option 1', children: [{ id: 6, name: 'Option z' }]},
  { id: 2, name: 'Option 2'},
  { id: 3, name: 'Option 3', children: [{ id: 7, name: 'Option x', children: [{ id: 8, name: 'Option y' }] }]},
  { id: 4, name: 'Option 4'},
  { id: 5, name: 'Option 5'},
];

const form = reactive({
  listbox1: 'Option 2',
  listbox2: 'Option 5',
  autocomplete1: '',
  autocomplete2: '',
  autocomplete3: '',
  combobox1: '',
  combobox2: [],
  combobox3: [],
  combobox4: [],
});

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="List Boxes" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
      <Form
        title="List Boxes"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
        <FieldGroup label="List box" horizontal>
          <ListBox 
            v-model="form.listbox1"
            :color="theme.activeColors.inverse"
            :options="optionsArrStr"
          />
        </FieldGroup>
        <FieldGroup label="List box with array of objects options" horizontal>
          <ListBox 
            v-model="form.listbox2"
            :color="theme.activeColors.inverse"
            :options="optionsArrObjs"
            displayKey="name"
          />
        </FieldGroup>
        <FieldGroup label="List box with specific color" horizontal>
          <ListBox 
            v-model="form.listbox1"
            :options="optionsArrStr"
            color="danger-inverse"
          />
        </FieldGroup>
      </Form>
      <Form
        title="Auto Completes"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
        <FieldGroup label="Auto complete" horizontal>
          <AutoComplete
            v-model="form.autocomplete1"
            :options="optionsArrStr"
            :color="theme.activeColors.inverse"
          />
        </FieldGroup>
        <FieldGroup label="Auto complete with array of objects options" horizontal>
          <AutoComplete
            v-model="form.autocomplete3"
            :options="optionsArrObjs"
            :color="theme.activeColors.inverse"
            displayKey="name"
          />
        </FieldGroup>
        <FieldGroup label="Auto complete with color" horizontal>
          <AutoComplete
            v-model="form.autocomplete2"
            :options="optionsArrObjs"
            color="success-inverse"
            displayKey="name"
          />
        </FieldGroup>
      </Form>
      <Form
        title="Combo Boxes"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
        <FieldGroup label="Combo box with array of strings options" horizontal>
          <ComboBox
            v-model="form.combobox1"
            :options="optionsArrStr"
            :color="theme.activeColors.inverse"
            displayKey="name" 
          />
        </FieldGroup>
        <FieldGroup label="Combo box with array of object options" horizontal>
          <ComboBox
            v-model="form.combobox2"
            :options="optionsArrObjs"
            :color="theme.activeColors.inverse"
            displayKey="name" 
          />
        </FieldGroup>
        <FieldGroup label="Combo box with recursive array options and specific color" horizontal>
          <ComboBox
            v-model="form.combobox3"
            :options="optionsArrRecursiveObjs"
            color="info-inverse"
            displayKey="name"
            recursiveKey="children" 
          />
        </FieldGroup>
        <FieldGroup label="Combo box with creatable tags" horizontal>
          <ComboBox
            v-model="form.combobox4"
            :options="optionsArrRecursiveObjs"
            :color="theme.activeColors.inverse"
            displayKey="name"
            taggable 
          />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>