import React, { Component } from 'react';

//* 错误边界是一种`React`组件，这种组件可捕获并打印发生在其子组件树任何位置的`JS`错误，并且它会渲染出备用`UI`，而不是渲染那些崩溃了的子组件树
//* 错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误，其工作方式类似于JS中的`try/catch`中的`catch{}`部分，但其只针对于React组件
/**
 * !注意：错误边界无法捕获以下场景中产生的错误：
 * 1、事件处理中的错误
 * 2、异步代码中的错误(如`setTimeout`、`requestAnimationFrame`等回调函数)
 * 3、服务端渲染中的错误
 * 4、错误边界组件自身抛出的错误(并非其子组件内的错误)
 */
// 使用时跟常规组件一样，将其包裹在要进行错误边界回退的组件外即可：<ErrorBoundary><MyComponent /></ErrorBoundary>
// 可以将其包装在最顶层的路由组件并为用户展示一个`出错啦`的错误信息，也可以将单独的局部组件包装在错误边界以保护应用其他部分不崩溃
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //! 以下两个错误边界处理生命周期方法任意定义一个(或两个)，则该组件就变成一个错误边界组件，可捕获子组件内的JS错误(自身的不行)而进行降级处理
  //! 鉴于这两个错误边界声明周期只能在class类组件中定义，因此也就只有class类组件才可以成为错误边界组件，而函数组件不行
  //! 若一个错误边界无法渲染错误信息，则错误会冒泡至其最近的上层错误边界(若存在，v16+开始任何未被错误边界捕获的错误将导致整个React组件树被卸载)，这也类似于JS中的`catch{}`工作机制
  //* 错误边界处理生命周期1，静态方法，在该方法内渲染错误备用UI
  static getDerivedStateFromError(error) {
    console.log(error);
    // 更新`state`使下一次渲染能够显示降级后的 UI
    return { hasError: true }; //! 该方法内只返回要更新的`state`数据对象，方法内部会自己去更新`state`
  }
  //* 错误边界处理生命周期2，在该方法内打印或上报错误日志信息(错误信息更完整详细)
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    // render函数中必须返回 react 元素或空 null
    return (
      <div>
        <h2><a target="_blank" href="../src/notes/错误边界.js">错误边界</a></h2>
        {
          // 你可以自定义降级后的 UI 并渲染
          this.state.hasError ? (<h1>出错啦！</h1>) : this.props.children
        }
      </div>
    )
  }
}