<script setup>
import { reactive, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiEmail,
  mdiEye,
  mdiEyeOff,
} from '@mdi/js';
import { theme } from '../../color';
import LayoutAuthenticated from '../../layouts/LayoutAuthenticated.vue';
import Section from '../../components/section/Section.vue';
import FieldGroup from '../../components/form/FieldGroup.vue';
import Field from '../../components/form/Field.vue';
import Form from '../../components/form/Form.vue';

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  message: '',
});

const showPassword = shallowRef(false);
const isFormValid = shallowRef(false);

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Forms" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
      <Form
        title="Form"
        subTitle="( Two columns )"
        color="white"
        :headerColor="theme.activeColors.default"
        :footerColor="theme.activeColors.default"
        :btnColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        twoColumns
      >
        <FieldGroup label="First Name" >
          <Field v-model="form.firstname" placeholder="First Name" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Last Name" >
          <Field v-model="form.lastname" placeholder="Last Name" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Email" >
          <Field v-model="form.email" placeholder="Email" :inputLeftIcon="mdiEmail" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Password">
          <Field 
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            :inputRightIcon="showPassword ? mdiEye : mdiEyeOff" 
            :color="theme.activeColors.inverse"
            @rightIconClick="showPassword = !showPassword" 
          />
        </FieldGroup>
        <FieldGroup class="md:col-span-2" label="Message">
          <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
        </FieldGroup>
      </Form>
      <Form
        title="Form"
        subTitle="( Three columns )"
        color="white"
        :headerColor="theme.activeColors.default"
        :footerColor="theme.activeColors.default"
        :btnColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        threeColumns
      >
        <FieldGroup label="Name" >
          <Field v-model="form.firstname" placeholder="Name" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Email" >
          <Field v-model="form.email" placeholder="Email" :inputLeftIcon="mdiEmail" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Password">
          <Field 
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            :inputRightIcon="showPassword ? mdiEye : mdiEyeOff" 
            :color="theme.activeColors.inverse"
            @rightIconClick="showPassword = !showPassword" 
          />
        </FieldGroup>
        <FieldGroup class="md:col-span-3" label="Message">
          <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
        </FieldGroup>
      </Form>
      <Form
        title="Form"
        subTitle="( Horizontal )"
        color="white"
        :headerColor="theme.activeColors.default"
        :footerColor="theme.activeColors.default"
        :btnColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
      >
        <FieldGroup label="First Name" horizontal>
          <Field v-model="form.firstname" placeholder="First Name" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Last Name" horizontal>
          <Field v-model="form.lastname" placeholder="Last Name" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Email" horizontal>
          <Field v-model="form.email" placeholder="Email" :inputLeftIcon="mdiEmail" :color="theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Password" horizontal>
          <Field 
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            :inputRightIcon="showPassword ? mdiEye : mdiEyeOff" 
            :color="theme.activeColors.inverse"
            @rightIconClick="showPassword = !showPassword" 
          />
        </FieldGroup>
        <FieldGroup label="Message" horizontal>
          <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
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
        color="white"
        :headerColor="theme.activeColors.default"
        :footerColor="theme.activeColors.default"
        :btnColor="isFormValid ? 'danger' : theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        @save="isFormValid = true"
        @cancel="isFormValid = false"
      >
        <FieldGroup label="First Name" :error="isFormValid ? 'Invalid Field' : ''">
          <Field v-model="form.firstname" placeholder="First Name" :color="isFormValid ? 'danger-inverse' : theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Last Name" :error="isFormValid ? 'Invalid Field' : ''">
          <Field v-model="form.lastname" placeholder="Last Name" :color="isFormValid ? 'danger-inverse' : theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Email" :error="isFormValid ? 'Invalid Field' : ''">
          <Field v-model="form.email" placeholder="Email" :inputLeftIcon="mdiEmail" :color="isFormValid ? 'danger-inverse' : theme.activeColors.inverse" />
        </FieldGroup>
        <FieldGroup label="Password" :error="isFormValid ? 'Invalid Field' : ''">
          <Field 
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            :inputRightIcon="showPassword ? mdiEye : mdiEyeOff" 
            :color="isFormValid ? 'danger-inverse' : theme.activeColors.inverse"
            @rightIconClick="showPassword = !showPassword" 
          />
        </FieldGroup>
        <FieldGroup label="Message" :error="isFormValid ? 'Invalid Field' : ''">
          <Field v-model="form.message" type="textarea" placeholder="Message" :color="isFormValid ? 'danger-inverse' : theme.activeColors.inverse" />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>