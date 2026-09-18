import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Inlines the built CSS chunks into index.html so there is no
 * render-blocking <link rel="stylesheet"> request on the critical path.
 */
function inlineCssPlugin(): Plugin {
  return {
    name: 'noema-inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const cssChunks = Object.values(bundle).filter(
        (item) =>
          (item as any).type === 'css' ||
          ((item as any).type === 'asset' && item.fileName.endsWith('.css')),
      )
      if (cssChunks.length === 0) return

      const htmlKey = Object.keys(bundle).find((key) => key.endsWith('.html'))
      if (!htmlKey) return
      const htmlAsset = bundle[htmlKey] as any
      if (typeof htmlAsset.source !== 'string') return

      let html = htmlAsset.source

      // Remove emitted stylesheet <link> tags for the bundled CSS
      for (const chunk of cssChunks) {
        const urlPath = '/' + chunk.fileName.replace(/\\/g, '/')
        html = html.replace(
          new RegExp(`<link[^>]+href="${urlPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`),
          '',
        )
      }

      const inlineStyles = cssChunks
        .map((chunk) => `<style>${(chunk as any).code ?? (chunk as any).source}</style>`)
        .join('\n')

      htmlAsset.source = html.replace('</head>', `${inlineStyles}\n</head>`)

      // The CSS now lives inline in the HTML — drop the standalone file
      for (const chunk of cssChunks) {
        delete bundle[chunk.fileName]
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
})
