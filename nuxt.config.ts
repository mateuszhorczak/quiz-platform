// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "My favourite quiz",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    jwtSecret: '',
    turso: {
      databaseUrl: '',
      authToken: '',
    },
  },

  devtools: { enabled: process.env.NODE_ENV === 'development' },
  compatibilityDate: '2024-11-01'
})
