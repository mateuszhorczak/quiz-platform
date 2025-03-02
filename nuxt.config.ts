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
        '@pinia/nuxt'
    ],

    colorMode: {
        preference: 'light'
    },

    css: [
        '~/assets/css/tailwind.css'
    ],

    ui: {
        safelistColors: ['error', 'placeholder']
    },

    runtimeConfig: {
        jwtSecret: '',
        turso: {
            databaseUrl: '',
            authToken: '',
        },
    },

    devtools: { enabled: true },
    compatibilityDate: '2024-11-01'
})
