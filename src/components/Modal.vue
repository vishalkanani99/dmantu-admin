<script setup>
  import { computed, shallowRef } from 'vue';
  import Card from './card/Card.vue';
  import OverLayer from './OverLayer.vue';
  import Form from './form/Form.vue';
  import { useTranslate } from '../composables/useTranslate';

  const props = defineProps({
    modelValue: Boolean,
    imortal: Boolean,
    origin: {
      type: String,
      default: 'top',
      validator(value, props) {
        // The value must match one of these strings
        return ['left', 'right', 'top', 'bottom', 'center'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(value, props) {
        // The value must match one of these strings
        return ['full', 'large', 'medium', 'small'].includes(value)
      },
    },
    color: String,
    title: String,
    subTitle: String,
    saveBtnLabel: String,
    cancelBtnLabel: String,
    saveBtnIconPath: String,
    cancelBtnIconPath: String,
    closable: {
      type: Boolean,
      default: true,
    },
    noHeader: Boolean,
    noFooter: Boolean,
    noPadding: Boolean,
    twoColumns: Boolean,
    threeColumns: Boolean,
    scrollable: Boolean,
    hasForm: Boolean,
    centered: Boolean,
  });

  const emit = defineEmits(['update:modelValue', 'save', 'cancel', 'close']);

  const { hide, show } = useTranslate(() => props.origin);

  const shakeAnimation = shallowRef(false);

  const showModal = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });
  
  function cancel() {
    showModal.value = false;
    // Modal close or cancel
    emit('cancel');
  }

  function close() {
    if(props.imortal) {
      shakeAnimation.value = true;
      setTimeout(() => {
        shakeAnimation.value = false;
      }, 300);
    }
    // Overlayer close
    emit('close');
  }

  const typeOfComponent = computed(() => {
    if( props.hasForm ) {
      return Form;
    }

    return Card;
  });

  const size = computed(() => {
    let size = 'w-2/3 max-w-[66.666667%] md:w-2/5 md:max-w-[40%]';
    switch( props.size ) {
      case 'small':
        size = 'w-3/5 max-w-[60%] md:w-1/3 md:max-w-[33.333333%]';
        break;
      case 'large':
        size = 'w-4/5 max-w-[80%] md:w-3/5 md:max-w-[60%]';
        break;
      case 'full':
        size = 'h-full w-full max-w-[100vw]';
        break;
    }
    return size;
  });

  const defaultStyle = computed(() => {
    return [
      'transition-translate duration-300',
      size.value,
      props.size !== 'full' ? 'mx-auto my-6 max-h-[calc(100vh-48px)]' : 'max-h-screen',
      showModal.value ? show.value : hide.value,
      { 'animate-shake': shakeAnimation.value },
    ];
  });

  const overlayerStyle = computed(() => {
    return [ 
      props.centered ? 'flex items-center' : '',
    ];
  });

  const bindProps = computed(() => {

    const componentProps = {
      color: props.color,
      title: props.title,
      subTitle: props.subTitle,
      saveBtnLabel: props.saveBtnLabel,
      cancelBtnLabel: props.cancelBtnLabel,
      saveBtnIconPath: props.saveBtnIconPath,
      cancelBtnIconPath: props.cancelBtnIconPath,
      closable: props.closable,
      noHeader: props.noHeader,
      noFooter: props.noFooter,
      noPadding: props.noPadding,
      scrollable: props.scrollable,
    };

    if( props.hasForm ) {
      componentProps.twoColumns = props.twoColumns;
      componentProps.threeColumns = props.threeColumns;
    }
  
    return componentProps;
  });
</script>
<template>
  <OverLayer 
    v-model="showModal" 
    :class="overlayerStyle"
    :imortal="imortal" 
    @close="close"
  >
    <component
      :is="typeOfComponent"
      :class="defaultStyle"
      v-bind="bindProps"
      @close="cancel"
      @save="$emit('save')"
      @cancel="cancel"
    >
      <template #header>
        <slot name="header" />
      </template>
      
      <template #content>
        <slot name="content" />
      </template>

      <slot v-if="!$slots.content"></slot>

      <template #footer>
        <slot name="footer" />
      </template>

      <template v-if="!$slots.footer" #buttons>
        <slot name="buttons" />
      </template>
    </component>
  </OverLayer>
</template>