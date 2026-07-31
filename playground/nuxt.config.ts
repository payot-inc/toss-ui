export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '../src/module'
  ],

  devtools: {
    enabled: true
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
