<script setup>
import { computed } from 'vue';
import { mdiDotsVertical, mdiTrashCan, mdiPencil } from '@mdi/js';
import { background, getDefaultTextStyle, border, text } from '../../color';
import Avatar from '../Avatar.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import Button from '../Button.vue';
import Chip from '../Chip.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'theme',
  },
  imgSrc: String,
  imgAlt: String,
  title: String,
  subTitle: String,
  label: String,
  labelColor: String,
  outline: Boolean,
  hoverShadow: Boolean,
  menuItems: {
    type: Array,
    default: () => [
      {
        label: 'Edit',
        value: 'edit',
        iconPath: mdiPencil,
      },
      {
        label: 'Delete',
        value: 'delete',
        iconPath: mdiTrashCan,
      }
    ],
  },
})

const emit = defineEmits(['menuClick']);
const textStyle = getDefaultTextStyle(props.color);

const defaultStyle = computed(() => {
  let style = [
    'border p-4 w-full rounded-md',
    border[props.color],
    !props.outline ? background[props.color] : '',
    props.outline ? text[props.color] : textStyle.color,
    { 'hover:shadow-lg transition-shadow duration-500' : props.hoverShadow }
  ];
  return style;
});

const labelColor = computed(() => {
  if(props.labelColor) {
    return props.labelColor;
  }
  
  if(props.outline) {
    return props.color;
  }

  return textStyle.type;
})
</script>
<template>
  <div :class="defaultStyle">
    <div class="md:flex block justify-between items-center">
      <div class="flex justify-center items-center mb-6 md:mb-0">
        <div class="flex flex-col md:flex-row items-center"> 
          <slot name="leftSection">
            <Avatar class="w-16 h-16" :avatar="imgSrc" :username="imgAlt" />
            <div class="text-center md:text-left mt-4 md:mt-0 md:ml-4">
              <h4>{{ title }}</h4>
              <span>{{ subTitle }}</span>
            </div>
          </slot>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <slot name="rightSection">
          <div class="justify-end items-center block md:flex">
            <div 
              v-if="$slots.labels || label" 
              class="flex items-center justify-center flex-wrap mb-6 md:mb-0 space-x-4"
            >
              <slot name="labels">
                <Chip 
                  :color="labelColor" 
                  :label="label" 
                  :outline="outline"
                />
              </slot>
            </div>
            <div 
              v-if="$slots.afterLabels" 
              class="flex items-center justify-center flex-wrap mb-6 md:mb-0 space-x-4 ml-0 md:ml-6"
            >
              <slot name="afterLabels"></slot>
            </div>
            <div class="flex items-center justify-center ml-0 md:ml-6">
              <slot name="listEnd">
                <Dropdown 
                  :items="menuItems"
                  :bgColor="textStyle.type"
                  :ItemColor="textStyle.type"
                  @menuClick="(value) => $emit('menuClick', value)"
                >
                  <template #selector>
                    <Button 
                      class="text-xs w-8 h-8" 
                      :iconPath="mdiDotsVertical" 
                      :color="outline ? color : textStyle.type" 
                      :outline="outline" 
                      rounded 
                    />
                  </template>
                </Dropdown>
              </slot>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>