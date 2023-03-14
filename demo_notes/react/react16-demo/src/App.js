import React from 'react';
import Game from './components/Game';
import JsxGrammar from './notes/jsx';
import ComponentProps from './notes/组件&props';
import StateLifeCycle from './notes/state&生命周期';
import EventHandle from './notes/事件处理';
import ConditionRender from './notes/条件渲染';
import ListKey from './notes/列表&key';
import FormWithCtrl from './notes/表单&受控组件';
import StateToUp from './notes/状态提升';
import GroupInherit from './notes/组合vs继承';
import CodeSeparateLazy from './notes/代码分割&懒加载';
import RouterView from './notes/路由';
import Context from './notes/context';
import ErrorBoundary from './notes/错误边界';
// import useHook from './notes/使用Hook';
import './App.less'; // 放置位置会影响样式插入的顺序（放在组件之后引入，样式就会插入到组件内引入的样式之后）
import './App.scoped.css';
import './App.scoped.less';
import LessModule from './App.module.less';

function App() {
  return (
      <div className="view-box">
        <div className="css-scoped">css scroped 测试</div>
        <div className="less-scoped">less scroped 测试 <span className="less-scoped-nest">嵌套 <b>测试</b></span></div>
        <div className={LessModule['less-module']}>less module 测试</div>
        <Game />
        <h2 className="autoprefixer">路由</h2>
        <RouterView />
        <h2>JSX语法</h2>
        <JsxGrammar />
        <h2>组件&props</h2>
        <ComponentProps />
        <h2>state&组件生命周期</h2>
        <StateLifeCycle />
        <h2>事件处理</h2>
        <EventHandle />
        <h2>条件渲染</h2>
        <ConditionRender />
        <h2>列表&key</h2>
        <ListKey />
        <h2>表单&受控组件</h2>
        <FormWithCtrl />
        <h2>状态提升</h2>
        <StateToUp />
        <h2>组合vs继承</h2>
        <GroupInherit />
        <h2>代码分割&懒加载</h2>
        <CodeSeparateLazy />
        <h2>Context上下文</h2>
        <Context />
        <h2>错误边界</h2>
        <ErrorBoundary />
        <h2>使用Hook</h2>
        {/* <useHook /> */}
      </div>
  )
}

export default App;
