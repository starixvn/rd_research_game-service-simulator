import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  plugins: [
    react({
      babel: {
          plugins: [
              ["transform-commonjs"],
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              [
                  "@babel/plugin-proposal-class-properties",
                  { loose: true },
              ],
          ],
      },
  }),
    // babel({
    //   babelConfig: {
    //     plugins: [
    //       ["@babel/plugin-syntax-decorators", {legacy: true}],
    //       ['@babel/plugin-proposal-decorators', { loose: true }]]
    //   }
    // }),
  ],
})
