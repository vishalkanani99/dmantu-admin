<script setup>
import { computed, ref } from 'vue';
import { theme } from '../../color';
import { useNumberGrow } from '../../composables/useNumberGrow';
import Card from './Card.vue';
import CardBody from './CardBody.vue';
import Icon from '../Icon.vue';
import ProgressBar from '../progressbar/ProgressBar.vue';

const props = defineProps({
  progress: Number,
  color: String,
  trackColor: String,
  activeTrackColor: String,
  infoColor: String,
  iconPath: String,
  number: Number,
  label: String,
  numberSuffix: String,
  numberPrefix: String,
  outline: Boolean,
  hoverShadow: Boolean,
})

const emit = defineEmits(['menuClick']);

const { growingNumber } = useNumberGrow(props.number);
const progress = ref(props.progress);

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
        <div class="flex justify-between items-center mb-4">
          <div class="flex-1">
            <h2>{{ numberPrefix }}{{ growingNumber }}{{ numberSuffix }}</h2>
            <span class="text-lg">{{ label }}</span>
          </div>
          <Icon :path="iconPath" :size="48" />
        </div>
        <ProgressBar 
          v-if="progress" 
          v-model="progress" 
          :trackColor="trackColor"
          :activeTrackColor="activeTrackColor"
          :infoColor="infoColor" 
        />
      </CardBody>
    </template>
  </Card>
</template>