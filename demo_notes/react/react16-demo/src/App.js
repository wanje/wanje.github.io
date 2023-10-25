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
import RefsDOM from './notes/refsDOM';
import UseHook from './notes/使用Hook';
import './style/common.less';
import './App.less'; // 放置位置会影响样式插入的顺序（放在组件之后引入，样式就会插入到组件内引入的样式之后）
import './App.scoped.css';
import './App.scoped.less';
import LessModule from './App.module.less';

function App() {
  return (
      <div className="view-box">
        <div className="inline-block css-scoped">css scroped 测试</div>
        <div className="inline-block less-scoped">less scroped 测试 <span className="less-scoped-nest">嵌套 <b>测试</b></span></div>
        <div className={`inline-block ${LessModule['less-module']}`}>less module 测试</div>
        <Game />
        <RouterView />
        <JsxGrammar />
        <ComponentProps />
        <StateLifeCycle />
        <EventHandle />
        <ConditionRender />
        <ListKey />
        <FormWithCtrl />
        <StateToUp />
        <GroupInherit />
        <CodeSeparateLazy />
        <Context />
        <ErrorBoundary />
        <RefsDOM />
        <UseHook />
      </div>
  )
}

export default App;
