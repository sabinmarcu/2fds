<template>
  <h1>Me Vue</h1>
  <div class="grid">
    <p></p>
    <p>Primary</p>
    <p>Secondary</p>
    <p>Text</p>
    <p>Danger</p>

    <p>Default</p>
    <Button variant="primary">Button</Button>
    <Button variant="secondary">Button</Button>
    <Button variant="text">Button</Button>
    <Button variant="danger">Button</Button>

    <p>Hover</p>
    <Button variant="primary" :class="{ [getSelector.class('hover')]: true }">Button</Button>
    <Button variant="secondary" :class="{ [getSelector.class('hover')]: true }">Button</Button>
    <Button variant="text" :class="{ [getSelector.class('hover')]: true }">Button</Button>
    <Button variant="danger" :class="{ [getSelector.class('hover')]: true }">Button</Button>

    <p>Pressed</p>
    <Button variant="primary" :class="{ [getSelector.class('active')]: true }">Button</Button>
    <Button variant="secondary" :class="{ [getSelector.class('active')]: true }">Button</Button>
    <Button variant="text" :class="{ [getSelector.class('active')]: true }">Button</Button>
    <Button variant="danger" :class="{ [getSelector.class('active')]: true }">Button</Button>

    <p>Focused</p>
    <Button variant="primary" :class="{ [getSelectors.class('focus', 'focus-within')]: true }">Button</Button>
    <Button variant="secondary" :class="{ [getSelectors.class('focus', 'focus-within')]: true }">Button</Button>
    <Button variant="text" :class="{ [getSelectors.class('focus', 'focus-within')]: true }">Button</Button>
    <Button variant="danger" :class="{ [getSelectors.class('focus', 'focus-within')]: true }">Button</Button>

    <p>Disabled</p>
    <Button variant="primary" disabled>Button</Button>
    <Button variant="secondary" disabled>Button</Button>
    <Button variant="text" disabled>Button</Button>
    <Button variant="danger" disabled>Button</Button>
  </div>
</template>

<script setup lang="ts">
import { getSelector, getSelectors } from './utils/selectors.ts';
import Button from './components/Button/Button.vue';

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1rem;
}
</style>
