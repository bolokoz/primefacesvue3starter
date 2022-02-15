import path from 'path';
import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import vuePlugin from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import visualizer from 'rollup-plugin-visualizer';
import unocss from 'unocss/vite';
import presetMini from '@unocss/preset-mini';
import AutoImport from 'unplugin-auto-import/vite';

export default ({ command }) => {
  const config: UserConfig = {
    plugins: [
      vuePlugin(),
      vueJsxPlugin(),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx']
      }),
      unocss({
        presets: [presetMini()]
      }),
      Components({
        resolvers: [ElementPlusResolver({ ssr: true })],
        directoryAsNamespace: true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver({ ssr: true })]
      })
    ],
    server: {
      port: 80
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };

  if (command === 'build') {
    config.plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    );
  }

  return config;
};
