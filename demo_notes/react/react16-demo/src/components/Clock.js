import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      statusText: '开始'
    };
    // this.handleClick = this.handleClick.bind(this);   // 使事件处理函数中的this指向组件而非触发事件时所在的元素，也可在绑定事件时使用箭头函数替代
  }

  tick() {
    // state数据要使用setState()方法去改变才能触发视图相应改变，且其中的对象不是直接覆盖state属性值，而是与state属性值进行浅合并，所以传入的对象可以只包含当前需要改变的那些状态
    this.setState({date: new Date()});
    // 因为setState()方法是异步更新state中数据的，state和props的数据都可能是异步更新的，所以不应该直接依赖其中的值去更新下一个状态，否则更新的同时又在访问其内部数据可能导致无法工作
    // 要解决这个问题，setState()提供了第二种使用方式，那就是不直接传入要改变的数据对象，而是传入一个返回欲改变数据对象的updater函数(可用箭头函数)
    // 该函数会以上一个状态对象state为第一个参数，此次更新时将被使用的props对象为第二个参数
    // this.setState(function (state, props) {
    //   return {date: state.counter + props.increment}    // 这里只是以计数为例
    // });
    /** setState()方法不管第一个参数是state对象还是updater函数，其都可接受第二个回调函数参数，该回调函数将在state更新并渲染完成后执行 */
    // this.setState({date: new Date()}, function () {
    //   console.log(this.state.date);
    // });
  }

  // 组件已被渲染到真实DOM中时调用，类比vue中的mounted
  componentDidMount() {
    // 除了this.props和this.state是react本身设置且有特殊含义的，
    // 也可以向class中随意添加不参与数据流的额外字段，像下面的计时器ID，其不参与DOM及数据流
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // 组件被销毁(从DOM中移除)时调用
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 推荐这样定义事件处理函数，这样其中的this就能正确指向本组件，或者按一般方法定义在在constructor中用bind改变this指向
  // 在元素或组件上绑定事件时，虽可以使用箭头函数让this指向组件，但这样每次渲染该组件亦会创建不同的回调函数，当该方法是传给子组件使用的时候就可能会导致额外的重新渲染，
  // 所以推荐这样定义处理函数，在需要传参时再在绑定事件时使用箭头函数(或bind方法)
  // 与原生事件不同，return false 并不能阻止事件默认行为，而必须显式调用preventDefault()方法
  handleClick = (a, b, c, d) => {
    // 未传参时默认接受一个事件对象参数，该事件对象是react封装一个class类
    console.log(a, b, c, d);
    this.setState((state) => {
      return {statusText: state.statusText==='开始' ? '暂停' : '开始'}
    });
  };

  render() {
    /**
     * 在组件中若返回一个null，则可阻止该组件渲染(不会报错)，但并不会影响组件的生命周期，
     * 即不会有该组件的实际DOM渲染出来，但组件各生命周期的回调函数还是会调用
     * */
    return (
        <div>
          {/*向事件处理程序传递(事件对象以外的)参数有以下两种方式：
          * 1、使用箭头函数，此时事件对象event要显式从外层箭头函数传入内部实际处理函数（因为此时默认的event参数只是在事件绑定的箭头函数中，并未传递到箭头函数内实际进行事件处理的函数中）
          * 2、使用bind()方法，该方式中事件对象event会被隐式传递(在所有参数最后)，所以不用显式传入事件对象
          */}
          <button className="btn" onClick={this.handleClick}>{this.state.statusText}</button>
          <button className="btn" onClick={this.handleClick}>默认一个event参数</button>
          <button className="btn" onClick={(e) => this.handleClick(e, '参数1')}>箭头函数方式要显式传入event对象</button>
          <button className="btn" onClick={this.handleClick.bind(this, '参数1', '参数2')}>bind方式的event对象默认作为最后一个参数传入</button>
          <p>{this.state.date.toLocaleTimeString()}</p>
        </div>
    );
  }
}

export default Clock;