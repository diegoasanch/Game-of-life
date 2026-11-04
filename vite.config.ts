import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    // GitHub Pages serves the app under /Game-of-life/, Vercel previews serve it at the root
    base: process.env.VERCEL ? '/' : '/Game-of-life/',
    plugins: [react()],
    // Blueprint 3's CSS has selectors lightningcss rejects (`::after.bp3-active`)
    build: {
        outDir: 'build',
        cssMinify: 'esbuild',
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        { name: 'blueprint-icons', test: /@blueprintjs[\\/]icons/ },
                        { name: 'vendor', test: /node_modules/ },
                    ],
                },
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
    },
})
