<script setup>
  import { computed } from 'vue';
  import { useTheme } from '../composables/useTheme';
  import Modal from './Modal.vue';
  import Button from './Button.vue';
  import Icon from './Icon.vue';

  const props = defineProps({
    modelValue: Boolean,
    color: String,
    title: String,
    iconPath: String,
    iconBgColor: String,
    confirmBtnLabel: {
      type: String,
      default: 'Confirm',
    },
    cancelBtnLabel: {
      type: String,
      default: 'Cancel',
    },
    confirmBtnColor: String,
    cancelBtnColor: String,
  });

  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

  const { getColorInverse } = useTheme();

  const inverseColor = computed(() => getColorInverse(props.color));
  const showDialog = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
    }
  });
  
  function action(type = 'cancel') {
    if( type === 'cancel' ) {
      showDialog.value = false;
    }
    emit(type);
  }

</script>
<template>
  <Modal
    v-model="showDialog"
    :color=color
    size="small"
    origin="center"
    closable
    imortal
    centered
    @cancel="action()"
  >
    <template #header>
      <div class="inline-flex flex-col justify-center items-center pt-6 space-y-2">
        <Icon
          v-if="iconPath" 
          :path="iconPath" 
          :size="24"
          :color="iconBgColor"
          hasRoundedBg
        />
        <h2 v-if="title" class="text-center capitalize">{{ title }}</h2>
      </div>
    </template>
    <template #content>
      <slot name="content">
        <p class="px-6 mt-2 text-center">
          <slot></slot>
        </p>
      </slot>
    </template>
    <template #footer>
      <div class="flex justify-center items-center p-6 space-x-2">
        <Button :color="confirmBtnColor ?? inverseColor" :label="confirmBtnLabel" @click="action('confirm')" />
        <Button :color="cancelBtnColor ?? inverseColor" :label="cancelBtnLabel" outline @click="action()" />
      </div>
    </template>
  </Modal>
</template>