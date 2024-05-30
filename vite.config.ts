import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock插件提供的方法
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取对应的开发环境 方便加载不同开发环境的配置信息
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 是否需要代理服务器跨域
          changeOrigin: true,
          // 路径重写 将匹配到的路径中的/api替换为空串
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
