import React from 'react';
import {convertClass} from '../utils';

/** 推荐使用组合而非继承来实现组件代码复用，注意这里的继承不是指继承`React.Component`类，而是指继承自自定义的组件 */

function Dialog(props) {
  /**
   * 通过特殊的`children`属性可获取组件中所有嵌套内容（类似vue中的默认`slot`插槽），
   * 但react没有类似vue中`具名插槽`的东西，只能通过props传递内容(若代码量较多则一般保存在变量中传递，增强可读性)，
   * 且可以通过更多的props自定义特殊需求（例如再用一个`theme`属性控制dialog的主题）
   * */
  return (
    <div className={convertClass("dialog-wrap", props.theme)}>
      <header className="dialog__head">{props.header}</header>
      <main className="dialog__body">{props.children}</main>
      <footer className="dialog__foot">{props.footer}</footer>
    </div>
  );
}

// 把下面的组件换成class形式定义也同样适用
function GroupInherit() {
  const head = (<p>头部</p>);
  const foot = (<p>尾部</p>);

  return (
    <div>
      <h2><a target="_blank" href="../src/notes/组合vs继承.js">组合vs继承</a></h2>
      <Dialog header={head} footer={foot} theme="blue">
        <p>dialog主体内容</p>
      </Dialog>
    </div>
  );
}

export default GroupInherit;