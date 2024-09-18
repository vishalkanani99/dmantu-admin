<script setup>
  import { ref } from 'vue';
  import Collapse from './Collapse.vue';
  
  const props = defineProps({
    content: {
      type: Array,
      default: () => [],
    },
    color: String, 
  });

  const CollapseRefs = ref([]);
  const close = (value) => {
    CollapseRefs.value.forEach((e) => {
      if( !(e.containerRef === value) ){
        if(e.expand) {
          e.toggle();
        }
      }
    })
  }
</script>
<template>
  <Collapse
    ref="CollapseRefs"
    v-for="(data, index) in content"
    :key="index"
    :title="data?.title"
    :expanded="data?.expanded"
    :color="color"
    @toggle="close" 
  >
    <template #title>
      <slot name="title" :data="data" :index="index"></slot>
    </template>
    <div class="py-3 px-6">
      <slot :data="data" :index="index" ></slot>
    </div>
  </Collapse>
</template>