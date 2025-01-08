<script setup>
import { computed } from 'vue';
import { 
  mdiAlert,
  mdiAlertCircle, 
  mdiCheckCircle,
  mdiInformation, 
  mdiClose, 
} from '@mdi/js';
import Icon from './Icon.vue';
import Button from './Button.vue';
import ListCard from './card/ListCard.vue';
import { useTheme } from '../composables/useTheme.js';

const props = defineProps({
  color: String,
  iconPath: String,
  type: String,
  boldText: String,
  text: String,
  outline: Boolean,
})

const { getColorInverse } = useTheme();

const color = computed(() => {
  switch( props.type ) {
    case 'warning' :
      return 'warning';
    case 'danger' :
      return 'danger';
    case 'success' :
      return 'success';
    case 'info' :
      return 'info';
    default :
      return props.color;
  }
});

const icon = computed(() => {
  
  if(props.iconPath) {
    return props.iconPath;
  }

  switch( props.type ) {
    case 'warning' :
      return mdiAlert;
    case 'danger' :
      return mdiAlertCircle;
    case 'success' :
      return mdiCheckCircle;
    default :
      return mdiInformation;
  }
});
</script>
<template>
  <ListCard
    class="!p-3"
    :color="color"
    :outline="outline"
  >
    <template #leftSection>
      <Icon class="w-8 h-8 md:mr-4" :path="icon" size="32"></Icon>
      <slot>
        <span class="text-center md:text-left md:py-2">
          <h4 class="inline">{{ boldText }}</h4>
          <p :class="['inline', {'ml-2': boldText}]">{{ text }}</p>
        </span>
      </slot>
    </template>
    <template #rightSection>
      <Button 
        class="text-xs w-8 h-8" 
        :iconPath="mdiClose" 
        :color="outline ? color : getColorInverse(color)" 
        :outline="outline" 
        rounded 
      />
    </template>
  </ListCard>
</template>