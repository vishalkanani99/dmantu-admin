<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import { throttle } from 'lodash';
import { useScrollOver } from '../../composables/useScrollOver';
import { useDocumentClick } from '../../composables/useDocumentClick';
import DropdownContainer from './DropdownContainer.vue';
import Icon from '../Icon.vue';
import Menu from '../menu/Menu.vue';
import Button from '../Button.vue';

const props = defineProps({
  modelValue: Boolean,
  label: String,
  items: {
    type: Array,
    default: () => [],
  },
  btnColor: {
    type: String,
    default: 'theme-light',
  },
  bgColor: {
    type: String,
    default: 'theme-light',
  },
  ItemColor: {
    type: String,
    default: 'theme-light',
  },
  controllable: Boolean,
  maxHeight: Boolean,
});

const emit = defineEmits(['update:modelValue', 'menuClick']);

const containerRef = ref(null);
const dropdownContainerHeight = ref(0);
const modelValue = shallowRef(false);

const { visibleAtBottom } = useScrollOver(containerRef, dropdownContainerHeight);

const showList = computed({
  get: () => props.controllable ? props.modelValue : modelValue.value,
  set: (value) => {
    modelValue.value = value;
    emit('update:modelValue', value);
  }
})

const toggle = throttle(() => {
  showList.value = !showList.value;
})

const outsideTargetCb = () => {
  showList.value = false;
}

const btnIcon = computed(() => showList.value ? mdiMenuUp : mdiMenuDown );

const bindSelectorEvent = computed(() => {
  const selectorEvents = {};
  if( !props.controllable ) {
    selectorEvents.onClick = () => toggle(); 
  }
  return selectorEvents;
})

const dropdownContainerRef = (el) => {
  dropdownContainerHeight.value = el ? el.clientHeight : 0;
}

onMounted(() => {
  useDocumentClick(containerRef, outsideTargetCb);
})
</script>
<template>
  <div ref="containerRef" class="relative select-none">
    <div v-bind="bindSelectorEvent">
      <slot name="selector" :btnIcon="btnIcon">
        <Button :color="btnColor">
          <span v-if="label" class="pl-1">{{ label }}</span>
          <Icon :path="btnIcon" class="pl-3" />
        </Button>
      </slot>
    </div>
    <DropdownContainer
      v-model="showList"
      :bgColor="bgColor"
      :maxHeight="maxHeight"
      :position="visibleAtBottom ? 'bottom' : 'top'"
      @enter="dropdownContainerRef"
      @after-leave="dropdownContainerRef" 
    >
      <slot>
        <Menu 
          :items="items" 
          :color="ItemColor"
          @menuClick="(value) => $emit('menuClick', value)"
        >
          <template #default="{ item, key }">
            <slot name="item" :item="item" :key="key"></slot>
          </template>
        </Menu>
      </slot>
    </DropdownContainer>
  </div>
</template>