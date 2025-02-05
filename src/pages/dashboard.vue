<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
  mdiPencil,
  mdiTrashCan,
  mdiTable,
  mdiPlus,
  mdiAccountPlus,
  mdiCart,
  mdiChartBar,
  mdiChartLine,
  mdiDotsVertical,
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiCheckCircleOutline,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Button from '../components/Button.vue';
import FieldOption from '../components/form/FieldOption.vue';
import ProgressCard from '../components/card/ProgressCard.vue';
import ListCard from '../components/card/ListCard.vue';
import Chip from '../components/Chip.vue';
import Dropdown from '../components/dropdown/Dropdown.vue';
import ProgressBar from '../components/progressbar/ProgressBar.vue';
import Avatar from '../components/Avatar.vue';
import Pagination from '../components/Pagination.vue';
import Table from '../components/table/Table.vue';
import TableHeader from '../components/table/TableHeader.vue';
import TableHeaderCell from '../components/table/TableHeaderCell.vue';
import TableRow from '../components/table/TableRow.vue';
import TableCell from '../components/table/TableCell.vue';
import TableBody from '../components/table/TableBody.vue';
import Carousel from '../components/slider/Carousel.vue';
import Steps from '../components/stepper/Steps.vue';
import Step from '../components/stepper/Step.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import Field from '../components/form/Field.vue';

const progress = ref(50);
const activePage = ref(1);

const slides = [
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/group-shopping.jpg',
    caption: 'slide 1'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/couple-shopping.jpg',
    caption: 'slide 2'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping.jpg',
    caption: 'slide 3'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping-3.jpg',
    caption: 'slide 4'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/baby.jpg',
    caption: 'slide 5'
  },
];

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  message: '',
});

const showPassword = shallowRef(false);
const step = shallowRef(1);

const updateStep = (i) => {
  let newStep = step.value + i;
  step.value = newStep <= 4 && newStep >= 1 ? newStep : step.value;
}
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Progress" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProgressCard 
          :progress="40" 
          color="info" 
          :number="88" 
          label="New Users"  
          :iconPath="mdiAccountPlus"
          trackColor="info-primary"
          activeTrackColor="white"
        />
        <ProgressCard 
          :progress="70" 
          color="warning" 
          :number="189" 
          label="Product Sold"  
          :iconPath="mdiCart"
          trackColor="warning-primary"
          activeTrackColor="white"
          infoColor="warning-primary" 
        />
        <ProgressCard 
          :progress="30" 
          color="success" 
          :number="45668"
          numberPrefix="$"  
          label="Profit"  
          :iconPath="mdiChartBar"
          trackColor="success-primary"
          activeTrackColor="white"
        />
        <ProgressCard 
          :progress="90" 
          color="danger" 
          :number="90"
          numberSuffix="%"  
          label="Performance"  
          :iconPath="mdiChartLine"
          trackColor="danger-primary"
          activeTrackColor="white"
          infoColor="danger-primary"
        />
      </div>
    </Section>
    <Section
      title="Carousel" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Carousel :slides="slides" />
    </Section>
    <Section
      title="Lists" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ListCard :color="theme.activeColors.default" imgAlt="labels" title="List with labels" subTitle="Sub Title" hoverShadow>
          <template #rightSectionItems>
            <Chip color="success" label="Success"></Chip>
            <Chip color="warning" label="Warning"></Chip>
            <Chip color="danger" label="Danger"></Chip>
          </template>
        </ListCard>
        <ListCard :color="theme.activeColors.default" imgAlt="status" title="List with labels" subTitle="Sub Title" outline hoverShadow>
          <template #rightSectionItems>
            <div class="flex flex-col items-end">
              <h4 class="self-start">Status</h4>
              <Chip color="success" label="Success"></Chip>
            </div>
          </template>
        </ListCard>
        <ListCard :color="theme.activeColors.default" imgAlt="menu" title="List with menu" subTitle="Sub Title" outline hoverShadow>
          <template #rightSectionItems>
            <Dropdown 
              :items="[
                {label: 'Edit', iconPath: mdiPencil}, 
                {label: 'Delete', iconPath: mdiTrashCan}
              ]">
              <template #selector>
                <Button
                  :iconPath="mdiDotsVertical"
                  outline
                  rounded 
                />
              </template>
            </Dropdown>
          </template>
        </ListCard>
        <ListCard :color="theme.activeColors.default" imgAlt="Progress" title="List with progress" subTitle="Sub Title" outline hoverShadow>
          <template #rightSection>
            <div class="flex flex-col items-center w-full md:w-1/3">
              <h4>Progress</h4>
              <ProgressBar
                class="!w-1/2 md:!w-full"
                v-model="progress"
                :trackColor="theme.activeColors.dark"
                :activeTrackColor="theme.activeColors.default" 
              />
            </div>
          </template>
        </ListCard>
      </div>
    </Section>
    <Section
      title="Table"
      :color="theme.activeColors.default" 
      :iconPath="mdiTable" 
      :btnIconPath="mdiCog"
    >
      <Table :color="theme.activeColors.default">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableHeaderCell>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Created On</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell noLabel>
              <span class="flex justify-center items-center">
                <FieldOption />
              </span>
            </TableCell>
            <TableCell noLabel data-label="Image">
              <div class="flex justify-center items-center">
                <Avatar class="w-12 h-12" username="John Doe" />
              </div>
            </TableCell>
            <TableCell data-label="Name">John Doe</TableCell>
            <TableCell data-label="Email">john@test.com</TableCell>
            <TableCell data-label="City">New York</TableCell>
            <TableCell data-label="Status">Active</TableCell>
            <TableCell data-label="Created On">19, Dec 2024</TableCell>
            <TableCell noLabel>
              <div class="flex justify-center items-center space-x-2">
                <Button :iconPath="mdiPencil" color="info" ></Button>
                <Button :iconPath="mdiTrashCan" color="danger" ></Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Pagination v-model="activePage" :recordsTotal="50" :color="theme.activeColors.default" :activeColor="theme.activeColors.dark"/>
    </Section>
    <Section
      title="Steppers" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card 
        :color="theme.activeColors.inverse"
        saveBtnLabel="Next" 
        cancelBtnLabel="Back" 
        noHeader 
        @save="updateStep(1)" 
        @cancel="updateStep(-1)"
      >
        <Steps v-model="step" :color="theme.activeColors.default">
          <Step label="Step 1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FieldGroup class="col-span-2" label="Message">
                <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
              </FieldGroup>
            </div>
          </Step>
          <Step label="Step 2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FieldGroup class="col-span-2" label="Message">
                <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
              </FieldGroup>
            </div>
          </Step>
          <Step label="Step 3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FieldGroup class="col-span-2" label="Message">
                <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
              </FieldGroup>
            </div>
          </Step>
          <Step label="Finish" disabled>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FieldGroup class="col-span-2" label="Message">
                <Field v-model="form.message" type="textarea" placeholder="Message" :color="theme.activeColors.inverse" />
              </FieldGroup>
            </div>
          </Step>
        </Steps>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>