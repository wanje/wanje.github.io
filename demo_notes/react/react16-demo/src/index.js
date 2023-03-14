// import 'core-js/stable'; // 引入所有核心稳定polyfill，兼容ie10+
// import 'react-app-polyfill/stable'; // 根据"@babel/preset-env"和package.json中"browserslist"选项只针对目标浏览器进行必要的polyfill引入
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/common.less';
import * as serviceWorker from './serviceWorker';
// import { BrowserRouter } from "react-router-dom";

/**
 * ReactDOM.render()方法用于将组件插入到页面实际的DOM中
 * ReactDOM.render(
 *    参数1：要渲染的component或HTML元素(可为代码片段)，注意需保证只有一个根节点（类似vue中的template模板一样）
 *    参数2：前面要被插入到的容器DOM（原生DOM对象）
 * )
 * */
ReactDOM.render(
    // <BrowserRouter><App /></BrowserRouter>, // 将`BrowserRouter`组件放在根组件最外层，其他地方就都不用再添加该组件
    <App />,
    document.getElementById('root')
);

/**
 * 创建并返回一个react元素(包括HTML元素和自定义的组件)
 * React.createElement(
 *    参数1：组件/HTML标签名(或代码段，但只能有一个根节点)，
 *    参数2：组件属性，以对象形式表示，可选
 *    参数3及以后：子组件/或文本，可选
 * )
 * */
// 使用jsx语法编写的代码，Babel会将其转换成React.createElement()创建的形式，类似于vue中template中的代码会被转化成render函数形式一样
// React.createElement('a', {href: 'https://facebook.github.io/react/'}, 'Hello!');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
