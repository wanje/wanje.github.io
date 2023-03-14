import React, { Component, Suspense } from 'react';

/** 代码分割&懒加载 */

// 应用中引入代码分割的最佳方式是通过动态`import()`语法，使用CRA脚手架创建的工程该功能开箱即用
// 将`import { getUID } from '@/utils';`改为动态`import()`形式使用方式如下：
import('@/utils').then(utils => {
  console.log(utils.getUID());
});

/**
 * `React.lazy()`函数能像渲染常规组件一样处理动态引入(的组件)，一般可以用在按路由进行代码分割动态加载
 * React.lazy 接受一个函数，这个函数需要动态调用`import()`引入组件。
 * React.lazy 必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件，即`import()`的组件要是采用默认方式导出的。
 * React.lazy 加载的组件要在`Suspense`组件中渲染(react内置组件)，该组件可在等待懒加载组件加载过程中通过`fallback`属性做优雅降级(如loading指示器等)
 */
// 将`import EventHandle from './事件处理';`改为动态引入使用方式如下：
const EventHandle = React.lazy(() => import('./事件处理')); // 此代码将会在组件首次渲染时，自动导入包含`EventHandle`组件的包

// 错误边界处理
class MyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //* 错误边界处理生命周期，静态方法，在该方法内渲染错误备用UI
  static getDerivedStateFromError(error) {
    console.log(error);
    // 更新`state`使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <div>加载失败，请稍后再试！</div>;
    }
    return this.props.children;
  }
}

function CodeSeparateLazy() {
  return (
    <div>
      <MyErrorBoundary> {/* 错误边界：若`Suspense`中模块加载失败(如网络问题)，它会触发一个错误。可以通过异常捕获边界技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。 */}
        {/* <Suspense>组件内渲染`React.lazy`懒加载的组件，`Suspense`组件可置于懒加载组件之上的任何位置(是祖先元素即可)，也可以一个`Suspense`组件包裹多个懒加载组件 */}
        <Suspense fallback={<div>加载中...</div>}> {/* `fallback`属性接受任何在组件加载过程中你想展示的 React 元素 */}
          <EventHandle />
        </Suspense>
      </MyErrorBoundary>
    </div>
  )
}

export default CodeSeparateLazy;