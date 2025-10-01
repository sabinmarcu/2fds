<template>
  <h1>Form Report</h1>
  <p>Name: {{ name }}</p>
  <p>Email: {{ email }}</p>
  <p>Age: {{ age }}</p>
  <p>Agreements: {{[
    terms && "Terms & Conditions",
    commercial && 'Commercial uses',
    finePrint && 'Sold your soul'
  ].filter(Boolean).join(', ')}}</p>
</template>

<script setup lang="ts">
import type { ReportType } from "./FormReport.constants"

const {
  name,
  email,
  age,
  terms,
  commercial,
  finePrint
} = defineProps<ReportType>();

</script>