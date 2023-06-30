import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
const envparser = require('./config/envparser')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>{
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...envparser(), ...loadEnv(mode, process.cwd())};
  console.log(process.env.API_URL)
  return {
    define: {
      'process.env': process.env
    },
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/header.js'),
        name: 'Finplan Header',
        // the proper extensions will be added
        fileName: 'header',
        minify: true
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    },

    plugins: [
      vue(transformAssetUrls),
      quasar({
        sassVariables: 'src/css/quasar.variables.sass'
      })
    ],
  }
})
