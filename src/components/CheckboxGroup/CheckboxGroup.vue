<template>
  <div :class="{ [checkboxGroupStyle]: true }">
    <Checkbox :aria-controls="ids.join(' ')" :aria-checked="ownStateValue" :value="ownState" @change="onToggle">
      {{ label }}
    </Checkbox>
    <div ref="rootReference" :class="{ [checkboxGroupListStyle]: true }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onWatcherCleanup, ref, useTemplateRef, watchEffect } from 'vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import {
  checkboxGroupListStyle,
  checkboxGroupStyle,
} from './CheckboxGroup.css.ts';
import {
  deriveA11yState,
  deriveOwnState,
  detectState,
  toggleState,
  type StatesType,
} from './CheckboxGroup.core.ts'

const { label } = defineProps<{ label?: string }>();

const rootReference = useTemplateRef('rootReference')
const ids = ref<string[]>([]);
const states = ref<StatesType>([])
const ownState = computed(
  () => deriveOwnState(states.value)
)

watchEffect(() => {
  const updater: Parameters<typeof detectState>[1] = (fn) => {
    const newState = fn(states.value);
    states.value = newState;
  }
  const detectResult = detectState(
    rootReference.value,
    updater,
  );
  if (!detectResult) {
    return;
  }
  const [detectedIds, cleanup] = detectResult;
  ids.value = detectedIds;
  onWatcherCleanup(cleanup);
});

const ownStateValue = computed(
  () => deriveA11yState(ownState.value)
);

const onToggle = () => (
  toggleState(rootReference.value, ownState.value)
);
</script>
