<script setup>
import { ref, computed } from "vue";
import { useTheme } from '../../composables/useTheme.js';
import { mdiClose } from "@mdi/js";
import Icon from "../Icon.vue";
import Button from "../Button.vue";

const props = defineProps({
  lifetime: {
    type: Number,
    default: 3000,
    validator(value) {
      return value >= 0
    }
  },
  timestamp: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  color: String,
  position: {
    type: String,
    default: 'left',
    validator(value) {
      return ["left", "center", "right"].indexOf(value) > -1
    }
  },
  closable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["cancel"]);

const { getColorInverse } = useTheme();
const showSnackbarItem = ref(true);

const defaultClass = computed(() => {
  let position = { left: 'self-start', center: 'self-center', right: 'self-end' };
  const defaultClass = [
    props.color,
    'relative shadow-lg min-w-96 max-w-full text-sm pointer-events-auto rounded-lg mb-3',
    'bg-[--color] text-[--color-inverse]',
    position[props.position],
  ];
  return defaultClass;
})

let snackbarTimeout = setTimeout(() => {
  cancel();
}, props.lifetime);

const cancel = () => {
  if( snackbarTimeout ) {
    clearTimeout(snackbarTimeout);
  }
  showSnackbarItem.value = false;
  emit("cancel", props.timestamp);
}

</script>

<template>
  <div v-if="showSnackbarItem" :class="defaultClass">
    <div 
      :class="[
        'flex justify-between items-center', 
        text ? 'border-b rounded-t-lg py-2 px-3 border-[--color-inverse]' : 'p-3',
      ]"
    >
      <div class="flex items-center space-x-2">
        <Icon v-if="icon" :path="icon" />
        <h6 v-if="text && title">{{ title }}</h6>
        <div v-else class="text-lg break-words">{{ title }}</div>
      </div>
      <div class="flex justify-end items-center space-x-2 ml-2">
        <span v-if="subTitle" class="text-xs">{{ subTitle }}</span>
        <Button
          v-if="closable"
          class="w-6 h-6 focus:!ring-2" 
          :color="getColorInverse(color)"
          size="small"
          rounded
          @click="cancel" 
        >
          <Icon :path="mdiClose" size="14" />
        </Button>
      </div>
    </div>
    <div v-if="text" class="py-2 px-3 rounded-b-lg break-words">
      {{ text }}
    </div>
  </div>
</template>
