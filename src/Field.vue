<template>
  <NumberInput v-model="value" v-bind="$attrs" />
  <!-- <NumberInput :value="value" @input="onChange" v-bind="$attrs" :validators="[(input: string) => input?.length > 5 ? 'nope' : undefined]" required="true"/> -->
</template>

<script setup lang="ts">
import {ref} from 'vue';
import NumberInput from './components/Input/NumberInput.vue';

const value = ref(0);
// const onChange = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   value.value = target.value;
// }

console.log(value.value);
</script>
