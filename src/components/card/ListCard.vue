<script setup>
import { computed } from 'vue';
import { theme } from '../../color';
import Avatar from '../Avatar.vue';
import Card from './Card.vue';
import CardBody from './CardBody.vue';

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
    'w-full rounded-md',
    { '!bg-transparent' : props.outline },
    { 'hover:shadow-lg transition-shadow duration-500' : props.hoverShadow }
  ];
});

</script>
<template>
  <Card :class="defaultStyle" :color="color" noFooter noHeader>
    <template #content>
      <CardBody :class="[outline ? color : theme.getInverse(color)]">
        <div class="md:flex block justify-between items-center">
        
          <div class="flex justify-center items-center mb-6 md:mb-0">
            <div class="flex flex-col md:flex-row items-center"> 
              <slot name="leftSection">
                <slot name="avatar">
                  <Avatar 
                    class="flex items-center w-16 h-16" 
                    :color="outline ? color : theme.getInverse(color)" 
                    :avatar="imgSrc" 
                    :username="imgAlt" 
                  />
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
      </CardBody>
    </template>
  </Card>
</template>