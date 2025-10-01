<template>
  <form :class="formStyle" @submit.prevent="onSubmit">
    <TextInput name="name" label="Full Name" v-model="name" />
    <TextInput name="email" label="Email Address" v-model="email" :validators="emailValidators" />
    <NumberInput name="age" label="Age" v-model="age" :validators="ageValidators" />
    <CheckboxGroup label="Agree to all below">
      <Checkbox name="terms" v-model="terms">Agree to terms & conditions</Checkbox>
      <Checkbox name="commercial" v-model="commercial">Agree to commercial uses of PII</Checkbox>
      <span style="width: 0; height: 0; overflow: hidden;">
        <Checkbox name="fine-print" v-model="finePrint">Agree to sell your soul to the devil</Checkbox>
      </span>
    </CheckboxGroup>
    <Button type="submit" :disabled="!report">Submit!</Button>
  </form>
</template>

<script setup lang="ts">
import TextInput from '../Input/TextInput.vue';
import NumberInput from '../Input/NumberInput.vue'
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup.vue'
import Checkbox, { type States } from '../Checkbox/Checkbox.vue'
import Button from '../Button/Button.vue'
import { emailValidators, ageValidators } from './Form.constants.ts'
import { formStyle } from './Form.css';
import { ref, computed } from 'vue';
import { parseReport, type ReportType } from './FormReport.constants.ts';

const name = ref<string>('')
const email = ref<string>('')
const age = ref<number>(0)
const terms = ref<States>(0)
const commercial = ref<States>(0)
const finePrint = ref<States>(0)

const report = computed(
  () => parseReport({
    name: name.value,
    email: email.value,
    age: age.value,
    terms: terms.value,
    commercial: commercial.value,
    finePrint: finePrint.value
  })
)

const dispatch = defineEmits<{
  submit: [ReportType]
}>()

const onSubmit = () => {
  if (report.value) {
    dispatch('submit', report.value)
    name.value = '';
    email.value = '';
    age.value = 0;
    terms.value = 0;
    commercial.value = 0;
    finePrint.value = 0;
  }
}

</script>
