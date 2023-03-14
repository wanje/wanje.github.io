## 创建react工程（使用官方CRA脚手架）

若是第一次使用`create-react-app`(简称`CRA`)创建react工程，则需要全局安装，下次就无需再安装了

```shell
npm install -g create-react-app
```
若未安装`create-react-app`包就进行下面的react工程创建，创建的工程结构将缺少很多内容

```shell
npx create-react-app appName  // 创建JavaScript版本工程

npx create-react-app appName --template typescript  // 创建typescript版本工程
```
* 注意1：typescript只是开发依赖，所以若自己用其他脚手架安装时要安装在开发依赖中
* 注意2：因前面全局安装了`create-react-app`，所以上面创建工程也可以直接使用`create-react-app appName`的方式

## 重写CRA脚手架部分配置

`create-react-app`(简称`CRA`)创建的react工程默认是没有暴露相关配置文件的，而我们有时又需要去修改或扩展部分配置内容，以满足我们自己的工程需求或开发模式。

`CRA`官方也提供了两种方式去设置部分内容或完全控制相关配置：
* 方式一：可以通过其提供的一些选项去在`shell`环境变量或`.env`文件中设置部分内容，但是没那么直观，也不够全，不能满足我们自定义的一些配置。
* 方式二：提供了`npm run eject`命令将所有配置文件都暴露出来，但是这样做的风险较大，一方面这是一个不可逆操作，执行后所有的配置都需要我们自行维护，也无法跟随官方对`CRA`的升级，另一方面暴露出的配置文件多而杂，但实际我们只需要修改或增加部分内容，全暴露出来不好维护，其他工程也不好复用。

综上，我们想要继续使用`CRA`的封闭特点和后续更新特性，又想根据自己的工程自定义一些配置或扩展，故最好的方式就是采用第三方扩展，只覆写我们需要的部分，又可以不暴露出`CRA`所有配置文件。

可安装`craco`（使用`craco.config.js`配置文件）或者`react-app-rewired`和`customize-cra`两个包（使用`config-overrides.js`配置文件），用于重写`CRA`脚手架的某些`webpack`等配置，而不用执行`eject`去把CRA脚手架本身的所有配置文件全暴露出来。

```shell
npm install @craco/craco -D
或
npm install react-app-rewired customize-cra -D
```

### 按需引入`antd`，需要使用`babel-plugin-import`插件

```shell
npm install babel-plugin-import -D
```
```js
module.exports = {
  babel: {
    plugins: [
      [
        "import", // 按需引入'antd'
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true // 设置为true即是less，或者指定为'css'
        }
      ]
    ]
  }
}
```

### 使用`less`

```shell
// 使用`craco`
npm install craco-less -D
或
// 使用`react-app-rewired`和`customize-cra`
npm install less less-loader -D
```
```js
// 以`craco-less`为例
const CracoLessPlugin = require('craco-less');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          // 在全局less文件中注入样式变量文件
          prependData: `
            @import "~@/style/variables.less";
            @import "~@/style/mixins.less";
          `,
          lessOptions: {
            javascriptEnabled: true,
            // 覆盖`antd`中主题的`less`样式变量，如不使用该方式而是采用官方说的引入自定义的`less` 变量文件覆盖主题默认变量的方式就要把`antd`的`less`样式文件全局引入，此时上面的`babel-plugin-import`按需引入对`antd`的样式文件来说就不生效了
            modifyVars: {
              '@primary-color': '#1DA57A'
            }
          },
        }
      }
    },
  ]
}
```

### 扩展 CSS Module 以支持less模块化（`xxx.module.less`）

CRA创建的react工程中常规样式文件内容打包后都是全局作用域的，不同视图的样式可能照成互相影响而出现混乱，而 CSS Module 的目的就是解决样式作用域问题，避免样式全局污染，`css`和`sass/scss`的模块化CRA默认是配置好的，而对于`less`模块化就需要我们自己进行扩展配置了。

在此之前需要添加`less`支持，这在之前一篇帖子中已介绍（[重写create-react-app创建的react工程部分配置或扩展](http://eip.teamshub.com/t/4870271)），可移步查看。

这里我们仍然以`craco`为例进行CRA相关`webpack`扩展配置，具体在`craco.config.js`文件中添加如下配置项内容。
```js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.module\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          {
            loader: 'less-loader',
            // 若有全局 less 注入文件则可增加该选项
            options: {
              prependData: `
                @import "~@/style/variables.less";
                @import "~@/style/mixins.less";
              `
            }
          },
        ]
      });
      return webpackConfig;
    }
  },
  plugins: [
    // 这里是在前面帖子中提到的 less 支持配置
    {
      plugin: CracoLessPlugin,
      options: {
        // 增加该配置项
        modifyLessRule: (rule) => {
          // 这里排除了module.less，若less中设置了全局注入文件，module.less文件中要使用这些注入文件则就需要在其文件中手动导入或者在上面的module.less的less-loader中添加相同注入配置
          rule.exclude = /\.module\.less$/;
          return rule;
        }
      }
    }
  ]
}
```

### 调整`autoprefixer`添加CSS前缀兼容浏览器范围

修改package.json文件中“browserslist”选项中对应的兼容策略(根据需要修改)
```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "last 3 versions",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
      "last 1 ie version"
    ]
  }
}
```

### 使用`webpack`打包分析

```shell
npm install webpack-bundle-analyzer -D
```
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  webpack: {
    alias: {
      '@': resolve('src') // 设置路径别名
    },
    plugins: [new BundleAnalyzerPlugin()] // 可根据环境设置，否则所有都会运行分析
  }
}
```

## 其他

### 获取或设置环境变量
* `create-react-app`内置了三种环境，分别是`production`、`development`、`test`，可通过`process.env.NODE_ENV`获取，须注意`NODE_ENV`无法被覆盖。

* 大多情况下，内置的三个环境变量已足够使用，虽然`NODE_ENV`无法覆盖，但`CRA`也提供了自定义额外环境变量的方法：可以自行设置以`REACT_APP_`开头的额外环境变量名（与Vue中类似，可以在`.env`文件中设置，也可以在`package.json`文件`scripts`下的`shell`命令行中设置），非该字符串开头的变量名`CRA`是无法识别的。若要自定义任意环境变量，则可以选择安装第三方包去设置。另须注意：`shell`命令行方式设置的`REACT_APP_XXX`变量只能在执行`shell`时被读取到，平时在`js`中是不能读取到的，且变量设置要放在`shell`指令之前。

* 对本人而言，`CRA`内置的三种`NODE_ENV`已足够使用，也无自定义任意环境变量的需求，只是在进行测试环境和生产环境打包时可能要区分某些内容，且这些区分也只需要在运行`shell`打包时临时用到，所以使用以`REACT_APP_`开头的额外环境变量在`shell`上进行扩展设置即可。

```json
"scripts": {
    "build:test": "REACT_APP_ENV=test_build react-scripts build", // 变量设置要放在`shell`指令之前
    "build": "ENERATE_SOURCEMAP=false react-scripts build" // `ENERATE_SOURCEMAP=false`覆盖CRA内部设置打包不生成sourceMap文件
  }
```