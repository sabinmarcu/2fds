<template>
  <button :class="{ [buttonStyles({ variant })]: true }">
    <slot />
  </button>
</template>

<script setup lang='ts'>
import { buttonStyles, type ButtonStylesProps } from './Button.css.ts';
interface Props {
  // Ugly hack for Vue T_T (generics unsupported in props determination)
  variant?: (ButtonStylesProps & {})["variant"]
}
const { variant } = withDefaults(defineProps<Props>(), { variant: 'primary' });
</script>
