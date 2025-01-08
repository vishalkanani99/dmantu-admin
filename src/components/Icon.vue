<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    path: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 20,
    },
    viewbox: {
      type: String,
      default: '0 0 24 24',
    },
    hasRoundedBg: Boolean,
    color: String,
    outline: Boolean,
  });

  const defaultStyle = computed(() => {
    let style = [
      props.color,
      'inline-flex justify-center items-center',
    ];

    if( props.color ) {
      if( props.hasRoundedBg ) {
        style = [
          ...style,
          'w-12 h-12 rounded-full',
          props.outline 
            ? 'bg-transparent border border-[--color] text-[--color]' 
            : 'bg-[--color] text-[--color-inverse]',
        ];
        return style;
      }

      style = [
        ...style,
        'text-[--color]',
      ];
    }

    return style;
  });
</script>

<template>
  <span :class="defaultStyle">
    <svg
      :viewBox="viewbox"
      :width="size"
      :height="size" >
      <path fill="currentColor" :d="path" />
    </svg>
  </span>
</template>
