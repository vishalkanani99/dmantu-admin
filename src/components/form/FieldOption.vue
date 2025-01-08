<script setup>
import { computed } from 'vue'; 
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
  color: String,
  iconPath: String,
  label: String,
  rootEl: String,
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
    'before:border before:border-[--color] peer-checked:before:border-[--color]',
    'before:rounded-full',
  ];

  const ringStyle = [
    'peer-focus:ring-2 peer-focus:ring-[--color]',
  ];

  const radius = [
    props.type === 'checkbox' ? 'rounded' : 'rounded-full'
  ];

  return [
    props.color,
    'border border-[--color] peer-checked:border-[--color]',
    { 'peer-checked:border-4': props.type !== 'switch' },
    props.type === 'switch' ? switchBtnStyle : '',
    ...ringStyle,
    ...radius,
  ];
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
  
  if( props.type === 'icon' ) {
    return [
      props.color,
      'bg-transparent text-[--color-inverse] peer-checked:text-[--color]',
    ];
  }

  return [
    props.color,
    'bg-[--color-inverse] peer-checked:bg-[--color]',
    { 'before:bg-[--color-inverse]': props.type === 'switch' },
    { 'peer-checked:bg-[url("/done.svg")]' : props.type === 'checkbox' },
    { 'peer-checked:bg-[url("/dot.svg")]' : props.type === 'radio' },
    { 'peer-checked:bg-cover peer-checked:bg-no-repeat peer-checked:bg-center' : props.type !== 'switch' },
  ];
  
});

const disabledStyle = computed(() => [
  'peer-disabled:opacity-30 peer-disabled:cursor-not-allowed',
]);

const inputType = computed(() =>
  props.type === "radio" ? "radio" : "checkbox"
);

const rootEl = computed(() => props.rootEl ?? 'label' );
</script>

<template>
  <component
    :is="rootEl" 
    class="inline-flex items-center cursor-pointer"
    v-bind="{
      class: $attrs.class,
      style: $attrs.style,
    }"
  >
    <input
      v-model="modelValue"
      v-bind="{
        value: $attrs.value,
        onClick: $attrs.onClick, 
        onChange: $attrs.onChange, 
        onInput: $attrs.onInput, 
      }"
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
  </component>
</template>
