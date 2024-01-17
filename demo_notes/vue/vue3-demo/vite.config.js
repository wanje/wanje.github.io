import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 自动导入组件/工具库的API，使无需手动在头部import并注册即可用（似乎只在.vue文件中有效）
import AutoImport from 'unplugin-auto-import/vite'  // https://github.com/antfu/unplugin-auto-import
// 以下为针对 ElementPlus 组件库的自动导入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // 资源基础路径，空字符串或'./'为相对路径，默认根路径'/'
  // publicDir: 'public',  // 静态资源目录位置，默认`public`，此目录中的内容不会经过vite处理，打包时会直接拷贝到设置的outDir目录，且访问时路径已`/`开始
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // imports选项用于注册要自动导入的库，配置方法可查看插件文档，这里直接设置的字符串值是针对插件内presets预设的库（虽为预设，只是预设解析，并非预设使用，要使用仍需显式指明）
      imports: ['vue', 'vue-router', 'pinia'],  // 底层依赖的 unimport 库已内置了大部分常用库，可查看 https://github.com/unjs/unimport/blob/main/src/presets/index.ts
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // dirs: ['src/components'], // 可自动查找导入并注册相关自定义组件的目录(相对路径，默认`src/components`目录，类似nuxt.js中自定导入注册该目录下组件)
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // extensions: ['.js', '.jsx', '.vue'], // 导入时想要省略的扩展名列表，官方并不建议忽略.vue这类自定义文件扩展命名，默认['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    devSourcemap: true, // 开发环境下开启css sourceMap
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixins.scss";' // scss全局注入
      }
    }
  },
  // build: {
  //   outDir: 'dist',  // 指定打包输出路径，默认‘dist’
  //   assetsDir: 'assets',  // 打包后静态资源的存放路径（相对上面的`outDir`），默认`assets`
  //   assetsInlineLimit: 4096,  // 静态资源内联限制大小(字节)，不超过此大小的图片等静态资源将转为base64内联，默认`4096`即`4kb`
  //   target: 'modules',  // 设置构建时的浏览器兼容目标，可以是ES版本，也可以是浏览器版本，默认`modules`，表示支持模块化的浏览器
  // },
  server: {
    // base: '',  // http请求的基础前置路径
    host: true, // 此时将同时监听局域网和公网，可用于使用ip形式访问，默认 localhost
    // port: 8080, // 自定义端口号，默认 5173
    open: true,
    proxy: {
      // 字符串简写写法：http://localhost:5173/bd_finance -> https://finance.pae.baidu.com/bd_finance
      '/bd_finance': 'https://finance.pae.baidu.com',
      // 选项写法
      '/bd_gushitong': {
        target: 'https://gushitong.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bd_gushitong/, '')  // 重写部分路径
      },
      // 正则写法
      '^/bd_opendata': {
        target: 'http://opendata.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bd_opendata/, '')
      },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true, // 是否代理websockets
      },
    }
  },
})
