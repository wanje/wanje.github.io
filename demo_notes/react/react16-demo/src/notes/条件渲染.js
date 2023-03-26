import React from 'react';

/** 阻止组件渲染 */
// 返回`null`(实测表示假值的值都行)可表示阻止或隐藏组件渲染(函数组件和class组件都适用)，因为假值没有可渲染内容，其实也就是根据条件返回内容
// 注意：在组件的`render`方法中返回`null`并不会影响组件的生命周期，该触发的生命周期钩子仍都会触发
function WarningComp(props) {
  if (!props.warn){
    return null;
  }

  return (
      <em className="warning" style={{color:'red'}}><span role="img" aria-label="volume">🔊</span>警告内容！</em>
  );
}

class ConditionRender extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      warn: false,
      isLoggedIn: false
    };
  }

  handleClick = () => {
    this.setState((preState) => {
      return {
        warn: !preState.warn,
        isLoggedIn: !preState.isLoggedIn
      }
    });
  };

  render() {
    let cont;
    if (this.state.isLoggedIn) {
      cont = <p>变量存储元素已登录内容</p>;
    }else {
      cont = <p>变量存储元素未登录内容</p>;
    }

    return (
      <div>
        <h2><a href="../src/notes/条件渲染.js">条件渲染</a></h2>
        <button onClick={this.handleClick}>切换</button>
        <WarningComp warn={this.state.warn}/>
        {/** 使用变量存储元素内容的方式 */}
        {cont}
        {/** 直接内嵌条件表达式或条件语句等方式 */}
        { // 三目运算符 ? :
          this.state.isLoggedIn ? <p>已登录，welcome</p> : <p>还未登陆，请登录</p>
        }
        { // 与运算符 &&
          !this.state.isLoggedIn && <p>无账号？去注册</p>
        }
      </div>
    );
  }
}

export default ConditionRender;