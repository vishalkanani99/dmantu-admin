<script setup>
  import { computed, ref } from 'vue';
  import { mdiUpload } from '@mdi/js';

  import { 
    border, 
    ring, 
    text, 
    background as backgroundColor,
    getDefaultTextStyle,
    getButtonStyle, 
  } from '../../color';
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
    color: {
      type: String,
      default: 'theme',
    },
    ringColor: String,
    borderColor: String,
    textColor: String,
    placeholderColor: String,
    label: String,
    buttonIcon: String,
    inputLeftIcon: String,
    inputRightIcon: String,
    outline: Boolean,
    expanded: Boolean,
    hasError: Boolean,
    hasSuccess: Boolean,
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

  const colors = computed(() => {
    const colors = {
      text: '',
      inner: [],
      outer: '',
    };

    if(props.hasError || props.hasSuccess) {
      let color = props.hasError ? 'danger' : 'success';
      let background = props.hasError ? 'bg-red-50' : 'bg-green-50';

      colors.text = text[color];
      colors.inner = [
        ring.focus[color], 
        background,
        text.placeholder[color],
      ];
      colors.outer = border[color];
      return colors;
    }

    colors.text = text[props.textColor] ?? getDefaultTextStyle(props.color).textColor;
    colors.inner = [
      ring.focus[props.ringColor ?? 'info'],
      backgroundColor[props.color],
      text.placeholder[props.placeholderColor],
    ];
    colors.outer = border[props.borderColor ?? 'theme'];
    return colors;
  });
  
  const outerStyle = computed(() => {
    let style = [ 'relative flex items-center' ];

    if( props.type === 'file' ) {
      return style;
    }

    return [
      ...style,
      { 'grow' : props.expanded },
      borderPosition.value,
      colors.value.outer,
      borderRadius.value,
      props.outerStyle,
    ];

  });

  const defaultStyle = computed(() => {
    const btnStyle = getButtonStyle(props.color, props.outline);
    let padding = ['pl-3 pr-3 py-2'];

    let style = [
      'flex items-center text-xs focus:outline-none focus:z-[1]',
      props.type === 'textarea' ? 'h-24' : 'h-10',
      borderRadius.value,
    ];

    if(props.type === 'button' || props.type === 'file') {
      return [
        style, 
        padding, 
        ...btnStyle, 
        { 'cursor-pointer' : props.type === 'file' }
      ];
    }

    if(props.inputLeftIcon) {
      padding.push('!pl-10');
    }
    if(props.inputRightIcon) {
      padding.push('!pr-10');
    }
    
    return [
      'w-full border-0 focus:ring-2',
      style,
      padding,
      ...colors.value.inner,
      colors.value.text,
    ];
  });

  const getInputIconStyle = (position) => {
    return ['absolute inline-flex justify-center items-center w-10 h-10 z-[2] cursor-pointer', position, colors.value.text];
  };

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
      isPlain 
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
        :class="getInputIconStyle('left-0')"
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
        :class="getInputIconStyle('right-0')"
        :path="inputRightIcon"
        @click="$emit('rightIconClick')" />
    </template>
  </div>
</template>