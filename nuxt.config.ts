// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "My favourite quiz",
            viewport: "width=device-width, initial-scale=1",
            charset: "utf-8",
        },
    },

    css: [
        '~/assets/css/tailwind.css'
    ],

    colorMode: {
        preference: 'light'
    },

    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        '@pinia/nuxt'
    ],

    ui: {
        safelistColors: ['error', 'placeholder']
    },

    devtools: { enabled: true },
    compatibilityDate: '2024-11-01'
})
