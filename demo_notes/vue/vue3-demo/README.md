# 创建基于vite构建工具的vue3项目

[Vite配置文档](https://cn.vitejs.dev/config/)。

由于`Vite`是基于ES6模块化(须浏览器原生支持)的，故打包后无法通过`file://`协议从本地文件夹中直接打开预览（`vue-cli`可以，但目前只进行维护，不再升级）。

执行以下命名，其将会安装并执行`create-vue`（Vue官方的项目脚手架工具），然后根据提示操作即可
```sh
# 目前 @latest 就是 vue@3 最新版本
npm init vue@latest

# 项目创建完成后进入项目目录，安装依赖后即可启动
```
