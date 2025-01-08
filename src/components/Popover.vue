<script setup>
  import { computed, shallowRef } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
    controllable: Boolean,
    text: String,
    color: String,
    position: {
      type: String,
      default: 'top',
      validator(value, props) {
        // The value must match one of these strings
        return ['left', 'right', 'top', 'bottom'].includes(value)
      },
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const modelValue = shallowRef(props.modelValue);

  const showPopover = computed({
    get: () => props.controllable ? props.modelValue : modelValue.value,
    set: (value) => {
      modelValue.value = value;
      emit('update:modelValue', value);
    }
  });

  const popoverStyle = computed(() => {
    let positionStyle = {
      'top': [
        'top-auto right-auto bottom-[calc(100%+7px)] left-[50%] translate-x-[-50%]',
        'before:top-[100%] before:right-auto before:bottom-auto before:left-[50%] before:translate-x-[-50%]',
        'before:border-r-transparent before:border-l-transparent before:border-b-0',
      ],
      'bottom': [
        'bottom-auto right-auto top-[calc(100%+7px)] left-[50%] translate-x-[-50%]',
        'before:bottom-[100%] before:right-auto before:top-auto before:left-[50%] before:translate-x-[-50%]',
        'before:border-r-transparent before:border-l-transparent before:border-t-0',
      ],
      'left': [
        'bottom-auto left-auto right-[calc(100%+7px)] top-[50%] translate-y-[-50%]',
        'before:bottom-auto before:left-[100%] before:right-auto before:top-[50%] before:translate-y-[-50%]',
        'before:border-r-0 before:border-t-transparent before:border-b-transparent',
      ],
      'right': [
        'bottom-auto right-auto left-[calc(100%+7px)] top-[50%] translate-y-[-50%]',
        'before:bottom-auto before:right-[100%] before:left-auto before:top-[50%] before:translate-y-[-50%]',
        'before:border-l-0 before:border-t-transparent before:border-b-transparent',
      ],
    }
    let style = [
      props.color,
      'absolute rounded-md shadow-md z-10 whitespace-nowrap p-2',
      'before:absolute before:content-[""] before:pointer-events-none before:z-10 before:border-4',
      ...positionStyle[props.position],
      'bg-[--color] before:border-[--color] text-[--color-inverse] ',
    ];

    return style;
  })

  function open() {
    showPopover.value = true;
  }

  function close() {
    showPopover.value = false;
  }

  const bindEvents = computed(() => {
    let events = {};
    if( !props.controllable ) {
      events.onMouseover = () => open();
      events.onMouseleave = () => close();
    }
    return events;
  })
</script>
<template>
  <div 
    class="relative flex items-center" 
    v-bind="bindEvents"
  >
    <Transition name="fade">
      <div v-if="showPopover" :class="popoverStyle">
        <slot name="popover">
          <span v-if="text">{{ text }}</span>
        </slot>
      </div>
    </Transition>
    <slot></slot>
  </div>
</template>