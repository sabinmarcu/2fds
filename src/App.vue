<template>
  <h1>Vue Application</h1>
  <Form @submit="onSubmit" />
  <FormReport v-if="!!report" v-bind="report" />
</template>

<script setup lang="ts">
import Form from './components/Form/Form.vue'
import FormReport from './components/Form/FormReport.vue'
import { type ReportType } from './components/Form/FormReport.constants.ts'
import { ref } from 'vue';

const report = ref<ReportType>();
const onSubmit = (value: ReportType) => {
  report.value = value
}
</script>