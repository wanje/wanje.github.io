import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 自动导入组件/工具库的API，使无需手动在头部import并注册即可用（似乎只在.vue文件中有效）
import AutoImport from 'unplugin-auto-import/vite'  // https://github.com/antfu/unplugin-auto-import
// 以下为针对 ElementPlus 组件库的自动导入注册
import Components from 'unplugin-vue-components/vite' // 自动注册
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 针对 ElementPlus 中 SVG 图标的自动导入
//!! 实测发现 ElementPlusResolver 中已包含图标的引入，以`el-icon-`或`ElIcon`开头即可使用，故若需要引入 Iconify 中的其他图标集合再使用下面的配置
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

import { vue2md } from './vite.plugin.js';

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
      resolvers: [
        ElementPlusResolver(),
        // IconsResolver({ //!! 注意，图标使用时的实际icon组件名是由三部分组成的(以便用于自动追踪来源)：{prefix}-{collection}-{icon}
        //   prefix: false,  // 不使用前缀，默认为`i`
        // })
      ],
      eslintrc: { // 该配置项用于解决ESLint报错自动导入的组件未定义问题
        enabled: false, // 1、改为true用于生成eslint配置；2、生成后改回false，避免重复生成消耗（或直接移除此处 eslintrc 配置项）
        // filepath: './.eslintrc-auto-import.json', // 生成的配置文件即路径(可自定义，然后将生成的文件添加到.eslintrc.cjs配置文件中)，这里为默认值
        // globalsPropValue: true  // 作为全局属性可在所有文件中使用，默认true
      }
    }),
    Components({
      // dirs: ['src/components'], // 可自动查找导入并注册相关自定义组件的目录(相对路径，默认`src/components`目录，类似nuxt.js中自定导入注册该目录下组件)
      resolvers: [
        ElementPlusResolver(),
        // IconsResolver({
        //   enabledCollections: ['ep']  // 图标集id，可选，默认支持 Iconify 中的所有集合
        // })
      ],
    }),
    // Icons({
    //   autoInstall: true
    // }),
    vue2md()
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
  //   target: 'es2015',  // 构建产物的浏览器兼容目标，最低支持`es2015`，默认为`modules`，即原生支持ESM的浏览器，具体可查看兼容性描述：https://cn.vitejs.dev/guide/build.html#browser-compatibility
  //   outDir: 'dist',  // 指定打包输出路径，默认‘dist’
  //   assetsDir: 'assets',  // 打包后静态资源的存放路径（相对上面的`outDir`），默认`assets`
  //   assetsInlineLimit: 4096,  // 静态资源内联限制大小(字节)，不超过此大小的图片等静态资源将转为base64内联，默认`4096`即`4kb`
  //   target: 'modules',  // 设置构建时的浏览器兼容目标，可以是ES版本，也可以是浏览器版本，默认`modules`，表示支持模块化的浏览器
  //   cssTarget: "chrome61", //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式  (要兼容的场景是安卓微信中的webview时,因其不支持CSS中的#RGBA十六进制颜色符号)
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
  define: {
    // 启用/禁用生产环境构建下激活 (hydration) 不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
  }
})
