<script setup>
const props = defineProps({
  title: String,
  subTitle: String,
  separatorColor: String,
});

</script>
<template>
  <div :class="[
      props.separatorColor,
      'flex justify-between items-center border-b border-[--color] rounded-t-md p-3 md:p-4',
    ]"
  >
    <slot name="title">
      <span>
        <h2 v-if="title">{{ title }}</h2>
        <h4 v-if="subTitle">{{ subTitle }}</h4>
      </span>
    </slot>
    <slot></slot>
  </div>
</template>