<template>
  <div :class="{ [checkboxStyles({ state: stateVariant })]: true }">
    <input type="checkbox" :class="{ [checkboxInputStyle]: true }" :readonly="!!readOnly" @change="localOnChange"
      :id="id" ref="inputReference" v-bind="$attrs" />

    <label :for="id" :class="{ [checkboxBoxStyle]: true }">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"
        v-if="state === States.CHECKED">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M9.47417 1.05544C9.7197 1.31733 9.70644 1.72867 9.44455 1.9742L4.11141 6.9742C3.86138 7.2086 3.47232 7.20861 3.22229 6.97422L0.555433 4.47422C0.293531 4.22871 0.280247 3.81737 0.525763 3.55546C0.771278 3.29356 1.18262 3.28028 1.44452 3.52579L3.66681 5.60904L8.55541 1.02582C8.8173 0.780288 9.22864 0.793549 9.47417 1.05544Z"
          fill="white" />
      </svg>

      <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"
        v-if="state === States.INDETERMINATE">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M11.1499 0.999994C11.1499 1.35898 10.8589 1.64999 10.4999 1.64999L1.4999 1.64999C1.14092 1.64999 0.849903 1.35898 0.849903 0.999993C0.849903 0.641008 1.14092 0.349993 1.4999 0.349993L10.4999 0.349994C10.8589 0.349994 11.1499 0.641009 11.1499 0.999994Z"
          fill="white" />
      </svg>
    </label>

    <label :for="id" :class="{ [checkboxTextStyle]: true }">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import { computed, ref, useAttrs, useTemplateRef, watchEffect, type InputHTMLAttributes } from 'vue';

import {
  States,
  styleVariantMapping,
} from './Checkbox.constants';
import { checkboxBoxStyle, checkboxInputStyle, checkboxStyles, checkboxTextStyle } from './Checkbox.css';

const {
  value,
} = defineProps<{
  value?: typeof States[keyof typeof States]
}>();
const dispatch = defineEmits<{
  change: [typeof States[keyof typeof States]]
}>()
const {
  checked,
  readOnly,
} = useAttrs();

const id = ref(nanoid());
const inputReference = useTemplateRef<HTMLInputElement>('input');
const deriveStateFromProps = (
  innerValue: typeof value,
  innerChecked: typeof checked,
) => (
  innerValue !== undefined
    ? innerValue
    : (innerChecked !== undefined ? States.CHECKED : States.UNCHECKED)
)
const state = ref<typeof States[keyof typeof States]>(deriveStateFromProps(value, checked))

watchEffect(
  () => state.value = deriveStateFromProps(value, checked)
);

const stateVariant = computed(
  () => styleVariantMapping[state.value]
);

const localOnChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.readOnly) {
    return;
  }

  const nextState = (
    (target.indeterminate && States.INDETERMINATE)
    || (target.checked && States.CHECKED)
    || States.UNCHECKED
  );

  state.value = nextState;
  dispatch('change', nextState);
}

watchEffect(
  () => {
    if (!inputReference.value) {
      return;
    }

    inputReference.value.indeterminate = state.value === States.INDETERMINATE;
    inputReference.value.checked = state.value === States.CHECKED;
  }
)
</script>
