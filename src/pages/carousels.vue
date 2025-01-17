<script setup>
import { ref, shallowRef } from 'vue';
import { 
  mdiFormSelect, 
  mdiCog,
} from '@mdi/js';
import { theme } from '../color';
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue';
import Section from '../components/section/Section.vue';
import Card from '../components/card/Card.vue';
import Slider from '../components/slider/Slider.vue';
import Carousel from '../components/slider/Carousel.vue';
import PictureCard from '../components/card/PictureCard.vue';
import ListCard from '../components/card/ListCard.vue';

const slides = [
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/group-shopping.jpg',
    caption: 'slide 1'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/couple-shopping.jpg',
    caption: 'slide 2'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping.jpg',
    caption: 'slide 3'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping-3.jpg',
    caption: 'slide 4'
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/baby.jpg',
    caption: 'slide 5'
  },
];

const content = [
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/group-shopping.jpg',
    title: 'Product 1',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$700',
    discountPrice: '$1400',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping.jpg',
    title: 'Product 2',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$300',
    discountPrice: '$1100',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping-2.jpg',
    title: 'Product 3',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$340',
    discountPrice: '$700',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping-3.jpg',
    title: 'Product 4',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$700',
    discountPrice: '$1400',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/couple-shopping.jpg',
    title: 'Product 5',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$300',
    discountPrice: '$1100',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/baby.jpg',
    title: 'Product 6',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$340',
    discountPrice: '$700',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/group-shopping.jpg',
    title: 'Product 7',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$700',
    discountPrice: '$1400',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping.jpg',
    title: 'Product 8',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$300',
    discountPrice: '$1100',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping-2.jpg',
    title: 'Product 9',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$340',
    discountPrice: '$700',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/shopping-3.jpg',
    title: 'Product 10',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$700',
    discountPrice: '$1400',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/couple-shopping.jpg',
    title: 'Product 11',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$300',
    discountPrice: '$1100',
  },
  {
    image: 'https://vishalkanani99.github.io/vue-template/images/baby.jpg',
    title: 'Product 12',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    price: '$340',
    discountPrice: '$700',
  },
];

const testimonials = [
  {
    name: 'John Doe',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'John Doe',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]
</script>
<template>
  <LayoutAuthenticated>
    <Section
      title="Carousels" 
      :iconPath="mdiFormSelect" 
      :btnIconPath="mdiCog"
      :color="theme.activeColors.default"
    >
      <Card title="Carousel" :color="theme.activeColors.inverse" noFooter>
        <Carousel :slides="slides" />
      </Card>
      <Card title="Carousel with thumbnail selector" :color="theme.activeColors.inverse" noFooter>
        <Carousel :defaultSlide="4" :slides="slides" hasThumbnailSelector />
      </Card>
      <Card title="Cards Carousel" :color="theme.activeColors.inverse" noFooter>
        <Slider :content="content" :slidesPerView="4" :spaceBetween="10" hasIndicator>
          <template v-slot="{ item, index }">
            <PictureCard
              :title="item.title"
              :imageSrc="item.image"
              :color="theme.activeColors.inverse"
              selectable
            >
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book.
              </p>
            </PictureCard>
          </template>
        </Slider>
      </Card>
      <Card title="Testimonials Carousel" :color="theme.activeColors.inverse" noFooter>
        <Slider :content="testimonials" :spaceBetween="5" hasIndicator>
          <template v-slot="{ item, index }">
            <ListCard 
              color="theme" 
              :imgAlt="item.name" 
              :title="item.name" 
              :subTitle="item.subTitle"
            >
            </ListCard>
          </template>
        </Slider>
      </Card>
    </Section>
  </LayoutAuthenticated>
</template>