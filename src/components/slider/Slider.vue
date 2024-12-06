<script setup>
import { ref, shallowRef, computed, watch, onMounted, onUnmounted } from 'vue';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useSwiper } from '../../composables/useSwiper';
import { background, text, getDefaultTextStyle } from '../../color';
import Button from '../Button.vue';

const props = defineProps({
  defaultSlide: {
    type: Number,
    default: 0,
  },
  content: {
    type: Array,
    default: () => [],
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 0,
  },
  hasAutoSlideShow: {
    type: Boolean,
    default: true,
  },
  btnColor: {
    type: String,
    default: 'theme-light',
  },
  hasIndicator: {
    type: Boolean,
    default: true,
  },
  indicatiorColor: {
    type: String,
    default: 'theme-light',
  },
  noSwiper: Boolean,
});

const emit = defineEmits(['change']);

let slideInterval;
const { initSwiper } = useSwiper();
const textStyle = getDefaultTextStyle(props.indicatiorColor);

const containerRef = ref();
const position = shallowRef(0);
const offsetWidth = shallowRef(0);
const translateX = shallowRef(0);
const transitionDuration = shallowRef(300);
const isDragging = shallowRef(false);

const maxScrollableBlocks = computed(() => props.content.length - props.slidesPerView );
const blockWidth = computed(() => ((offsetWidth.value - (props.spaceBetween * (props.slidesPerView - 1))) / props.slidesPerView) );
const maxTranslateX = computed(() => -((blockWidth.value * maxScrollableBlocks.value) + (props.spaceBetween * maxScrollableBlocks.value)) );
const hasMaxScrolled = computed(() => Math.round(maxTranslateX.value) >= Math.round(position.value) );
const hasMinScrolled = computed(() => position.value >= 0 );
const activeSlide = computed(() => Math.abs(Math.round(position.value / ( blockWidth.value + props.spaceBetween ))) );
const indicators = computed(() => maxScrollableBlocks.value + 1);

const initSlider = () => {
  offsetWidth.value = containerRef.value.offsetWidth;
  setSlide(props.defaultSlide);
  if( props.noSwiper ) return;
  initSwiper(containerRef.value, dragging, stopDragging);
}

const clearSlideInterval = () => {
  if(slideInterval) {
    clearInterval(slideInterval);
  }
}

const validatePosition = () => {
  if( hasMaxScrolled.value ) {
    position.value = maxTranslateX.value;
  }
  if( hasMinScrolled.value ) {
    position.value = 0;
  }
}

const dragging = (value) => {
  isDragging.value = true;
  transitionDuration.value = 0;
  clearSlideInterval();
  translateX.value = position.value - (-value);
}

const stopDragging = (value) => {
  if(!isDragging.value || !value) return;
  isDragging.value = false;
  let slides = Math.round(value / blockWidth.value);
  let scrollTo = getScrollTo(slides);
  position.value = position.value - (-scrollTo);
  transitionDuration.value = 300;
  changeSlide();
}

const getScrollTo = (slides) => {
  return ( slides * blockWidth.value ) + ( slides * props.spaceBetween );
}

const setSlide = (slide) => {
  let scrollTo = getScrollTo(slide);
  position.value = -scrollTo;
  changeSlide();
}

const nextSlide = () => {
  position.value = hasMaxScrolled.value ? 0 : position.value - ( blockWidth.value + props.spaceBetween );
  changeSlide();
}

const prevSlide = () => {
  position.value = position.value = hasMinScrolled.value ? 0 : position.value + ( blockWidth.value + props.spaceBetween );
  changeSlide();
}

const changeSlide = () => {
  clearSlideInterval();
  validatePosition();
  translateX.value = position.value;
  emit('change', activeSlide.value);
  if(props.hasAutoSlideShow) {
    autoSlideShow();
  }
}

const autoSlideShow = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 4000);
}

const stopWatch = watch(
  () => props.defaultSlide,
  (newValue) => {
    setSlide(newValue);
  }
);

onMounted(() => {
  initSlider();
})

onUnmounted(() =>{
  clearSlideInterval();
  stopWatch();
})
</script>
<template>
  <div class="relative flex items-center overflow-hidden select-none">
    
    <!-- Next and previous buttons -->
    <Button 
      v-show="!hasMinScrolled" 
      class="absolute !p-1 left-1 z-10" 
      :iconPath="mdiChevronLeft"
      :color="btnColor" 
      rounded 
      @click="prevSlide()" 
    />
    <Button 
      v-show="!hasMaxScrolled" 
      class="absolute !p-1 right-1 z-10" 
      :iconPath="mdiChevronRight"
      :color="btnColor" 
      rounded 
      @click="nextSlide()" 
    />
    <!-- Next and previous buttons end -->

    <div 
      ref="containerRef" 
      :class="[
        'flex flex-row flex-nowrap items-center w-full transition-transform delay-0',
      ]"
      :style="{ 
        'transform': `translate3d(${translateX}px, 0px, 0px)`, 
        'transition-duration': `${transitionDuration}ms`,
      }"
    >
      <div
        class="shrink-0" 
        v-for="(item, index) in content"
        :style="{ 'width': `${blockWidth}px`, 'margin-right': `${spaceBetween}px`}"
      >
          <slot 
            :item="item" 
            :index="index" 
            :bgColor="background[indicatiorColor]" 
            :textColor="text[indicatiorColor]">
          </slot>
      </div>
    </div>

    <!-- Indicators start -->
    <div v-if="hasIndicator" class="absolute flex right-0 left-0 bottom-3 list-none text-white justify-center items-center">
      <div
        v-for="(slide, index) in indicators"
        :class="[
          'w-3 h-3 rounded-full mr-1 last:mr-0 cursor-pointer',
          activeSlide === index ? background[textStyle.type] :  background[indicatiorColor],
        ]"
        @click="setSlide(index)" 
      >
      </div>
    </div>
    <!-- Indicators end -->

  </div>
</template>