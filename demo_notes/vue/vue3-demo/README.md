# 创建基于vite构建工具的vue3项目

[Vite配置文档](https://cn.vitejs.dev/config/)。

由于`Vite`生产构建的目标默认是原生支持ES6模块化的浏览器，打包产物代码内带`export`和`import`等语法，故打包后无法通过`file://`协议从本地文件夹中直接打开预览（该协议下会有动态加载脚本文件时的跨源问题），可通过添加[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)插件来支持其他传统浏览器的兼容问题（指的是未原生支持ES6模块化的现代浏览器相对低的额版本）。

执行以下命名，其将会安装并执行`create-vue`（Vue官方的基于Vite的项目脚手架工具），然后根据提示操作即可（除了使用`npm`外，也可以使用`pnpm`、`yarn`等包管理工具）
```sh
# 目前 @latest 就是 vue@3 最新版本
npm create vue@latest

# 若是想用create-vue创建 vue@2.x 版本项目，可以使用 @legacy 标识
npm create vue@legacy

# 项目创建完成后进入项目目录，安装依赖后即可启动
cd <project-dir>
npm install
npm run dev
```

在上面执行`create`命令创建项目时，将会看到如下一些基础依赖和功能支持之类的可选功能提示，可根据情况选择（若不启用某功能则可以直接按下回车键选择 No）：
```sh
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```