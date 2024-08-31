<script setup>
  import { computed } from 'vue';
  import { background, text, getDefaultTextStyle, border } from '../color';

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

  const textStyle = getDefaultTextStyle(props.color);

  const defaultStyle = computed(() => {
    let style = [
      'inline-flex justify-center items-center',
    ];

    if( props.color ) {

      if( props.hasRoundedBg ) {
        style = [
          ...style,
          'w-12 h-12 rounded-full',
        ];

        if( props.outline ) {
          style = [
            ...style,
            'border bg-transparent',
            border[props.color],
            text[props.color],
          ];
          return style;
        }

        style = [
          ...style,
          background[props.color],
          textStyle.color,
        ];
        return style;
      }

      style = [
        ...style,
        text[props.color],
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
