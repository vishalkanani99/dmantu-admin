<script setup>
import { reactive } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiAccount, 
  mdiEmail,
  mdiRefresh,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiEye,
  mdiEyeOff,
  mdiHeart, 
} from '@mdi/js';
import { theme } from '../../color';
import LayoutAuthenticated from '../../layouts/LayoutAuthenticated.vue';
import Section from '../../components/section/Section.vue';
import FieldGroup from '../../components/form/FieldGroup.vue';
import Field from '../../components/form/Field.vue';
import Form from '../../components/form/Form.vue';

const form = reactive({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: '',
  field9: '',
  name: '',
  pwd: '',
});

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Fields" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
    <Form
        title="Fields"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
        <FieldGroup label="Text field" horizontal>
          <Field v-model="form.field1" placeholder="Text field" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Text field" help="Text field with help message" horizontal>
          <Field v-model="form.field1" placeholder="Text field" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Text field with left icon" horizontal>
          <Field v-model="form.field2" placeholder="Text field with left icon" :inputLeftIcon="mdiAccount" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Text field with right icon" horizontal>
          <Field v-model="form.field3" placeholder="Text field with right icon" :inputRightIcon="mdiEmail" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Text field with color and error message" error="This field is required." horizontal >
          <Field
            v-model="form.field2" 
            placeholder="Text field with color and error message" 
            :inputLeftIcon="mdiAccount"
            :inputRightIcon="mdiAlertCircle" 
            color="danger-inverse" 
          />
        </FieldGroup>
        <FieldGroup label="Text field with color and success message" success="Success message" horizontal >
          <Field
            v-model="form.field3" 
            placeholder="Text field with color and success message" 
            :inputLeftIcon="mdiEmail"
            :inputRightIcon="mdiCheckCircle" 
            color="success-inverse"
          />
        </FieldGroup>
        <FieldGroup label="Text field with right button" multiFields horizontal>
          <Field v-model="form.field4" placeholder="Text field with right button" :color="theme.activeColors.inverse" left expanded />
          <Field type="button" :color="theme.activeColors.default" label="Button" right />
        </FieldGroup>
        <FieldGroup label="Text field with left button icon" multiFields horizontal>
          <Field type="button" :buttonIcon="mdiRefresh" :color="theme.activeColors.default" left />
          <Field v-model="form.field5" placeholder="Text field with left button icon" :color="theme.activeColors.inverse" right expanded />
        </FieldGroup>
        <FieldGroup label="Select field" horizontal>
          <Field v-model="form.field6" type="select" :color="theme.activeColors.inverse">
            <option value="">Select Field</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Field>
        </FieldGroup>
        <FieldGroup label="Text field with static addons" multiFields horizontal>
          <Field type="static" :color="theme.activeColors.inverse" left > +1 </Field>
          <Field v-model="form.field7" placeholder="Text field with static addons" :color="theme.activeColors.inverse" middle expanded />
          <Field type="static" :color="theme.activeColors.inverse" right > US </Field>
        </FieldGroup>
        <FieldGroup label="Text field with select field and static addon at left" multiFields horizontal>
          <Field type="static" :color="theme.activeColors.inverse" left > $ </Field>
          <Field v-model="form.field8" placeholder="Text field with select field and static addon at left" :color="theme.activeColors.inverse" middle expanded />
          <Field v-model="form.field9"  type="select" :color="theme.activeColors.inverse" right outerStyle="w-1/5" >
            <option value="">Select Field</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Field>
        </FieldGroup>
        <FieldGroup label="Textarea" help="Textarea help message" horizontal >
          <Field v-model="form.field7" type="textarea" placeholder="Textarea" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Textarea with color and error" error="Textarea with error message" horizontal >
          <Field 
            v-model="form.field7" 
            type="textarea" 
            placeholder="Textarea"
            :inputLeftIcon="mdiAlertCircle"
            :inputRightIcon="mdiCheckCircle" 
            color="danger-inverse" 
          />
        </FieldGroup>
        <FieldGroup label="File Upload" help="Maximum file size must be 2mb" horizontal >
          <Field v-model="form.file" type="file" :color="theme.activeColors.default" />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>