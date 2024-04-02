import { defineConfig } from 'vite'

import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

import vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
    base: "/",
    server: {
        https: true
    },
    plugins: [
        vue(),
        mkcert(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Carbon Application',
                short_name: 'carbon-app',
                description: 'Carbon Emission Web Application',
                theme_color: '#32a852',
                // all src folder for icons or images for pwa should be placed in the public folder and not src
                icons: [
                    {
                        src: '/assets/icons/icon-48x48.png',
                        sizes: '48x48',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icons/icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: '/assets/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },                    
                ],
                screenshots: [
                    {
                      "src": "/assets/screenshots/screenshot1.png",
                      "type": "image/png",
                      "sizes": "540x720",
                      "form_factor": "narrow"
                    },
                    {
                      "src": "/assets/screenshots/screenshot2.png",
                      "type": "image/jpg",
                      "sizes": "720x540",
                      "form_factor": "wide"
                    }
                ]
            },
            workbox: {
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg}'
                ]
            },
            devOptions: {
                enabled: true
            },
        }),
    
    ],
    resolve: {
        alias: {
            "@"         : path.resolve(__dirname, "src"),
            "@swal"     : path.resolve(__dirname, "node_modules/sweetalert2"),
            "@loader"   : path.resolve(__dirname, "node_modules/vue-loading-overlay"),
            "@toasty"   : path.resolve(__dirname, "node_modules/vue-toastification"),
            "@widgets"  : path.resolve(__dirname, "node_modules/vue-smart-widget"),
            "@bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
        }        
    }
})
