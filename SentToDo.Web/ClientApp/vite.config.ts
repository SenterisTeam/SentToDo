import {defineConfig, loadEnv, UserConfigExport} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '')

    const config: UserConfigExport = {
        plugins: [react(), VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.ts',
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'favicon.ico', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'apple-touch-icon.png'],
            devOptions: {
                enabled: true,
                type: 'module'
            },
            injectManifest: {
                globPatterns: ["**/*.{js,css,html,svg,png}"]
            },
            manifest: {
                name: 'SentToDo',
                short_name: 'STD',
                description: 'Progressive web todo',
                theme_color: '#016fb8',
                background_color: '#000000',
                icons: [
                    {
                        "src": "/android-chrome-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/android-chrome-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
            }
        })],
        build: {
            sourcemap: true
        },
        server: {
            port: parseInt(env['PORT']),
            https: {
                cert: env['SSL_CRT_FILE'],
                key: env['SSL_KEY_FILE']
            },
            proxy: {
                '/api': {target: 'https://localhost:7256', secure: false},
                '/swagger': {target: 'https://localhost:7256', secure: false},
            }
        }
    }

    return config;
})
