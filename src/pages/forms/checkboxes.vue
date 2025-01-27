<script setup>
import { reactive } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
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
import FieldOption from '../../components/form/FieldOption.vue';
import Form from '../../components/form/Form.vue';

const form = reactive({
  checkboxes1: [],
  checkboxes2: ['2', '3', '4'],
  checkboxes3: ['3'],
  checkboxes4: [],
  radio: '2',
});

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Checkboxes" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
    <Form
        title="Checkboxes"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
      <FieldGroup label="Checkbox" optionsGroup horizontal >
          <FieldOption v-model="form.checkboxes1" label="Option 1" value="1" />
          <FieldOption v-model="form.checkboxes1" label="Option 2" value="2" disabled />
          <FieldOption v-model="form.checkboxes1" label="Option 2" value="3" />
        </FieldGroup>
        <FieldGroup label="Checkbox vertical layout" help="Vertical layout" optionsGroup verticalLayout horizontal >
          <FieldOption v-model="form.checkboxes2" label="Option 1" value="1" />
          <FieldOption v-model="form.checkboxes2" label="Option 2" value="2" />
          <FieldOption v-model="form.checkboxes2" color="success" label="Option 3 (Color Success)" value="3" />
          <FieldOption v-model="form.checkboxes2" color="danger" label="Option 4 (Color Danger)" value="4" />
          <FieldOption v-model="form.checkboxes2" color="info" value="5">
            <template #label>
              <span class="info text-[--color] pl-2">Option 5 (Custom label)</span>
            </template>
          </FieldOption>
        </FieldGroup>
        <FieldGroup label="Radio" optionsGroup horizontal >
          <FieldOption v-model="form.radio" type="radio" name="radio" label="Radio 1" value="1" />
          <FieldOption v-model="form.radio" type="radio" name="radio" label="Radio 2" value="2" />
          <FieldOption v-model="form.radio" type="radio" name="radio" label="Radio 3" value="3" disabled />
        </FieldGroup>
        <FieldGroup label="Switch vertical layout" help="Vertical layout" optionsGroup verticalLayout horizontal >
          <FieldOption v-model="form.checkboxes3" type="switch" color="info" label="Switch 1" value="1" disabled />
          <FieldOption v-model="form.checkboxes3" type="switch" color="danger" label="Switch 2" value="2" />
          <FieldOption v-model="form.checkboxes3" type="switch" color="warning" colorOnUncheck="white-primary" label="Switch 3" value="3" />
        </FieldGroup>
        <FieldGroup label="Icon Checkbox" help="Vertical layout" optionsGroup verticalLayout horizontal >
          <FieldOption 
            v-model="form.checkboxes4" 
            type="icon"
            colorOnUncheck="gray" 
            color="info" 
            :iconPath="mdiHeart" 
            label="Icon Checkbox 1" 
            value="1" 
            disabled 
          />
          <FieldOption 
            v-model="form.checkboxes4" 
            type="icon"
            colorOnUncheck="gray" 
            color="success" 
            :iconPath="mdiAlertCircle" 
            label="Icon Checkbox 2" 
            value="2" 
          />
          <FieldOption 
            v-model="form.checkboxes4" 
            type="icon"
            colorOnUncheck="gray" 
            color="danger" 
            :iconPath="mdiHeart" 
            label="Icon Checkbox 3" 
            value="3" 
          />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>