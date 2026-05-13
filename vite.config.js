import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    server: {
        fs: {
            allow:[
                'utils',
                'index.html',
                'javascript',
                'css',
                'imagens'
            ]
        }
    },
})