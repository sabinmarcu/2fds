<template>
  <h1>Me Vue</h1>
  <CheckboxGroup label="All of them">
    <Checkbox name="stuff">Some Stuff</Checkbox>
    <Checkbox name="other stuff">Some other Stuff</Checkbox>
    <Checkbox name="awesome">Some awesome Stuff</Checkbox>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import Checkbox from './components/Checkbox/Checkbox.vue';
import CheckboxGroup from './components/CheckboxGroup/CheckboxGroup.vue';

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1rem;
}
</style>
