<script setup>
import { computed } from 'vue';
import FieldHelp from './FieldHelp.vue';

const props = defineProps({
  label: String,
  color: String,
  labelFor: String,
  help: String,
  error: String,
  success: String,
  errors: Array,
  horizontal: Boolean,
  multiFields: Boolean,
  optionsGroup: Boolean,
  verticalLayout: Boolean,
});

const labelStyle = computed(() => {
  let color = props.color;
  if(props.error || props.errors || props.success) {
    color = props.error || props.errors ? 'danger' : 'success';
  }
  return [color, 'inline-block font-bold text-[--color] mb-2'];
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
      :class="labelStyle"
    >
      {{ label }}
    </label>
    <div  
      :class="[
        {'md:col-span-4': horizontal},
        {'md:col-start-2': horizontal && label},
      ]"
    >  
      <div :class="[ 
          { 'flex': multiFields || optionsGroup }, 
          { 'items-center': multiFields || ( optionsGroup && !verticalLayout ) }, 
          { 'space-x-4' : optionsGroup && !verticalLayout },
          { 'space-y-4' : optionsGroup && verticalLayout },
          { 'flex-col' : verticalLayout },  
        ]" 
      >
        <slot></slot>
      </div>
      <FieldHelp :text="error" type="error" class="has-error"/>
      <FieldHelp v-for="(err, i) in errors" :key="i" :text="err" type="error" class="has-error"/>
      <FieldHelp :text="success" type="success" class="has-success"/>
      <FieldHelp :text="help" class="has-help"/>
    </div>
  </div>
</template>