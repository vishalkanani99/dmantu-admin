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
import Form from '../../components/form/Form.vue';
import DatePicker from '../../components/datetimepicker/DatePicker.vue';
import Calendar from '../../components/datetimepicker/calendar/Calendar.vue';

const form = reactive({
  date1: new Date('2022', '04', '05'),
  date2: new Date('2024', '07', '05'),
  date3: new Date(),
});

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Date Pickers" 
      :color="theme.activeColors.default"
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
    >
    <Form
        title="Date Pickers"
        color="white"
        :headerColor="theme.activeColors.default"
        :bodyColor="theme.activeColors.default"
        noFooter
      >
        <FieldGroup label="Date Picker" horizontal>
          <DatePicker 
            v-model="form.date1" 
            :inputColor="theme.activeColors.inverse" 
            :calendarColor="theme.activeColors.inverse" 
          />
        </FieldGroup>
        <FieldGroup label="Date Picker With Modal View" horizontal>
          <DatePicker 
            v-model="form.date2" 
            :inputColor="theme.activeColors.inverse" 
            :calendarColor="theme.activeColors.inverse"
            hasModalView 
          />
        </FieldGroup>
        <FieldGroup label="Calender" :help="form.date3.toString()" horizontal>
          <Calendar 
            v-model="form.date3" 
            class="w-full md:w-1/2 lg:w-1/3" 
            :btnColor="theme.activeColors.default"
            hasTimer
            isTwelveHrsView 
          />
        </FieldGroup>
      </Form>
    </Section>
  </LayoutAuthenticated>
</template>