import React from 'react';

class StateLifeCycle extends React.Component {
  constructor(props){
    super(props);
    console.log("1.构造函数-constructor");

    /**
     * state与props类似，但state是私有的，且其完全受控于当前组件，且构造函数是唯一可以给 this.state 赋值的地方
     * state中的属性不用预定义，除非有数据类型要求结合PropTypes使用，但需要先声明`this.state`为一个空对象（this.state={}）
     * state中的数据应该参与数据流或DOM交互，对于不参与数据流的额外字段可以像下面的计时器ID一样作为静态属性挂在class本身上面，
     * state中的值不能像props那样直接通过外部传值去改变，其数据要使用setState()方法去改变才能触发视图相应改变（类似一个事件通知，而非直接赋值）
     * */
    //* 函数组件中可以使用 useState hook实现状态管理
    this.state = {
      count: 0,
      timer: 0,
      paused: true,
      hasError: false
    };
  }

  handleCountClick = () => {
    //! 传入`setState()`方法的数据不是直接覆盖整个原state对象，而是与原state对象下的一级属性进行浅合并，所以传入的对象或是函数返回的对象可以只包含当前需要改变的那些状态
    this.setState({
      count: this.state.count + 1 //? 这种取值方式在当前状态依赖于上一个状态的情况下有可能出错（只是可能，并非绝对）
    });

    /**
     * !因为setState()方法是异步更新state中数据的，state和props的数据都可能是异步更新的，所以不应该直接依赖其中的值去更新下一个状态，否则更新的同时又在访问其内部数据可能导致无法工作
     * 要解决这个问题，setState()提供了第二种使用方式，那就是不直接传入要改变的数据对象，而是传入一个返回欲改变数据对象的函数(可用箭头函数)
     * *该函数参数会以【上一个状态对象state】为第一个参数，【当前更新时将被使用的props对象】为第二个参数，也就是确保这两个数据对象都是最新数据，而不是此次setState前某个异步操作还未完成前的数据
     * */
    // this.setState(function(preState, curProps) {
    //   return {date: preState.count + curProps.increment}    // 这里只是以计数为例
    // });
    
    //* setState()方法不管第一个参数是state对象还是updater函数，其都可接受第二个回调函数参数，该回调函数将在state更新并渲染完成后执行
    // this.setState({date: new Date()}, function () {
    //   console.log('自定义更新完成后回调', this.state.date);
    // });
  };

  handleTimerClick = () => {
    if (this.state.paused){
      /**
      * 尽管this.props和this.state是react本身设置且具有特殊含义的，但其实我们可以向class中随意添加不参与数据流的额外字段(也就是this上)
      * 像下面的计时器ID，其不参与DOM及数据流(可以更改其值，只是不用于DOM自动响应更新，其本身不触发UI重渲染)
      * */
      this.timerID = setInterval(() => {   //这里使用箭头函数的目的是避免`this`指向window
        //! 当前状态依赖于其上一个状态值时，可以使用其函数参数形式，使得每次正确获取到上一次的状态值
        this.setState((preState) => {
          return {
            timer: ++preState.timer
          }
        });
      }, 1000);

    }else {
      clearInterval(this.timerID);
    }

    this.setState((preState) => {
      return {
        paused: !preState.paused
      }
    });
  };

  //! 以下两个错误边界处理生命周期方法任意定义一个(或两个)，则该组件就变成一个错误边界组件，可捕获子组件内的JS错误而进行降级处理
  //* 错误边界处理生命周期，静态方法，在该方法内渲染错误备用UI
  static getDerivedStateFromError(error) {
    console.log(error);
    // 更新`state`使下一次渲染能够显示降级后的 UI
    return { hasError: true }; //! 该方法内只返回要更新的`state`数据对象，方法内部会自己去更新`state`
  }
  //* 错误边界处理生命周期，在该方法内打印或上报错误日志信息(错误信息更完整详细)
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  componentWillMount() {
    //? 该钩子即将删除，应避免使用
    // 此时可以访问属性和状态了，可以进行api调用，但没办法做dom相关操作
    console.log("2.组件将要挂载-componentWillMount");
  }

  componentDidMount() {
    // 组件已挂载（已被渲染到DOM中），可进行状态更新数据初始请求等操作
    console.log("3.组件已经挂载-componentDidMount");
  }

  componentWillReceiveProps() {
    //? 该钩子即将删除，应避免使用
    // 父组件传递的属性有变化，做相应响应
    console.log("4.组件属性更新了-componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 组件是否需要更新，返回布尔值，优化点
    console.log("5.组件是否应该更新？-shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    //? 该钩子即将删除，应避免使用
    console.log("6.组件将要更新-componentWillUpdate");
  }

  componentDidUpdate(preProps, preState) {
    // 可进行更新数据请求等非事件行为直接触发的操作
    console.log("7.组件已经更新-componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("组件即将卸载-componentWillUnmount");
  }

  //* 在函数式组件中可以使用 useEffect hook实现部分生命周期的效果（该hook可以看作是componentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期的融合）

  render() {
    console.log("组件渲染-render");

    let result = null;
    if (this.state.hasError) {
      //! 若作为错误边界处理组件，内部组件出错时进行UI降级
      // 你可以自定义降级后的 UI 并渲染
      result = <h1>出错啦！</h1>;
    } else {
      //! 若作为错误边界处理组件，内部组件未出错时则正常渲染内部组件(即children)
      //! 这里只是功能介绍未传子组件就作为普通组件显示`||`后面定义的元素，可查看`错误边界`笔记部分例子
      result = this.props.children || (
        <div>
          <p>
            <button onClick={this.handleCountClick}>计次+1</button>
            <span>：{this.state.count}</span>
          </p>
          <p>
            <button onClick={this.handleTimerClick}>{this.state.paused ? '开始计时' : '暂停计时'}</button>
            <span>：{this.state.timer}</span>
          </p>
        </div>
      );
    }
    
    return (
      <div>
        <h2><a target="_blank" href="../src/notes/state&生命周期.js">state&组件生命周期</a></h2>
        { result }
        <img src="static/images/component_lifecycle.jpg" alt="组件生命周期" style={{maxWidth: 'min(100%, 700px)'}} />
      </div>
    )
  }
}

export default StateLifeCycle;