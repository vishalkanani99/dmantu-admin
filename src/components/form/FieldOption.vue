<script setup>
import { computed } from 'vue';
import {
  background,
  border,
  ring,
  text,
} from '../../color' 
import Icon from '../Icon.vue';

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  type: {
    type: String,
    default: "checkbox",
    validator: (value) => ["checkbox", "radio", "switch", "icon"].includes(value),
  },
  bgOnUncheck: {
    type: String,
    default: "white",
  },
  color: {
    type: String,
    default: "theme",
  },
  iconPath: String,
  borderColor: String,
  label: String,
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const borderStyle = computed(() => {
  const switchBtnStyle = [
    'before:border',
    border.before[props.borderColor ?? props.color],
    border['peer-checked:before'][props.borderColor ?? props.color],
    'before:rounded-full',
  ];

  const ringStyle = [
    'peer-focus:ring-2',
    ring['peer-focus'][props.color],
  ];

  const radius = [
    props.type === 'checkbox' ? 'rounded' : 'rounded-full'
  ];

  let style = [
    'border',
    border[props.borderColor ?? props.color],
    border['peer-checked'][props.borderColor ?? props.color],
    { 'peer-checked:border-4': props.type !== 'switch' },
    ...ringStyle,
    ...radius,
  ];

  if( props.type === 'switch' ) {
    style = [
      ...style,
      switchBtnStyle
    ];
  }

  return style;
});

const mixedStyle = computed(() => {
  const switchBtnStyle = [
    'before:content-[""] before:block before:w-5 before:h-5',
    'peer-checked:before:translate-x-[110%]',
  ];

  let style = [
    'transition-colors duration-200',
    { 'block w-6 h-6': props.type !== 'switch' },
  ];

  if( props.type === 'icon' ) {
    return style;
  }

  if( props.type === 'switch' ) {
    style = [
      'flex items-center shrink-0 w-12 h-6 p-0.5',
      ...style,
      ...switchBtnStyle,
    ];
  }

  return style;
});

const backgroundStyle = computed(() => {
  const style = [
    background[props.bgOnUncheck],
    background['peer-checked'][props.color],
    props.type === 'switch' ? background['before'][props.bgOnUncheck] : '',
    { 'peer-checked:bg-[url("/done.svg")]' : props.type === 'checkbox' },
    { 'peer-checked:bg-[url("/dot.svg")]' : props.type === 'radio' },
    { 'peer-checked:bg-cover peer-checked:bg-no-repeat peer-checked:bg-center' : props.type !== 'switch' },
  ];

  if( props.type === 'icon' ) {
    return [
      'bg-transparent',
      text[props.bgOnUncheck], 
      text['peer-checked'][props.color],
    ];
  }

  return style;
});

const disabledStyle = computed(() => [
  'peer-disabled:opacity-30 peer-disabled:cursor-not-allowed',
]);

const inputType = computed(() =>
  props.type === "radio" ? "radio" : "checkbox"
);
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      v-model="modelValue"
      v-bind="$attrs"
      :type="inputType"
      class="hidden opacity-0 peer"
    />
    <Icon 
      v-if="type === 'icon'" 
      :class="[
        mixedStyle,
        backgroundStyle, 
        disabledStyle
      ]" 
      :path="iconPath" 
      size="24" 
      isPlain
    />
    <span 
      v-else 
      :class="[
        borderStyle, 
        mixedStyle, 
        backgroundStyle, 
        disabledStyle
      ]" 
    />
    <span 
      v-if="label" 
      :class="['pl-2', disabledStyle]"
    >
      {{ label }}
    </span>
  </label>
</template>
