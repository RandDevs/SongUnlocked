import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: './',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'pwa-icon.png', 'guitar-bg.png', 'ukulele-bg.png'],
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
                cleanupOutdatedCaches: false
            },
            devOptions: {
                enabled: true
            },
            manifest: {
                name: 'SongUnlocked',
                short_name: 'SongUnlocked',
                description: 'Your personal song mastery tracker for Guitar and Ukulele',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                scope: './',
                start_url: './',
                icons: [
                    {
                        src: 'pwa-icon.png',
                        sizes: '192x192 512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
})
