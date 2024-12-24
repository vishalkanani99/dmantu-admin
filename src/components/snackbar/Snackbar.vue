<script setup>
import { computed } from 'vue';
import SnackbarItem from './SnackbarItem.vue';

const props = defineProps({
  origin: {
    type: String,
    default: 'bottom',
    validator(value, props) {
      // The value must match one of these strings
      return ['top', 'bottom', 'right', 'left'].includes(value)
    },
  },
  direction: {
    type: String,
    default: 'bottom',
    validator(value, props) {
      // The value must match one of these strings
      return ['top', 'bottom'].includes(value)
    },
  },
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ["left", "center", "right"].indexOf(value) > -1
    }
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  closable: {
    type: Boolean,
    default: true,
  },
  lifetime: {
    type: Number,
    default: 3000,
    validator(value) {
      return value >= 0
    }
  },
  color: {
    type: String,
    default: 'theme-light',
  },
  icon: {
    type: String,
    default: null
  },
});

const emit = defineEmits(['update:modelValue']);

const snackbarItems = computed({
  get: () => props.modelValue.map((item) => {
    if( !item.hasOwnProperty('timestamp') ) {
      item.timestamp = Date.now();
    }
    return item;
  }),
  set: (value) => {
    emit('update:modelValue', value);
  } 
})

const defaultClass = computed(() => {
    let flexDirection = { top:'flex-col', bottom:'flex-col-reverse'};
    const defaultClass = [
      "fixed inset-0 flex p-9 overflow-hidden z-[100] pointer-events-none",
      flexDirection[props.direction]
    ]
    return defaultClass;
})

const cancel = (timestamp) => {
  snackbarItems.value = snackbarItems.value.filter((item) => item.timestamp !== timestamp);
}

</script>

<template>
  <Teleport to="body">
    <TransitionGroup 
      tag="div" 
      name="snackbar" 
      :class="defaultClass"
    >
      <SnackbarItem
        v-for="v in snackbarItems"
        :class="origin" 
        :key="v.timestamp"
        :title="v?.title"
        :subTitle="v?.subTitle"
        :text="v?.text"
        :color="color"
        :position="position"
        :icon="icon"
        :closable="closable"
        :timestamp="v.timestamp"
        :lifetime="lifetime"
        @cancel="cancel">
      </SnackbarItem>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.snackbar-move,
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.5s ease;
}
.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
}

.snackbar-enter-from.top,
.snackbar-leave-to.top {
  transform: translateY(-100%);
}

.snackbar-enter-from.bottom,
.snackbar-leave-to.bottom {
  transform: translateY(100%);
}

.snackbar-enter-from.left,
.snackbar-leave-to.left {
  transform: translateX(-100%);
}

.snackbar-enter-from.right,
.snackbar-leave-to.right {
  transform: translateX(100%);
}

.snackbar-leave-active {
  position: absolute;
}
</style>