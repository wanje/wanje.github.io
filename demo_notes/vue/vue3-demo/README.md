# 创建基于vite构建工具的vue3项目

[Vite配置文档](https://cn.vitejs.dev/config/)。

由于`Vite`生产构建的目标默认是原生支持ES6模块化的浏览器，打包产物代码内带`export`和`import`等语法，故打包后无法通过`file://`协议从本地文件夹中直接打开预览（该协议下会有动态加载脚本文件时的跨源问题），可通过添加[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)插件来支持其他传统浏览器的兼容问题（指的是未原生支持ES6模块化的现代浏览器相对低的额版本）。

执行以下命名，其将会安装并执行`create-vue`（Vue官方的项目脚手架工具），然后根据提示操作即可
```sh
# 目前 @latest 就是 vue@3 最新版本
npm init vue@latest

# 项目创建完成后进入项目目录，安装依赖后即可启动
```
