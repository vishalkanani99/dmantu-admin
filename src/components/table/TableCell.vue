<script setup>
import { computed } from "vue";

const props = defineProps({
  color: String,
  borderColor: String,
  noLabel:Boolean,
});

const defaultStyle = computed(() => {
  let style = [
    props.color,
    'flex flex-col xs:flex-row justify-center items-center',
    'md:table-cell',
    'py-3 px-4 md:p-3',
    'text-right md:text-left align-top md:align-middle',
    'border-b [&:not(:first-child)]:md:border-l md:border-b-0 last:border-b-0',
    'bg-[--color] border-[--color-l]',
    { 'text-[--color-inverse]': props.color },
  ];

  if( !props.noLabel ){
    style = [
      ...style,
      'xs:justify-between',
      'before:content-[attr(data-label)] before:font-semibold before:pr-3 before:text-left before:md:hidden',
    ]
  }
  return style;
})
</script>

<template>
  <td :class="defaultStyle">
    <slot></slot>
  </td>
</template>
