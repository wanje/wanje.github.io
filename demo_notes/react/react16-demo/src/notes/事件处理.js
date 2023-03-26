import React from 'react';

//! react组件中没有像Vue下自带的自定义事件机制来由子组件向父组件传递数据（react下可以使用第三方事件库）
//! react下子传父是子组件内调用父组件传入的函数，子组件调用函数时再传入相关数据即可达到向父组件传值的目的

/** 事件处理 */
class EventHandle extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      number: 0
    };

    /** 方式一 */
    this.handleClick1 = this.handleClick1.bind(this);
  }

  // 一个合成的`event`事件对象会默认作为参数传递给事件处理函数，该`event`对象是根据W3C规范定义的，所以不用担心浏览器兼容性问题
  // 若需要传递额外的参数，则`event`事件对象将放在后面传入，前面是自定的参数
  stopJump = (e) => {
    // return false; // JSX中不能通过`return false`来阻止默认行为

    //必须显式调用`preventDefault()`方法才能有效阻止默认行为
    e.preventDefault();
    alert('阻止了链接默认跳转行为');
  };

  /** 方式一 */
  // 常规定义事件处理函数，须要在构造函数中将this指向用`bind()`方法绑定到当前class类，否则事件触发时this将指向undefined
  handleClick1() {
    this.setState((preState) => {
      return {
        number: ++preState.number
      }
    });
  };

  /** 方式二，建议该方式 */
  // 使用箭头函数方式定义，这样里面的`this`将指向声明该方法时的class
  handleClick2 = () => {
    this.setState((preState) => {
      return {
        number: ++preState.number
      }
    });
  };

  /** 方式三 */
  // 处理函数定义方式与方式一一样，只是使用时在元素/组件上绑定时要使用箭头函数
  handleClick3() {
    this.setState((preState) => {
      return {
        number: ++preState.number
      }
    });
  };

  /** 额外参数传递 */
  // 处理函数定义方式与前面都一样，只是使用时在元素/组件上绑定时有所不同，且应注意参数的顺序：
  // 额外传参方式一中可以自定义参数顺序，而额外传参方式二中`event`对象要放在后面接收（因为bind方式绑定没有显式传入`event`，react默认将其加在最后）
  deleteData(id, e) {
    console.log('删除ID为'+id+'的一条数据');
    console.log('事件对象放在最后接收', e);
  };


  render() {

    return (
        <div>
          <h2><a href="../src/notes/事件处理.js">事件处理</a></h2>
          <span>数量：{this.state.number}件</span>
          {/** 方式一 */}
          {/* JSX中事件绑定使用小驼峰命名，而非原生HTML中那样的全小写，传入的事件处理函数只是函数指向，不像HTML中要添加括号表示执行 */}
          <button onClick={this.handleClick1}>click1</button>
          {/** 方式二 */}
          <button onClick={this.handleClick2}>click2</button>
          {/** 方式三 */}
          {/* 在元素上使用箭头函数形式绑定事件，这样也可以正确绑定`this`指向，但这种方式相当于每次返回一个函数，使得每次渲染该元素都会创建不同的处理函数，
           且此时event对象要显式传入，要显式给事件处理函数传递参数时就需要以这样箭头函数的方式进行事件绑定，
           大多情况下每次都创建不同回调并没什么大问题，但若这些回调是作为prop传入子组件的话，这些组件可能会进行额外的重新渲染，所以一般不需要额外传参的话都建议用方式二或方式一
           */}
          <button onClick={(e) => this.handleClick3(e)}>click3</button>
          {/** 方式四 */}
          {/* 方式四与方式一基本一样：处理函数定义方式不变，但是不在`constructor`中`bind`绑定`this`，而是在元素上直接调用`bind`：
              <button onClick={this.handleClick1.bind(this)}>click1</button>
              该方式就是下面的`额外传参方式二`不额外传参的情况，与方式三存在相同的问题就是每次渲染都会重新创建一个回调函数，可能影响性能
           */}
          <a href="https://react.docschina.org/docs/handling-events.html" onClick={this.stopJump}>阻止默认行为</a>
          {/** 额外传参方式一 */}
          {/* 箭头函数方式绑定，若要使用`event`对象则需要显式传入 */}
          <button onClick={(e) => this.deleteData('id1', e)}>delete1</button>
          {/** 额外传参方式二 */}
          {/* Function.prototype.bind方式实现，不需要显示传入`event`对象，此时需要注意：此时`event`对象是被react放在其他显式参数之后注入的，所以使用这种方式绑定时定义处理函数时应将事件对象放在最后 */}
          <button onClick={this.deleteData.bind(this, 'id2')}>delete2</button>
        </div>
    );
  }
}

export default EventHandle;