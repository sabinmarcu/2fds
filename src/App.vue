<template>
  <h1>Me Vue</h1>
  <div class="grid">
    <p></p>
    <p>Unchecked</p>
    <p>Checked</p>
    <p>Indeterminate</p>

    <p>Default</p>
    <Checkbox>Checkbox input</Checkbox>
    <Checkbox checked>Checkbox input</Checkbox>
    <Checkbox :value="-1">Checkbox input</Checkbox>

    <p>Hover</p>
    <Checkbox :class="{ [getSelector.class('hover')]: true }">Checkbox input</Checkbox>
    <Checkbox :class="{ [getSelector.class('hover')]: true }" checked>Checkbox input</Checkbox>
    <Checkbox :class="{ [getSelector.class('hover')]: true }" :value="-1">Checkbox input</Checkbox>

    <p>Focused</p>
    <Checkbox :class="{ [getSelectors.class('focus', 'focus-within')]: true }">Checkbox input</Checkbox>
    <Checkbox :class="{ [getSelectors.class('focus', 'focus-within')]: true }" checked>Checkbox input</Checkbox>
    <Checkbox :class="{ [getSelectors.class('focus', 'focus-within')]: true }" :value="-1">Checkbox input</Checkbox>

    <p>Error</p>
    <Checkbox aria-invalid>Checkbox input</Checkbox>
    <Checkbox aria-invalid checked>Checkbox input</Checkbox>
    <Checkbox aria-invalid :value="-1">Checkbox input</Checkbox>

    <p>Disabled</p>
    <Checkbox disabled>Checkbox input</Checkbox>
    <Checkbox disabled checked>Checkbox input</Checkbox>
    <Checkbox disabled :value="-1">Checkbox input</Checkbox>

    <p>Read-only</p>
    <Checkbox readOnly>Checkbox input</Checkbox>
    <Checkbox readOnly checked>Checkbox input</Checkbox>
    <Checkbox readOnly :value="-1">Checkbox input</Checkbox>

  </div>
</template>

<script setup lang="ts">
import Checkbox from './components/Checkbox/Checkbox.vue';
import { getSelector, getSelectors } from './utils/selectors';

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1rem;
}
</style>
