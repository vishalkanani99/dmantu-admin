<script setup>
  const props = defineProps({
    multiFields: Boolean,
    optionsGroup: Boolean,
    verticalLayout: Boolean,
  });
</script>
<template>
  <div :class="[ 
      { 'flex': multiFields || optionsGroup }, 
      { 'items-center': multiFields || ( optionsGroup && !verticalLayout ) }, 
      { 'flex-col' : verticalLayout },
      { 'gap-3' : optionsGroup },  
    ]" 
  >
    <slot></slot>
  </div>
</template>