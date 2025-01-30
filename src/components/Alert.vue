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
import Card from './card/Card.vue';
import CardBody from './card/CardBody.vue';
import { theme } from '../color';

const props = defineProps({
  color: String,
  iconPath: String,
  type: String,
  boldText: String,
  text: String,
  outline: Boolean,
})

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

const defaultStyle = computed(() => {
  return [
    'w-full rounded-md',
    { '!bg-transparent' : props.outline },
  ];
});
</script>
<template>
  <Card :class="defaultStyle" :color="color" noFooter noHeader>
    <template #content>
      <CardBody 
        :class="[
          '!p-3',
          outline ? color : theme.getInverse(color)
        ]"
      >
        <div class="flex justify-between items-center">
        
          <div class="flex justify-center items-center">
            <div class="flex flex-row items-center"> 
              <Icon class="w-8 h-8 mr-4" :path="icon" size="32"></Icon>
              <slot>
                <span class="text-left py-2">
                  <h4 class="inline">{{ boldText }}</h4>
                  <p :class="['inline', {'ml-2': boldText}]">{{ text }}</p>
                </span>
              </slot>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="flex flex-row justify-end items-center gap-1">
              <Button  
                :iconPath="mdiClose" 
                :color="outline ? color : theme.getInverse(color)" 
                :outline="outline"
                size="small" 
                rounded 
              />
            </div>
          </div>

        </div>
      </CardBody>
    </template>
  </Card>
</template>