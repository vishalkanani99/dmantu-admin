<script setup>
import { shallowRef, ref } from 'vue';
import { RouterView } from 'vue-router';
import { mdiMedal } from '@mdi/js';
import SideBar from './components/SideBar.vue'
import OverLayer from './components/OverLayer.vue';
import Button from './components/Button.vue';
import Field from './components/Field.vue';
import FieldGroup from './components/FieldGroup.vue';

const showSideBar = shallowRef(false);
const showOverLayer = shallowRef(false);
const searchField = ref();
</script>

<template>
  <div>
    <Button label="Show Sidebar" @click="showOverLayer = !showOverLayer, showSideBar = !showSideBar" />
    <FieldGroup>
      <Field v-model="searchField" type="button" :icon-path="mdiMedal" left/>
      <Field v-model="searchField" middle/>
      <Field v-model="searchField" type="select" color="info" right rounded>
        <option>Hello</option>
        <option>How are you</option>
        <option>good bye</option>
      </Field>
      <Field v-model="searchField" type="textarea"/>
    </FieldGroup>
    <SideBar v-model="showSideBar" class="z-50" @close="showOverLayer = false" />
    <RouterView />
    <OverLayer v-model="showOverLayer" @close="showSideBar = false" />
  </div>
</template>
