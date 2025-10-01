<template>
  <TextField v-model="model" v-bind="mergedAttrs as any" @input="onChange" />
</template>

<script setup lang="ts">
import TextField from './TextField.vue'
import type {Validator} from './TextField.validation';
import {computed, useAttrs} from 'vue';

const model = defineModel<string>({ default: '' });

const props = defineProps<{
  validators?: Validator<string>[]
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  model.value = target.value;
  dispatch('input', target.value);
}

const dispatch = defineEmits<{
  input: [string]
}>();

const attrs = useAttrs();
const mergedAttrs = computed(
  () => ({
    ...attrs,
    ...props,
  })
);

</script>

