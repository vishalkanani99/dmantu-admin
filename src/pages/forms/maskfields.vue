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
import Field from '../../components/form/Field.vue';
import Form from '../../components/form/Form.vue';
import MaskInput from '../../directives/masker/MaskInput.vue';
import MoneyInput from '../../directives/money/MoneyInput.vue';

const vMask = MaskInput;
const vMoney = MoneyInput;

const form = reactive({
  mask1: '2333333333', 
  mask2: '', 
  mask3: '', 
  money1: '',
  money2: '',
});

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Mask Fields" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
    <Form
        title="Mask Fields"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
        <FieldGroup label="Mask input for only digits" horizontal>
          <Field 
            v-model="form.mask1"
            v-mask="'(###) ###-###'" 
            placeholder="Mask input (###) ###-###" 
            :color="theme.activeColors.inverse"
          />
        </FieldGroup>
        <FieldGroup label="Mask input with escape characters" horizontal>
          <Field 
            v-model="form.mask2"
            v-mask="'!(+!1!) ####-####-##'" 
            placeholder="Mask input !(+!1!) ####-####-##" 
            :color="theme.activeColors.inverse"
          />
        </FieldGroup>
        <FieldGroup label="Mask input for only lowercase characters" horizontal>
          <Field 
            v-model="form.mask3"
            v-mask="'aaaaaa'" 
            placeholder="Mask input for a to z lowercase characters" 
            :color="theme.activeColors.inverse"
          />
        </FieldGroup>
        <FieldGroup label="Money input with prefix option" horizontal>
          <Field 
            v-model="form.money1"
            v-money="{prefix: '$'}" 
            placeholder="Money Input" 
            :color="theme.activeColors.inverse"
          />
        </FieldGroup>
        <FieldGroup label="Money input with suffix and precision options" horizontal>
          <Field 
            v-model="form.money2"
            v-money="{suffix: '/~', precision: 4}" 
            placeholder="Money Input" 
            :color="theme.activeColors.inverse"
          />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>