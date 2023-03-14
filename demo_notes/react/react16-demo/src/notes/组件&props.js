import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

//! react组件的父子通信
//* 父传子：通过 props 等常规方式(或context上下文注入等)向下传递相关数据即可；
//* 子传父：react中没有像Vue下自带的自定义事件机制来向外传递数据（react下可以使用第三方事件库），故是通过在子组件调用父组件传入函数的方式来实现通信
//! 在react子组件内调用父组件传入的函数，子组件调用函数时再传入相关数据即可达到向父组件传值的目的


/**
 * 组件名称必须以大写字母开头，定义和使用时都是如此，react会将以小写字母开头的组件视为html原生标签
 * 组件中`props`是只读的，不可修改自身的props，只能通过外部传入新值来改变，props可以是任何数据类型值(包括react元素)
 * 组件中的状态`state`可以在内部被修改(须通过`setState(updater [,callback])`方法)
 * */

/** 函数式组件 */
// 对于无状态组件(组件本身不使用state)，也没有其他的内部处理方法的组件，可以不使用class类定义组件，而直接使用函数式定义组件，更加简洁高效
// 此时将props作为该函数的参数，传入的属性直接通过该props访问，不再使用this.props
//! v16.8+后使用`useState`hook函数式组件也可以成为有状态组件
function Span(props) {
  // react中的props可直接访问，而vue中必须先通过props属性声明
  return (<span style={{margin: '0 10px'}}>{props.value}</span>);
}

function PropsOrder(props) {
  return (
    <div>
      <p><Text type="danger">props顺序的影响：</Text>在使用 <Text type="danger">...props</Text>
        扩展符方式从父组件接受所有传入的属性时，若传入的props属性与组件内标签上的存在相同属性(包括原生HTML便签上的attributes)，则标签上后面位置的属性会覆盖前面位置的属性，如：
        以下两个`input`标签上都先设置了相同的属性，也从父组件接收相同的`props`，只是`...props`放置的顺序不同，其表现就不同
      </p>
      <p style={{color: 'blue'}} {...props} title="title放在`...`props`后面，所以未被传入的title覆盖">默认蓝色，传入红色，`...props`放在相同属性后面新值生效</p>
      <p {...props} style={{color: 'blue'}} title="title放在`...`props`后面，所以未被传入的title覆盖">默认蓝色，传入红色，`...props`放在相同属性前面新值无效</p>
    </div>
  );
}

/** Class类继承组件 */
// 有状态组件或是除render函数外还定义了一些内部逻辑处理方法的组件就应使用class类定义组件
//* 另 React.PureComponent 与 React.Component 基本相同，只是 PureComponent 中自动实现了 shouldComponentUpdate，但其只是以浅层对比 prop 和 state 的方式来实现了该函数。
class ComponentProps extends React.Component {
  /** 若除了`super()`调用外没有其他的设置，那么constructor构造函数可以不额外声明 */
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }

  //* 静态属性，用于设置`props`的默认值(需要设置的设置即可)，也可采用`MyComp.defaultProps = xxx`的方式设置(该方式也适用于函数组件)
  static defaultProps = {
    title: '标题',
    splitLine: true,
    titleTag: true
  };

  handleClick = (event) => {
    let target = event.target;
    switch (target.className) {
      case 'reduce': {
        this.setState((state) => {
          return {
            number: --state.number
          }
        });
        break;
      }
      case 'increase': {
        this.setState((state) => {
          return {
            number: ++state.number
          }
        });
        break;
      }
      default: {
        return 0;
      }
    }
  };

  render() {
    return (
        <div>
          <button className="reduce" onClick={this.handleClick}>-</button>
          <Span value={this.state.number}/>
          <button className="increase" onClick={this.handleClick}>+</button>
          <PropsOrder style={{color: 'red'}} title="传入的新title" />
        </div>
    );
  }
}

export default ComponentProps;