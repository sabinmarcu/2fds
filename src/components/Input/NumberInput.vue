<template>
  <TextField
    v-bind="mergedAttrs"
    :validators="ownValidators"
    v-model="model"
    @change="onChange"
    type="number"
    :class="numberInputRootStyle"
  >
    <template v-slot:left>
      <Button
        :class="numberInputButtonStyle"
        variant="text"
        @click="decrement"
        aria-label="Decrement"
        type="button"
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.5417 1.00001C11.5417 0.700856 11.2992 0.458344 11 0.458344L1.00002 0.458344C0.700867 0.458344 0.458355 0.700857 0.458355 1.00001C0.458355 1.29917 0.700867 1.54168 1.00002 1.54168L11 1.54168C11.2992 1.54168 11.5417 1.29916 11.5417 1.00001Z" fill="currentColor"/>
        </svg>
      </Button>
    </template>
    <template v-slot:right>
      <Button
        :class="numberInputButtonStyle"
        variant="text"
        @click="increment"
        aria-label="Increment"
        type="button"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.00004 0.458344C6.2992 0.458344 6.54171 0.700856 6.54171 1.00001V5.45834L11 5.45834C11.2992 5.45834 11.5417 5.70086 11.5417 6.00001C11.5417 6.29916 11.2992 6.54168 11 6.54168H6.54171V11C6.54171 11.2992 6.29919 11.5417 6.00004 11.5417C5.70089 11.5417 5.45837 11.2992 5.45837 11V6.54168L1.00004 6.54168C0.700886 6.54168 0.458374 6.29917 0.458374 6.00001C0.458374 5.70086 0.700886 5.45834 1.00004 5.45834L5.45837 5.45834V1.00001C5.45837 0.700856 5.70089 0.458344 6.00004 0.458344Z" fill="currentColor"/>
        </svg>
      </Button>
    </template>
  </TextField>
</template>

<script setup lang="ts">
import {
  numberInputButtonStyle,
  numberInputRootStyle,
} from './NumberInput.css';
import { computed, useAttrs } from 'vue';
import Button from '../Button/Button.vue';
import TextField from './TextField.vue';
import { numberValidator } from './NumberInput.constants';
import type { Validator } from './TextField.validation';

type ValueType = number | '';
const props = defineProps<{
  validators?: Validator<ValueType>[]
}>();

const dispatch = defineEmits<{
  input: [ValueType]
}>()

const model = defineModel<ValueType>({ default: 0 });

const attrs = useAttrs();
const mergedAttrs = computed(
  () => ({
    ...attrs,
    ...props,
  })
)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const next = Number.parseFloat(`${target.value}`);
  const nextValue = Number.isNaN(next) ? '' : next;
  model.value = nextValue;
  dispatch('input', nextValue);
}

const mutate = (by: number) => {
  const next = Number.parseFloat(`${model.value}`);
  const nextValue = (Number.isNaN(next) ? 0 : next) + by;
  model.value = nextValue;
  dispatch('input', nextValue)
}
const increment = mutate.bind(undefined, 1)
const decrement = mutate.bind(undefined, -1)
const ownValidators = computed(
  () => [
    ...props.validators ?? [],
    numberValidator,
  ]
)
</script>