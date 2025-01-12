<script setup>
  import { computed, ref } from 'vue';
  import { mdiUpload } from '@mdi/js';
  import Button from '../Button.vue';
  import Icon from '../Icon.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Number, Array, FileList, File, Object, null],
    },
    outerStyle: {
      type: [String, Array],
    },
    middle: Boolean,
    right: Boolean,
    left: Boolean,
    rounded: Boolean,
    color: String,
    label: String,
    buttonIcon: String,
    inputLeftIcon: String,
    inputRightIcon: String,
    outline: Boolean,
    expanded: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'leftIconClick', 'rightIconClick']);

  const selectedFiles = ref();

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });

  const borderRadius = computed(() => {
    return [
      { 'rounded-r-none rounded-l-none' : props.middle },
      { 'rounded-r-none' : props.left },
      { 'rounded-l-none' : props.right },
      props.rounded ? 'rounded-full' : 'rounded-md',
    ];
  });

  const borderPosition = computed(() => {
    return [
      { 'border-t border-b' : props.middle },
      { 'border-t border-b border-l' : props.left },
      { 'border-t border-b border-r' : props.right },
      { 'border' : !props.middle && !props.left && !props.right },
    ];
  });
  
  const outerStyle = computed(() => {
    let style = [
      props.color, 
      'relative flex items-center border-[--color-inverse]' 
    ];

    if( props.type === 'file' ) {
      return style;
    }

    return [
      ...style,
      { 'grow' : props.expanded },
      borderPosition.value,
      borderRadius.value,
      props.outerStyle,
    ];

  });

  const defaultStyle = computed(() => {
    
    if(props.type === 'button' || props.type === 'file') {
      return [ 'focus:z-[1] h-10', borderRadius.value ];
    }
    
    return [
      props.color,
      'flex items-center w-full py-2',
      'text-xs focus:outline-none focus:z-[1] border-0 focus:ring',
      props.type === 'textarea' ? 'h-24' : 'h-10',
      props.inputLeftIcon ? 'pl-10' : 'pl-3',
      props.inputRightIcon ? 'pr-10' : 'pr-3',
      'bg-[--color] text-[--color-inverse] placeholder-[--color-l] focus:ring-[--color-l]',
      borderRadius.value,
    ];
  });

  const fileInput = (event) => {
    modelValue.value = event.target.files;

    selectedFiles.value = '';
    for( let file of  event.target.files ) {
      selectedFiles.value = selectedFiles.value + file.name + ', ';
    }
    selectedFiles.value = selectedFiles.value.substring(0, selectedFiles.value.length - 2);
  }
</script>
<template>
  <div :class="outerStyle">
    <select 
      v-if="type === 'select'" 
      v-model="modelValue"
      v-bind="$attrs"
      :class="defaultStyle">
      <slot></slot>
    </select>
    <div 
      v-else-if="type === 'static'"
      v-bind="$attrs"
      :class="defaultStyle">
      <slot></slot>
    </div>
    <Button 
      v-else-if="type === 'button' || type === 'link'"
      v-bind="$attrs"
      :type="type"
      :label="label"
      :class="defaultStyle"
      :iconPath="buttonIcon"
      :color="color" 
    >
      <slot></slot>
    </Button>
    <template v-else-if="type === 'file'">
      <label>
        <Field
          type="link"
          :label="label ?? 'Upload'"
          :buttonIcon="buttonIcon ?? mdiUpload"
          :color="color"
          :left="Boolean(selectedFiles)"
        />
        <input 
          v-bind="$attrs" 
          type="file" 
          class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-[1]"
          @change="fileInput" 
        />
      </label>
      <Field v-if="selectedFiles" type="static" right>
        <span class="text-etext-ellipsis">{{ selectedFiles }}</span>
      </Field>
    </template>
    <template v-else>
      <Icon 
        v-if="inputLeftIcon"
        :class="[
          'absolute left-0',
          'inline-flex justify-center items-center',
          'w-10 h-10 z-[2]',
          'text-[--color-inverse] cursor-pointer',
        ]"
        :path="inputLeftIcon"
        @click="$emit('leftIconClick')" />
      <textarea 
        v-if="type === 'textarea'"
        v-bind="$attrs"
        v-model="modelValue"
        :class="defaultStyle">
      </textarea>
      <input
        v-else
        :type="type"
        v-bind="$attrs" 
        v-model="modelValue" 
        :class="defaultStyle" />
      <Icon  
        v-if="inputRightIcon"
        :class="[
          'absolute right-0',
          'inline-flex justify-center items-center',
          'w-10 h-10 z-[2]',
          'text-[--color-inverse] cursor-pointer',
        ]"
        :path="inputRightIcon"
        @click="$emit('rightIconClick')" />
    </template>
  </div>
</template>