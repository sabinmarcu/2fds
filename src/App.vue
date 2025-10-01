<template>
  <h1>Me Vue</h1>
      <div class="grid">

        <p>Default</p>
        <Field label="Text Input" />

        <p>Hover</p>
        <Field label="Text Input" :class="{[getSelector.class('hover')]: true}" />

        <p>Focused</p>
        <Field label="Text Input" :class="{[ getSelectors.class('focus', 'focus-within') ]: true}">
          <template v-slot:left>Stuff</template>
        </Field>

        <p>Error</p>
        <Field label="Text Input" :validators="[() => 'This is an error']" required="true" />

        <p>Disabled</p>
        <Field label="Text Input" disabled />

        <p>Read-only</p>
        <Field label="Text Input" readOnly />

      </div>
</template>

<script setup lang="ts">
import Field from './Field.vue';

import {
  getSelector,
  getSelectors,
} from './utils/selectors.ts';

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1rem;
}
</style>
