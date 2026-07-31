<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <UApp>
    <header class="sticky top-0 z-10 border-b border-default bg-default/80 backdrop-blur">
      <UContainer class="flex h-(--ui-header-height) items-center justify-between">
        <span class="font-bold text-highlighted">
          toss-ui
        </span>

        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            :aria-label="isDark ? '라이트 모드로 전환' : '다크 모드로 전환'"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>
      </UContainer>
    </header>

    <NuxtPage />
  </UApp>
</template>
