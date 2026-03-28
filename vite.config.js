import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    // Copy my_resume/ into dist/my_resume/ at build time
    viteStaticCopy({
      targets: [{ src: 'my_resume', dest: '' }],
    }),
    // Serve my_resume/ in dev server
    {
      name: 'serve-my-resume',
      configureServer(server) {
        server.middlewares.use('/my_resume', (req, res, next) => {
          const filePath = path.join(process.cwd(), 'my_resume', req.url.replace(/^\//, ''))
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`)
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      },
    },
  ],
  // In CI, VITE_BASE is set to /repo-name/ by the workflow. Locally stays '/'.
  base: process.env.VITE_BASE || '/',
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})
