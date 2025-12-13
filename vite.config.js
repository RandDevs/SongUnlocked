import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: './',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
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
                scope: '/',
                start_url: '/',
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
