import React, {  //? 这里的 React 对象导入不能省略，使用JSX语法时 React 必须局部引入(即使未直接到该对象)
  useState,
  useEffect
} from "react";

//! Hook 是 React 16.8+ 的新增特性，可以在函数组件中使用 state 以及其他的 React 特性，让函数组件也可成为有状态组件
//! Hook 在 class 组件中无效，只适用于函数组件或自定义hook（除此外的普通JS函数中也不能使用）

//! Hook 只能在最顶层使用，不能在循环、条件或嵌套函数中调用，因为同一Hook可以多次使用是根据调用顺序来确定一一对应相关state或effect等内容的，初次渲染就决定了后续每次重渲染时hook调用顺序也要一致，
//! 故要求每个声明的hook在每次渲染时要么都会调用，要么都不会调用，使得每次所有hook的执行顺序都一致，而不允许某hook这次调用了下次可能没调用，
//! 若出现上面提到的不允许的方式，则调用顺序就不固定，也就造成Hook与其关联的state或effect对应错误（像条件语句就会导致条件中的hook只会在满足条件时调用，而不是每次都会调用到）,
//! 若要用到上面提到的循环、条件或嵌套函数，可以将其逻辑转移到 hook 的内部去

//* useState，可多次使用以分离逻辑
// 该hook允许在函数组件中添加状态管理
function UseStateHook() {
  // useState 返回两个内容，1单个state数据项(不限数据格式)，2改变该state数据项的函数方法（命名要求 set 开头）
  // setNum 接受的参数是要给 state 赋予的新值
  const [num, setNum] = useState(0);  // 参数为该 state 的初始值
  //! 同一组件中可以多次调用 useState 创建不同state数据项(就像class组件在state属性下不同数据项)，之间互不影响
  const [bananaNum, setBananaNum] = useState(0);

  return (
    <div>
      <h3>useState</h3>
      <span>苹果：{num}</span>
      <button className="mgl-10 mgr-10" onClick={() => setNum(num + 1)}>+</button>
      <span>香蕉：{bananaNum}</span>
      <button className="mgl-10 mgr-10" onClick={() => setBananaNum(bananaNum + 1)}>+</button>
    </div>
  )
}

//* useEffect，可多次使用以分离逻辑(会在相关时机按声明顺序依次调用每个effect)
// 该hook可以在函数组件中执行副作用操作(部分生命周期钩子操作)，数据获取、设置订阅以及手动更改React组件中的DOM都属于副作用
// !该hook在组件每次渲染后都会执行（此时DOM已更新完毕），可指定第二个参数表明依赖哪些数据更新后导致的渲染才执行而不是默认任何数据导致的渲染后都执行
function UseEffectHook() {
  function handleClick(e) {
    if (!e.target.getAttribute('data-event')) return;
    alert(e.target.outerHTML)
  }
  //! 可以看做是componentDidMount、componentDidUpdate、componentWillUnmount 这三个生命周期函数的组合
  //* 第一个参数为一个effect函数，在 componentDidMount 和 componentDidUpdate 时调用，该effect函数在每次渲染中都会重新被react创建并替换原先的以便获取到的数据都是最新的(替换并不会导致里面的逻辑重复产生副作用)
  useEffect(() => {
    document.title = '使用Hook';
    document.body.addEventListener('click', handleClick);

    //! 若返回一个函数(可选)，则该返回的函数将在 componentWillUnmount 时调用，用于清除相关副作用操作(一般用于需要成对的操作，像事件绑定与移除，消息订阅与取消等)，这里的清除操作实际每次渲染后都会执行而不只是组件卸载的时候
    //! 清除操作每次渲染后都会执行是因为上面提到每次渲染后会重新创建effect函数进行替换，所以要清除上一次的副作用操作，这样就不会与新创建的副作用操作重复(或只能唯一存在时却未清除旧数据关联的绑定)，并再同步绑定此次新的清除函数
    //? 比如好友列表中只允许将一个好友设为特别关注(订阅了其消息)，此时若换了一个好友(重渲染)，我们就需要先清除上一个好友的订阅而重新订阅当前好友（此时并非是组件卸载而是依赖的数据更新导致重渲染，故需要每次渲染都执行清除）
    //? 像这种只能唯一存在的情况，在 class 组件中就需要在 componentDidUpdate 中判断先清除上一个绑定，再关联新的绑定
    return function() {
      document.body.removeEventListener('click', handleClick);
    }

    //* 第二个参数(可选)为一个数组，用于指明该 effect 依赖哪些 props 或 state 数据（此时只有这些指定依赖数据发生变化时才执行该hook）
    // 依赖数据项也可以是对象或数组下的某个数据：[aProp, aProp.id, aState, aState[0]]
    //! 默认不传第二个参数则表示依赖所有导致渲染更新的数据，为空数组时表示不依赖任何数据，近似只在 componentDidMount 和 componentWillUnmount 时执行一次
  }, []); //! 应确保确实无任何依赖数据(否则实际用到了却未添加进该依赖表的数据将始终是最初的旧数据)，故只在 useEffect 中用到的函数最好都放在 useEffect 中去声明(就近原则更容易注意到是否有依赖数据)

  //? 当依赖数据频繁变化，而又不需要如此频繁触发effect时(或从性能优化角度考虑)，可以考虑将频繁修改相关状态的逻辑换到effect内部并使用`setState`的函数参数形式
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('effect');
    //以下为举例，实际场景下可能没有下例这样的
    const id = setInterval(() => {
      setCount(val => val + 1); // 在这不依赖于外部的 `count` 变量，而直接使用改变状态值时的函数参数形式来获取先关状态
      //! 若换成如下依赖外部`count`的形式，则首先需要在依赖列表中添加`count`(易遗忘导致bug，一直是初始值)，然后将使得每次`count`更新都会导致这里的effect函数执行
      // setCount(count + 1);   //? 虽然在外部用`useRef`hook创建一个对某状态的引用，在effect内部使用该引用的方式来避免直接添加进依赖表的方式也可达到目的，但不到万不得已不应这样做，因为这样导致依赖难以预测，不好维护和debug
    }, 10000);
    return () => clearInterval(id);
  }, []); // 我们的 effect 不使用组件作用域中的任何变量，也就不会在DOM每次渲染频繁执行effect

  return (
    <div>
      <h3>useEffect</h3>
      <button data-event>测试事件委托</button>
      <p>依赖数据频繁变化：{count}</p>
    </div>
  )
}

//* 自定义 Hook
function UseCustomHook() {
  return (
    <div>
      <h3>自定义Hook</h3>
    </div>
  )
}

export default function() {
  return (
    <div>
      <h2>使用Hook</h2>
      <UseStateHook />
      <UseEffectHook />
      <UseCustomHook />
    </div>
  )
}