<script setup>
import { computed } from 'vue';
import { mdiChevronRightCircle, mdiChevronLeftCircle } from '@mdi/js';
import Button from './Button.vue';

const props = defineProps({
  limit: {
    type: [String, Number],
    default: 10
  },
  modelValue: {
    type: Number,
    default: 1
  },
  recordsTotal: {
    type: Number,
    default: null
  },
  afterDots: {
    type: Number,
    default: 1
  },
  beforeDots: {
    type: Number,
    default: 1
  },
  color: String,
  activeColor: String,
});

const emit = defineEmits(['update:modelValue']);

const activePage = computed({
  get: () => props.modelValue,
  set: (value) => {
      emit('update:modelValue', value);
  }
});
const limit = computed(() => parseInt(props.limit));

const pagination = computed(() => {
  let paginate = Math.ceil(props.recordsTotal / limit.value);
  return paginate;
});

const showingFrom = computed(() => {
  return ( (activePage.value * limit.value) - limit.value) + 1;
});

const showingTo = computed(() => {
  if(activePage.value * limit.value >= props.recordsTotal){
      return props.recordsTotal;
  }
  return (activePage.value * limit.value);
});

const loadPage = (page) => {
  activePage.value = page;
}

</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row md:justify-between items-center" v-if="limit">
      <div class="flex items-center flex-wrap justify-start" v-if="pagination > 1">
        <Button 
          v-if="activePage > 1"
          class="mr-3 last:mr-0 mb-3"
          :iconPath="mdiChevronLeftCircle" 
          :color="color"
          rounded
          @click="loadPage(activePage - 1)"
        />
        <template  v-for="n in pagination" :key="n">
          <Button 
            v-if="n === 1"
            class="mr-3 last:mr-0 mb-3" 
            :color="activePage == n ? activeColor : color"
            @click="loadPage(n)"
          >
            <span class="px-2">{{ n }}</span>
          </Button>
          <span 
            v-if="n !== 1 && n !== pagination  && n === (activePage - beforeDots - 1)" 
            class="mr-3 last:mr-0 mb-3"
          >
            ...
          </span>
          <Button 
            v-if="(n >= (activePage - beforeDots) && n <= (activePage + afterDots)) && n !== 1 && n !== pagination" 
            class="mr-3 last:mr-0 mb-3"
            :color="activePage == n ? activeColor : color"
            @click="loadPage(n)"
          >
            <span class="px-2">{{ n }}</span>
          </Button>
          <span 
            v-if="n !== 1 && n !== pagination  && n === (activePage + afterDots + 1)" 
            class="mr-3 last:mr-0 mb-3"
          >
            ...
          </span>
          <Button 
            v-if="pagination === n"  
            class="mr-3 last:mr-0 mb-3"
            :color="activePage == n ? activeColor : color"
            @click="loadPage(n)"
          >
            <span class="px-2">{{ n }}</span>
          </Button>
        </template>
        <Button 
          v-if="activePage < pagination"
          class="mr-3 last:mr-0 mb-3" 
          :iconPath="mdiChevronRightCircle" 
          :color="color"
          rounded
          @click="loadPage(activePage + 1)"
        />
      </div>
        <small v-if="recordsTotal">
          Showing
          <span class="font-medium">{{showingFrom}}</span>
          to
          <span class="font-medium">{{showingTo}}</span>
          of
          <span class="font-medium">{{recordsTotal}}</span>
          results
        </small>
    </div>
  </div>
</template>