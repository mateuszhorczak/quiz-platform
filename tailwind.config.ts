// /** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
export default {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                placeholder: '#9ca3af',
                error: {
                    light: '#fb7185',
                    main: '#f43f5e',
                    dark: '#e11d48',
                },

            }
        },
    },
    plugins: [],
} satisfies Config
