<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import { throttle } from 'lodash';
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
});

const emit = defineEmits(['update:modelValue', 'menuClick']);

const dropdownRef = ref(null);
const selectorRef = ref(null);
const modelValue = shallowRef(false);

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

const trackClickEvent = (el) => {
  const containerRef = dropdownRef.value && dropdownRef.value?.$refs?.containerRef;
  const isSelectorRefAsTargetEl = selectorRef.value && selectorRef.value.contains(el.target);
  const isDropdownRefContainTargetEl = containerRef && containerRef.contains(el.target);
  if(isSelectorRefAsTargetEl || isDropdownRefContainTargetEl) {
    return;
  }
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

onMounted(() => {
  document.addEventListener('click', trackClickEvent);
})
</script>
<template>
  <div class="relative select-none">
    <div ref="selectorRef" v-bind="bindSelectorEvent">
      <slot name="selector" :btnIcon="btnIcon">
        <Button :color="btnColor">
          <span v-if="label" class="pl-1">{{ label }}</span>
          <Icon :path="btnIcon" class="pl-3" />
        </Button>
      </slot>
    </div>
    <DropdownContainer
      ref="dropdownRef"
      v-model="showList"
      :bgColor="bgColor" 
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