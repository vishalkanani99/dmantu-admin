<script setup>
import { ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiAccount, 
  mdiEmail,
  mdiRefresh
} from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import Field from '../components/form/Field.vue';
import Form from '../components/form/Form.vue';

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Form" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <Form
        title="Form"
        subTitle="( Two columns )"
        twoColumns
      >
        <FieldGroup label="Simple text field" labelFor="stf" >
          <Field id="stf" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with left icon" labelFor="stfli" >
          <Field id="stfli" :inputLeftIcon="mdiAccount" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with right icon" labelFor="stfri" >
          <Field id="stfri" :inputLeftIcon="mdiEmail" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with right button" labelFor="stfrb" multiFields>
          <Field id="stfrb" color="theme-light" left expanded />
          <Field type="button" color="theme" label="Button" right />
        </FieldGroup>
        <FieldGroup label="Simple text field with left button icon" labelFor="stflbi" multiFields>
          <Field type="button" :buttonIcon="mdiRefresh" color="theme" left />
          <Field id="stflbi" color="theme-light" right expanded />
        </FieldGroup>
        <FieldGroup label="Select field" labelFor="sf">
          <Field id="sf" type="select" color="theme-light">
            <option>Select Field</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Field>
        </FieldGroup>
        <FieldGroup label="Simple text field with static addons" labelFor="stflbi" multiFields>
          <Field type="static" color="theme-light" left >
            +1
          </Field>
          <Field id="stflbi" color="theme-light" middle expanded />
          <Field type="static" color="theme-light" right >
            US
          </Field>
        </FieldGroup>
        <FieldGroup label="Simple text field with select field and static addon at left" labelFor="stflbi" multiFields>
          <Field type="static" color="theme-light" left >
            $
          </Field>
          <Field id="stflbi" color="theme-light" middle expanded />
          <Field id="sf" type="select" color="theme-light" right >
            <option>Select Field</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Field>
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>