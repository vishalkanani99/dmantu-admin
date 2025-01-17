<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog, 
  mdiAccount, 
  mdiEmail,
  mdiRefresh,
  mdiAlertCircle,
  mdiHeart,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Modal from '../components/Modal.vue'; 
import Dialog from '../components/Dialog.vue'; 
import Button from '../components/Button.vue';
import Field from '../components/form/Field.vue';
import FieldGroup from '../components/form/FieldGroup.vue';
import FieldOption from '../components/form/FieldOption.vue';

const showModal = shallowRef(false);
const showDialog = shallowRef(false);
const modalSize = shallowRef('medium');
const modalProp = shallowRef();
const dialogProp = shallowRef();
const modalOrigin = shallowRef('top');

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
  checkbox: '2',
  checkboxes: [ '2', '3' ],
  file: '',
});


function toggleModal(size, prop = null) {
  modalSize.value = size;
  modalProp.value = prop;
  showModal.value = !showModal.value;
}

function toggleDialog(prop = null) {
  dialogProp.value = prop;
  showDialog.value = !showDialog.value;
}

</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Modals" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Modals" :color="theme.activeColors.inverse" noFooter>
        <FieldGroup class="mb-6 hidden md:block" label="Modal Origins" optionsGroup >
          <FieldOption v-model="modalOrigin" type="radio" name="origin" label="Top" value="top" />
          <FieldOption v-model="modalOrigin" type="radio" name="origin" label="Bottom" value="bottom" />
          <FieldOption v-model="modalOrigin" type="radio" name="origin" label="Left" value="left" />
          <FieldOption v-model="modalOrigin" type="radio" name="origin" label="Right" value="right" />
          <FieldOption v-model="modalOrigin" type="radio" name="origin" label="Center" value="center" />
        </FieldGroup>
        <FieldGroup class="mb-6 block md:hidden" label="Modal Origins">
          <Field v-model="modalOrigin" type="select" color="theme-light">
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
          </Field>
        </FieldGroup>
        <div class="flex flex-col md:flex-row items-center flex-wrap space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Button label="Modal" @click="toggleModal('medium')"></Button>
          <Button label="Modal Small" @click="toggleModal('small')"></Button>
          <Button label="Modal Large" @click="toggleModal('large')"></Button>
          <Button label="Modal Full" @click="toggleModal('full')"></Button>
          <Button label="Modal Scrollable" @click="toggleModal('medium', 'scrollable')"></Button>
          <Button label="Modal Imortal" @click="toggleModal('medium', 'imortal')"></Button>
          <Button label="Form Modal" @click="toggleModal('large', 'form')"></Button>
        </div> 
      </Card>
      <Card title="Dialogs" :color="theme.activeColors.inverse" noFooter>
        <div class="flex flex-col md:flex-row items-center flex-wrap space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Button label="Dialog" @click="toggleDialog()"></Button>
          <Button label="Dialog with Icon" @click="toggleDialog('icon')"></Button>
        </div>
      </Card>
      <Modal 
        v-model="showModal" 
        :size="modalSize" 
        title="Modal Title"
        :scrollable="modalProp === 'scrollable' || modalProp === 'form'" 
        :imortal="modalProp === 'imortal' || modalProp === 'form'"
        :origin="modalOrigin"
        :hasForm="modalProp === 'form'"
        :twoColumns="modalProp === 'form'"
        :color="theme.activeColors.inverse"
      >
        <template v-if="modalProp === 'form'">
          <FieldGroup label="Simple text field" help="Simple text field">
            <Field v-model="form.field1" placeholder="Simple text field" :color="theme.activeColors.inverse" />
          </FieldGroup>
          <FieldGroup label="Simple text field with left icon" error="This field is required." >
            <Field
              v-model="form.field2" 
              placeholder="Simple text field with left icon" 
              :inputLeftIcon="mdiAccount" 
              color="danger-inverse"
            />
          </FieldGroup>
          <FieldGroup label="Simple text field with right icon" success=" " >
            <Field
              v-model="form.field3" 
              placeholder="Simple text field with right icon" 
              :inputLeftIcon="mdiEmail" 
              color="success-inverse"
            />
          </FieldGroup>
          <FieldGroup label="Simple text field with right button" multiFields >
            <Field v-model="form.field4" placeholder="Simple text field with right button" :color="theme.activeColors.inverse" left expanded />
            <Field type="button" :color="theme.activeColors.default" label="Button" right />
          </FieldGroup>
          <FieldGroup label="Simple text field with left button icon" multiFields >
            <Field type="button" :buttonIcon="mdiRefresh" :color="theme.activeColors.default" left />
            <Field v-model="form.field5" placeholder="Simple text field with left button icon" :color="theme.activeColors.inverse" right expanded horizontal />
          </FieldGroup>
          <FieldGroup label="Select field" >
            <Field v-model="form.field6" type="select" :color="theme.activeColors.inverse">
              <option value="">Select Field</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </Field>
          </FieldGroup>
          <FieldGroup class="md:col-span-2" label="Simple textarea" help="Simple textarea" >
            <Field v-model="form.field7" type="textarea" placeholder="Simple textarea" :color="theme.activeColors.inverse" />
          </FieldGroup>
          <FieldGroup label="File Upload" help="Maximum file size must be 2mb" >
            <Field v-model="form.file" type="file" :color="theme.activeColors.default" />
          </FieldGroup>
          <FieldGroup label="Checkbox inputs" optionsGroup >
            <FieldOption v-model="form.checkbox" label="Option 1" value="1" />
            <FieldOption v-model="form.checkbox" label="Option 2" value="2" disabled />
            <FieldOption v-model="form.checkbox" label="Option 2" value="3" />
          </FieldGroup>
          <FieldGroup label="Checkbox inputs" help="Vertical layout" optionsGroup verticalLayout >
            <FieldOption v-model="form.checkboxes" label="Option 1" value="1" />
            <FieldOption v-model="form.checkboxes" label="Option 2" value="2" />
            <FieldOption v-model="form.checkboxes" color="success" label="Option 2" value="3" />
          </FieldGroup>
          <FieldGroup label="Radio inputs" optionsGroup >
            <FieldOption v-model="form.checkbox" type="radio" name="radio" label="Radio 1" value="1" />
            <FieldOption v-model="form.checkbox" type="radio" name="radio" label="Radio 2" value="2" />
            <FieldOption v-model="form.checkbox" type="radio" name="radio" label="Radio 3" value="3" disabled />
          </FieldGroup>
          <FieldGroup label="Switch inputs" help="Vertical layout" optionsGroup verticalLayout >
            <FieldOption v-model="form.checkboxes" type="switch" color="info" label="Switch 1" value="1" disabled />
            <FieldOption v-model="form.checkboxes" type="switch" color="danger" label="Switch 2" value="2" />
            <FieldOption v-model="form.checkboxes" type="switch" color="warning" label="Switch 3" value="3" />
          </FieldGroup>
          <FieldGroup label="Icon Checkbox Inputs" help="Vertical layout" optionsGroup verticalLayout >
            <FieldOption 
              v-model="form.checkboxes" 
              type="icon"
              colorOnUncheck="gray" 
              color="info" 
              :iconPath="mdiHeart" 
              label="Icon Checkbox 1" 
              value="1" 
              disabled 
            />
            <FieldOption 
              v-model="form.checkboxes" 
              type="icon"
              colorOnUncheck="gray" 
              color="success" 
              :iconPath="mdiAlertCircle" 
              label="Icon Checkbox 2" 
              value="2" 
            />
            <FieldOption 
              v-model="form.checkboxes" 
              type="icon"
              colorOnUncheck="gray" 
              color="danger" 
              :iconPath="mdiHeart" 
              label="Icon Checkbox 3" 
              value="3" 
            />
          </FieldGroup>
        </template>
        <div v-else>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
      </Modal> 
      <Dialog 
        v-model="showDialog" 
        :iconPath="dialogProp === 'icon' ? mdiAlertCircle : null" 
        :iconBgColor="dialogProp === 'icon' ? 'danger' : null"
        :color="theme.activeColors.inverse" 
        title="Please confirm">
        Are you sure want to delete ? If you confirm, It will be deleted permanantly. 
      </Dialog>
    </Section>
  </LayoutAuthenticated>
</template>