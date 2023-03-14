const path = require('path');
// const resolve = dir => path.join(__dirname, '.', dir);
const resolve = dir => path.resolve(__dirname, dir);
// const webpack = require("webpack");
const CracoLessPlugin = require('craco-less');
// const CracoScopedCssPlugin = require('craco-plugin-scoped-css');
const isProduction = process.env.NODE_ENV === 'production'; // 可通过`process.env.NODE_ENV`知道当前环境：production、development、test
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const Analyzer = () => {
//   //! 这里的环境变量 REACT_APP_ENV 是在执行scripts命令时设置的
//   return process.env.REACT_APP_ENV === 'test_build' ? new BundleAnalyzerPlugin() : function() {} // webpack插件参数要求是个函数实例
// };

const port = 3000;

function addScopedCssLoader(test, targetRule) {
  const rules = targetRule.use;
  let newRule = null;
  let cssLoaderIndex = -1;
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule.loader && rule.loader.includes('css-loader')) {
      cssLoaderIndex = i;
      break
    }
  }
  if (cssLoaderIndex !== -1) {
    const scopedCssRule = { loader: require.resolve('scoped-css-loader') };
    const newUse = [...rules];
    newUse.splice(cssLoaderIndex + 1, 0, scopedCssRule);
    newRule = { test, use: newUse };
  }
  // console.log('newRule:', newRule);
  return newRule;
}

module.exports = {
  devServer: {
    port: port,
    proxy: {
      '/mock': {
        target: `http://localhost:${port}/static/mock`,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      },
      '/dform': {
        target: 'http://172.18.234.186:8083',
        changeOrigin: true,
        ws: false
      }
    }
  },
  webpack: {
    alias: {
      '@': resolve('src')
    },
    plugins: [
      isProduction ? new BundleAnalyzerPlugin() : function() {},
      //* 对于 moment.js 库语言包体积过大问题，若只需要中文包则可以只打包进中文语言包（注意在顶部引入 webpack）
      // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
      //? 对于 antd 低版本组件库也可以用其提供的 antd-dayjs-webpack-plugin 插件用 Day.js 替换 momentjs 来大幅减小打包大小（网友反馈有bug？）
      //? 或者使用 webpack.IgnorePlugin 插件忽略其所有语言包打包，自行在入口文件中手动引入需要的语言包，参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    ],
    configure: (webpackConfig) => {
      //* 更改打包输出位置（原始为 build 目录，绝对根路径）
      webpackConfig.output = {
        ...webpackConfig.output,
        // path: resolve('dist'), //todo 更改之后打包时 public 下的其他静态资源并未一并拷贝到新目录下，而是仍拷贝到了 build 目录，且打包分析界面也无法加载
        publicPath: './'
      };

      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      let cssIndex;
      const cssRule = oneOfRule.oneOf.find((rule, index) => {
        const f = rule.test &&
                  rule.test.toString().includes('.css$') &&
                  rule.test.toString().indexOf('.module') === -1;
        if (f) {
          cssIndex = index;
          return true;
        }
      });
      if (cssRule) {
        cssRule.exclude = /\.(module|scoped)\.css$/;
        const newRule =  addScopedCssLoader(/\.scoped\.css$/, cssRule);
        // console.log('newRule:', newRule);
        // if (newRule) webpackConfig.module.rules.push(newRule);
        if (newRule) oneOfRule.oneOf.splice(cssIndex + 1, 0, newRule);
      }
      webpackConfig.module.rules.push({
        test: /\.module\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              importLoaders: 2,
              modules: true // 开启模块化
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: !isProduction,
              prependData: `
                @import "~@/style/variables.less";
                @import "~@/style/mixins.less";
              `
            }
          },
        ]
      }, {
        test: /\.scoped\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              importLoaders: 2
            }
          },
          // You have to put it after `css-loader` and before any `pre-precessing loader`
          { loader: 'scoped-css-loader' },
          {
            loader: 'less-loader',
            options: {
              sourceMap: !isProduction,
              prependData: `
                @import "~@/style/variables.less";
                @import "~@/style/mixins.less";
              `
            }
          }
        ]
      });

      //! 这里只是打印原始配置内容查看
      // console.log("webpackNewRules:", webpackConfig.module.rules);
      // console.log("webpackNewRulesOneOf:", webpackConfig.module.rules[2].oneOf);
      return webpackConfig;
    }
  },
  babel: {
    plugins: [
      [
        "import", // 按需引入'antd'
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true // 设置为true即是less，或者指定为'css'
        }
      ],
      ["react-scoped-css", { include: /\.scoped\.(sa|sc|c|le)ss$/ }]
    ]
  },
  style: {
    css: {
      loaderOptions: {
        sourceMap: !isProduction
      }
    },
    postcss: {
      env: {
        autoprefixer: {
          flexbox: true // 覆盖CRA内置该选项值"no-2009"(该值只会为最终版本和IE10版本的flexbox规范添加前缀)
        },
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // styleLoaderOptions: {
        //   sourceMap: !isProduction
        // },
        lessLoaderOptions: {
          sourceMap: !isProduction,
          prependData: `
            @import "~@/style/variables.less";
            @import "~@/style/mixins.less";
          `,
          lessOptions: {
            // modifyVars: {
            //   '@primary-color': '#1DA57A'
            // },
            javascriptEnabled: true
          }
        },
        modifyLessRule: (rule) => {
          rule.exclude = /\.(module|scoped)\.less$/; // 这里排除了module和scoped，则前面设置的注入文件在这个两类中将不生效，需要在单独的module和scoped类less文件loader处理中配置或手动引入
          return rule;
        }
      }
    },
    // {
    //   plugin: CracoScopedCssPlugin
    // }
  ]
};