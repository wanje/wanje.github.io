### 使用vite构建工具创建vue3项目

命令行中两个杠"--"的表示指令，一个杠"-"的表示参数

```shell
 npm install vue-cli -g
```
* 参数 -g 表示全局安装，安装后以后都能用，不必每个项目再单独安装，可以通过 vue -V 命令判断是否安装vue-cli

```shell
 vue init webpack projectName
```
* 根据模板初始化一个vue项目，webpack是模板名(可使用官方提供的其他模板，也可以自定义模板custom)，projectName是创建的该vue项目的名字；
* 执行该命令时会提示选择或输入该项目的相关信息及是否使用一些代码检测等辅助工具，安装完成后会提示后面你需要做的三步(即下面3步)

```shell
 cd projectName
```
* 进入刚刚创建的项目文件夹，项目文件夹是自动生成在上面模板初始化命令所在执行位置的，所以想在哪里创建项目，就要在哪个文件夹下执行步骤2的命令

```shell
 npm install
```
* 该命令是安装默认的一些依赖包，不然工程运行不起来，这里默认安装的是开发环境依赖，若只安装生产环境依赖则后面要加指令 --production，对应则安装"dependencies"下的依赖

```shell
 npm run dev
```
* 该命令就是以开发模式运行该vue项目(同npm start)，npm run build则是打包压缩(生产模式)，其实执行的都是package.json文件中"scripts"配置下的命令(最终指向一些nodejs)