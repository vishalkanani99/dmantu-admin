<script setup>
import { reactive, ref, shallowRef } from 'vue';
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
} from '@mdi/js';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import Field from '../components/form/Field.vue';
import Form from '../components/form/Form.vue';

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

const showPassword = shallowRef(false);
const isFormValid = shallowRef(false);

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Forms" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog" 
      btnColor="theme"
    >
      <Form
        title="Form"
        subTitle="( Two columns )"
        twoColumns
      >
        <FieldGroup label="Simple text field" >
          <Field v-model="form.field1" placeholder="Simple text field" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with left icon" >
          <Field v-model="form.field2" placeholder="Simple text field with left icon" :inputLeftIcon="mdiAccount" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with right icon" >
          <Field v-model="form.field3" placeholder="Simple text field with right icon" :inputLeftIcon="mdiEmail" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with right button" multiFields>
          <Field v-model="form.field4" placeholder="Simple text field with right button" color="theme-light" left expanded />
          <Field type="button" color="theme" label="Button" right />
        </FieldGroup>
        <FieldGroup label="Simple text field with left button icon" multiFields>
          <Field type="button" :buttonIcon="mdiRefresh" color="theme" left />
          <Field v-model="form.field5" placeholder="Simple text field with left button icon" color="theme-light" right expanded />
        </FieldGroup>
        <FieldGroup label="Select field" >
          <Field v-model="form.field6" type="select" color="theme-light">
            <option value="">Select Field</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Field>
        </FieldGroup>
        <FieldGroup label="Simple text field with static addons" multiFields>
          <Field type="static" color="theme-light" left > +1 </Field>
          <Field v-model="form.field7" placeholder="Simple text field with static addons" color="theme-light" middle expanded />
          <Field type="static" color="theme-light" right > US </Field>
        </FieldGroup>
        <FieldGroup label="Simple text field with select field and static addon at left" multiFields>
          <Field type="static" color="theme-light" left > $ </Field>
          <Field v-model="form.field8" placeholder="Simple text field with select field and static addon at left" color="theme-light" middle expanded />
          <Field v-model="form.field9"  type="select" color="theme-light" right outerStyle="w-1/5" >
            <option value="">Select Field</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Field>
        </FieldGroup>
      </Form>
      <Form
        title="Form"
        subTitle="( Three columns )"
        threeColumns
      >
        <FieldGroup label="Simple text field" help="Simple text field" >
          <Field v-model="form.field1" placeholder="Simple text field" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with left icon" error="This field is required." >
          <Field
            v-model="form.field2" 
            placeholder="Simple text field with left icon" 
            :inputLeftIcon="mdiAccount" 
            color="theme-light" 
            hasError
          />
        </FieldGroup>
        <FieldGroup label="Simple text field with right icon" success=" ">
          <Field
            v-model="form.field3" 
            placeholder="Simple text field with right icon" 
            :inputLeftIcon="mdiEmail"
            :inputRightIcon="mdiCheckCircle" 
            color="theme-light"
            hasSuccess
          />
        </FieldGroup>
        <FieldGroup label="Simple text field with right button" multiFields>
          <Field v-model="form.field4" placeholder="Simple text field with right button" color="theme-light" left expanded />
          <Field type="button" color="theme" label="Button" right />
        </FieldGroup>
        <FieldGroup label="Simple text field with left button icon" multiFields>
          <Field type="button" :buttonIcon="mdiRefresh" color="theme" left />
          <Field v-model="form.field5" placeholder="Simple text field with left button icon" color="theme-light" right expanded />
        </FieldGroup>
        <FieldGroup label="Select field">
          <Field v-model="form.field6" type="select" color="theme-light">
            <option value="">Select Field</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Field>
        </FieldGroup>
      </Form>
      <Form
        title="Form"
        subTitle="( Horizontal )"
      >
        <FieldGroup label="Simple text field" help="Simple text field" horizontal >
          <Field v-model="form.field1" placeholder="Simple text field" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple text field with left icon" error="This field is required." horizontal >
          <Field
            v-model="form.field2" 
            placeholder="Simple text field with left icon" 
            :inputLeftIcon="mdiAccount" 
            color="theme-light" 
            hasError
          />
        </FieldGroup>
        <FieldGroup label="Simple text field with right icon" success=" " horizontal >
          <Field
            v-model="form.field3" 
            placeholder="Simple text field with right icon" 
            :inputLeftIcon="mdiEmail" 
            color="theme-light"
            hasSuccess
          />
        </FieldGroup>
        <FieldGroup label="Simple text field with right button" multiFields horizontal >
          <Field v-model="form.field4" placeholder="Simple text field with right button" color="theme-light" left expanded />
          <Field type="button" color="theme" label="Button" right />
        </FieldGroup>
        <FieldGroup label="Simple text field with left button icon" multiFields horizontal >
          <Field type="button" :buttonIcon="mdiRefresh" color="theme" left />
          <Field v-model="form.field5" placeholder="Simple text field with left button icon" color="theme-light" right expanded horizontal />
        </FieldGroup>
        <FieldGroup label="Select field" horizontal >
          <Field v-model="form.field6" type="select" color="theme-light">
            <option value="">Select Field</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Field>
        </FieldGroup>
        <FieldGroup label="Simple textarea" help="Simple textarea" horizontal >
          <Field v-model="form.field7" type="textarea" placeholder="Simple textarea" color="theme-light" />
        </FieldGroup>
        <FieldGroup label="Simple textarea with error and icons" error="Simple textarea with error and icons" horizontal >
          <Field 
            v-model="form.field8" 
            type="textarea" 
            placeholder="Simple textarea with error and icons" 
            color="theme-light"
            :inputLeftIcon="mdiAlertCircle"
            :inputRightIcon="mdiCheckCircle" 
            hasError 
          />
        </FieldGroup>
      </Form>
      <Form
        title="Login Form"
        subTitle="( Click on Validate to animate )"
        :class="[
          'flex flex-col md:w-7/12 lg:w-5/12 xl:w-4/12 md:mx-auto',
          { 'animate-shake' :  isFormValid },
        ]"
        saveBtnLabel="Validate"
        cancelBtnLabel="Reset"
        @save="isFormValid = true"
        @cancel="isFormValid = false"
      >
        <FieldGroup label="Name" :error="isFormValid ? 'Invalid Field' : ''">
          <Field v-model="form.name" placeholder="Name" :inputLeftIcon="mdiAccount" color="theme-light" :hasError="isFormValid"/>
        </FieldGroup>
        <FieldGroup label="Password" :error="isFormValid ? 'Invalid Field' : ''">
          <Field 
            v-model="form.pwd"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            :inputRightIcon="showPassword ? mdiEye : mdiEyeOff" 
            color="theme-light"
            :hasError="isFormValid"
            @rightIconClick="showPassword = !showPassword" 
          />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>