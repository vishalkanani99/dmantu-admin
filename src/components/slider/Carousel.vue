<script setup>
import { ref, shallowRef, computed, onMounted, onUnmounted } from 'vue';
import Slider from './Slider.vue';

const props = defineProps({
  defaultSlide: {
    type: Number,
    default: 0,
  },
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
  indicatiorColor: String,
  thumbnailPerView: {
    type: Number,
    default: 4,
  },
  hasThumbnailSelector: Boolean,
});

const emit = defineEmits(['change']);

const defaultSlide = shallowRef(props.defaultSlide);
const defaultThumbnail = shallowRef(props.defaultSlide);

const changeSlide = (slide) => {
  defaultSlide.value = defaultThumbnail.value = slide;
}

const changeThumbnail = (slide) => {
  defaultThumbnail.value = slide;
}

</script>
<template>
  <div class="relative flex flex-col">
    <Slider
      :defaultSlide="defaultSlide"
      :content="slides"
      :btnColor="btnColor"
      :hasAutoSlideShow="hasAutoSlideShow"
      :hasIndicator="hasIndicator"
      :indicatiorColor="indicatiorColor"
      @change="changeThumbnail"
    >
      <template v-slot="{ item, textColor }">
        <img class="block w-full max-h-[200px] md:max-h-[500px] object-cover align-middle select-none drag-none pointer-events-none" :src="item.image" />
        <span :class="['absolute bottom-6 w-full py-3 px-4 text-center', textColor]">{{ item.caption }}</span>
      </template>
    </Slider>
    <Slider
      v-if="hasThumbnailSelector"
      :defaultSlide="defaultThumbnail"
      :slidesPerView="thumbnailPerView"
      :content="slides"
      :btnColor="btnColor"
      :hasAutoSlideShow="false"
      :hasIndicator="false"
      noSwiper
    >
      <template v-slot="{ item, index }">
        <img 
          :class="[
            'block object-cover align-middle cursor-pointer',
            'w-full h-[150px]',
            'select-none drag-none',
            {'opacity-30': defaultThumbnail !== index}
          ]" 
          :src="item.image"
          @click="changeSlide(index)" 
        />
      </template>
    </Slider>
  </div>
</template>