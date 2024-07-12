<script setup>
import { computed } from 'vue';
import FieldHelp from './FieldHelp.vue';

const props = defineProps({
  label: String,
  labelFor: String,
  help: String,
  error: String,
  success: String,
  errors: Array,
  horizontal: Boolean,
  multiFields: Boolean,
});
</script>
<template>
  <div 
    :class="[ 
      {'grid grid-cols-1 md:gap-6 md:grid-cols-5': horizontal }
    ]"
  >
    <label 
      v-if="label" 
      :for="labelFor" 
      class="inline-block font-bold mb-2"
    >
      {{ label }}
    </label>
    <div  
      :class="[
        {'md:col-span-4': horizontal},
        {'md:col-start-2': horizontal && label},
        {'flex items-center': multiFields},
      ]"
    >  
      <slot></slot>
      <FieldHelp :text="error" type="error" class="has-error"/>
      <FieldHelp v-for="(err, i) in errors" :key="i" :text="err" type="error" class="has-error"/>
      <FieldHelp :text="success" type="success" class="has-success"/>
      <FieldHelp :text="help" class="has-help"/>
    </div>
  </div>
</template>