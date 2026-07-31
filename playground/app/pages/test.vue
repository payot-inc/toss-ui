<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const tabs = Array.from({ length: 10 }, (_, index) => ({ label: `탭 제목${index + 1}`, slot: `index${index + 1}` }) as TabsItem)
</script>

<template>
  <UTabs :items="tabs">
    <template #index1>
      asdfasdf
    </template>
  </UTabs>
</template>
