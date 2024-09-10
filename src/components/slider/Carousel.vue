<script setup>
import { ref, shallowRef, computed, onMounted, onUnmounted } from 'vue';
import Slider from './Slider.vue';

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
  hasAutoSlideShow: {
    type: Boolean,
    default: true,
  },
  btnColor: String,
  hasIndicator: {
    type: Boolean,
    default: true,
  },
  indicatiorColor: {
    type: String,
    default: 'theme-light',
  },
});

</script>
<template>
  <Slider
    :content="slides"
    :btnColor="btnColor"
    :hasAutoSlideShow="hasAutoSlideShow"
    :hasIndicator="hasIndicator"
    :indicatiorColor="indicatiorColor"
  >
    <template v-slot="{ item, textColor }">
      <img class="block w-full max-h-[200px] md:max-h-[500px] object-cover align-middle select-none drag-none pointer-events-none" :src="item.image" />
      <span :class="['absolute bottom-6 w-full py-3 px-4 text-center', textColor]">{{ item.caption }}</span>
    </template>
  </Slider>
</template>