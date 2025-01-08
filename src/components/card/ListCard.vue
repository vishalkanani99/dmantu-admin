<script setup>
import { computed } from 'vue';
import Avatar from '../Avatar.vue';

const props = defineProps({
  color: String,
  imgSrc: String,
  imgAlt: String,
  title: String,
  subTitle: String,
  outline: Boolean,
  hoverShadow: Boolean,
})

const emit = defineEmits(['menuClick']);

const defaultStyle = computed(() => {
  return [
    props.color,
    'border border-[--color] p-4 w-full rounded-md',
    props.outline ? 'bg-transparent text-[--color]' : 'bg-[--color] text-[--color-inverse]',
    { 'hover:shadow-lg transition-shadow duration-500' : props.hoverShadow }
  ];
});

</script>
<template>
  <div :class="defaultStyle">
    <div class="md:flex block justify-between items-center">
      
      <div class="flex justify-center items-center mb-6 md:mb-0">
        <div class="flex flex-col md:flex-row items-center"> 
          <slot name="leftSection">
            <slot name="avatar">
              <Avatar class="flex items-center w-16 h-16" :avatar="imgSrc" :username="imgAlt" />
            </slot>
            <div class="text-center md:text-left mt-4 md:mt-0 md:ml-4">
              <slot name="title">
                <h4>{{ title }}</h4>
                <span>{{ subTitle }}</span>
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <div
        v-if="$slots.rightSection" 
        class="flex items-center justify-center"
      >
        <div class="flex flex-col md:flex-row justify-end items-center gap-1">
          <slot name="rightSection"></slot>
        </div>
      </div>

    </div>
  </div>
</template>