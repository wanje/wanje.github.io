import React, {  //? 这里的 React 对象导入不能省略，使用JSX语法时 React 必须局部引入(即使未直接到该对象)
  useState,
  useEffect,
  useContext,
  useReducer,
  useMemo,
  useCallback
} from "react";

//! Hook 是 React 16.8+ 的新增特性，可以在函数组件中使用 state 以及其他的 React 特性，让函数组件也可成为有状态组件
//! Hook 在 class 组件中无效，只适用于函数组件或自定义hook（除此外的普通JS函数中也不能使用）

//! Hook 只能在最顶层使用，不能在循环、条件或嵌套函数中调用，因为同一Hook可以多次使用是根据调用顺序来确定一一对应相关state或effect等内容的，初次渲染就决定了后续每次重渲染时hook调用顺序也要一致，
//! 故要求每个声明的hook在每次渲染时要么都会调用，要么都不会调用，使得每次所有hook的执行顺序都一致，而不允许某hook这次调用了下次可能没调用，
//! 若出现上面提到的不允许的方式，则调用顺序就不固定，也就造成Hook与其关联的state或effect对应错误（像条件语句就会导致条件中的hook只会在满足条件时调用，而不是每次都会调用到）,
//! 若要用到上面提到的循环、条件或嵌套函数，可以将其逻辑转移到 hook 的内部去


//* useState，可多次使用以分离逻辑
// 该hook允许在函数组件中添加状态管理
//! 调用 setXXX 时，状态 XXX 的更新是异步的，并不是同步更新(即并非调用完马上就更新了)，故不能在初始渲染时(render中，函数组件就是函数体内最外层)就立即调用 setXXX，否则将导致抛出“too many re-render”的循环渲染错误
//! 因初始无条件立即调用setXXX时（指render中，并非mount中），状态更新引起的组件重渲染与挂载时的初始渲染同时进行，导致组件内渲染机制混乱，如此就形成了循环渲染
//! 若是因为一开始就要设置一次值，那么应该是根据条件调用setXXX(而非初始就可能连续频繁调用)，且完全可以将这个条件初始值放在 useState 的参数中设置（直接通过条件表达式或函数参数方式均可）
function UseStateHook(props) {
  // useState 返回两个内容，1单个state数据项(不限数据格式)，2改变该state数据项的函数方法（命名要求 set 开头）
  // setNum 接受的参数是要给 state 赋予的新值(此过程会将组件的一次重渲染加入队列), 
  //! setXXX的参数也可以是一个返回新状态值的函数(函数式更新)，该函数接收前一个状态值为参数，以便用于新的状态值需要通过前一个状态值计算而得出的情况
  // 后续的重渲染中，useState返回的第一个值将始终是更新后的最新的state
  const [num, setNum] = useState(0);  // 参数为该 state 的初始值
  //! 同一组件中可以多次调用 useState 创建不同state数据项(就像class组件在state属性下不同数据项)，之间互不影响
  const [bananaNum, setBananaNum] = useState(0);

  // useState 返回的 setXXX 与class组件中的 this.setState 不同，setXXX 不会自动合并更新对象数据，其只会整个替换（多个子值的state可考虑使用useReducer更合适）
  //! 故要通过 useState 的 setXXX 更新一个对象状态数据中的一部分字段，则需要使用函数式并借助展开运算符复制一份原数据其他字段（注意层级）来更新状态
  /* setXXX(preState => {
    return {
      ...preState,
      //其他需要更新的字段（同字段后面的自然会覆盖前面的）
      ...needUpdateFiled
    }
  }); */

  //! 惰性初始 state（指需要经过一些计算才得出初始状态值，且计算过程不依赖自身前一个状态），同函数式更新，也是传入一个函数，只是无需接收前一个状态值，此时该函数只会在初始渲染中执行一次，后续重渲染时会被忽略
  /* const [oneState, setOneState] = useState(() => {
    // do something
    const obj = {
      one: 1,
      two: 2,
      three: 3
    };
    return obj[props.id]
  }); */
  //? 与在外部声明函数，初始时传入函数执行结果有区别？
  /* function getValue(id) {
    // do something
    const obj = {
      one: 1,
      two: 2,
      three: 3
    };
    return obj[id]
  }
  const [oneState, setOneState] = useState(getValue(props.id)); */

  return (
    <div>
      <h3>useState</h3>
      <span>苹果：{num}</span>
      <button className="mgl-10 mgr-10" onClick={() => setNum(num + 1)}>+(直接参数)</button>
      <span>香蕉：{bananaNum}</span>
      <button className="mgl-10 mgr-10" onClick={() => setBananaNum((pre) => pre + 1)}>+(函数参数)</button>
    </div>
  )
}


//* useEffect，可多次使用以分离逻辑(会在相关时机按声明顺序依次调用每个effect)
// 该hook可以在函数组件中执行副作用操作(部分生命周期钩子操作)，数据获取、添加订阅、设置定时器以及手动更改React组件中的DOM都属于副作用
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
// 通过自定义Hook，可以将组件逻辑提取到可重用的函数中（就类似提取可在多个普通函数中公用的工具函数）
//! 自定义hook是个函数，命名规定以`use`开头，其内部可调用其他hook（包括其他自定义hook，且同样要求不在循环、条件和嵌套函数中调用hook）
//! 结构上自定义hook与普通函数无异，可自行根据hook的作用决定是否需要参数，是否返回内容，以及要返回内容的类型
//! 与 useState 和 useEffect 一样，在同一组件中多次调用同一自定义hook时(若该hook的作用可用于多次调用)，其中的 state 都是独立的，并不会共享同一个而造成混乱
function useFooHook(goodsID) {
  console.log('useFooHook', goodsID)
  // 假设这是一个显示某商品有无库存的自定义hook，还可以用于如表单处理、动画、订阅声明、计时器等等场景
  const [isInStock, setIsInStock] = useState(null);
  // const [isInStock, setIsInStock] = useState(goodsID > 3);  // 最佳应该初始就设置条件初始值（这里主要是为了演示自定义hook故未这样）

  // do sth
  // setIsInStock(goodsID > 3); //! 直接调用将导致渲染循环
  requestAnimationFrame(() => {
    setIsInStock(goodsID > 3);
  });

  return isInStock
}
// 使用自定义hook（与内置hook无区别）
function UseCustomHook(props) {
  console.log('UseCustomHook', props.id)
  const isInStock = useFooHook(props.id);
  console.log(isInStock)

  useEffect(() => {
    console.warn('mounted')
  });

  return (
    <div>
      <h3>自定义Hook</h3>
      <p>
        <span>该商品库存情况：</span>
        <span>{typeof isInStock === 'boolean' ? (isInStock ? '有库存' : '无库存') : '未知'}</span>
      </p>
    </div>
  )
}


//* useContext（可结合 context.js 内容查看）
// 该hook用于读取祖先组件中通过context注入的数据，注意只是读取，故仍然需要在祖先组件中使用`<MyContext.Provider>`为后代组件提供相关context
function UseContextHook() {
  const themes = {
    light: {
      bg: '#eee',
      color: '#333'
    },
    dark: {
      bg: '#333',
      color: '#fff'
    }
  };
  const ThemeContext = React.createContext(themes.light); // 参数为初始值

  function Son() {
    return (
      <div className="border">
        <p>子组件</p>
        <Grandson />
      </div>
    )
  }
  function Grandson() {
    return (
      <div className="border">
        <p>孙子组件</p>
        <GreatGrandson />
      </div>
    )
  }
  function GreatGrandson() {
    // 参数接收一个 context 对象（React.createContext 创建的值），并返回该 context 的当前值，
    //! 注意这个当前值在初始时，并非是创建 MyContext 时传入 React.createContext 的初始值，而始终是上层离当前组件最近的 <MyContext.Provider> 的 value 属性提供的值（初始提供的值不一定就是创建 MyContext 时的初始值）
    //! 当上层 <MyContext.Provider> 的 value 更新时，该hook就会触发重渲染（即使中间层组件有使用 React.memo 或 shouldComponentUpdate 限制更新渲染，也不会影响使用了 useContext 的更深层组件因 context 变化导致的重渲染）
    const theme = useContext(ThemeContext);
    // useContext(MyContext) 实际就相当于 class 组件中的 static contextType = MyContext 或 <MyContext.Consumer>，用于接收上层组件注入的数据

    return (
      <div className="border" style={{
        background: theme.bg,
        color: theme.color
      }}>重孙组件</div>
    )
  }

  const [curTheme, setCurTheme] = useState('dark');
  function switchTheme() {
    setCurTheme(pre => {
      return pre === 'dark' ? 'light' : 'dark'
    });
  }

  return (
    <div>
      <h3>useContext</h3>
      <button onClick={switchTheme}>切换主题(后代组件接收祖先组件注入的值)</button>
      {/* 通过 context 向下注入数据 */}
      <ThemeContext.Provider value={themes[curTheme]}>
        <div className="border">
          <p>外层组件（向下注入数据的组件）</p>
          <Son />
        </div>
      </ThemeContext.Provider>
    </div>
  )
}


//* useReducer
// 该hook可以看做 useState 的替代方案，在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等
// 并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数，
//! 实际就相当于将之前使用 useState 管理状态时，我们可能有个自定义方法去根据不同条件来设置 setState 值，而换成useReducer就相当于把这个自定义方法放在了useReducer的reducer中
function UseReducerHook({average}) {
  function resetInitVal(val) {
    // 若有复杂的计算处理(或是有复杂重置初始值操作)才有单独提取函数的意义，这里只是使用示例
    return val > 0 ? val : 0;
  }
  // useReducer 接收三个参数：参数1是一个返回新状态值的状态处理函数reducer，参数2为状态初始值initVal，可选的参数3为初始状态处理函数initFn(用于初始化前面的initVal，若传入此参数则其返回值才作为实际的初始状态值)
  // 其返回两个值：状态及对应的触发状态改变的 dispatch 方法(变量名自定义)
  //* 其数据变化和触发流程有点类似 Vuex 中的状态管理
  // 参数1状态处理函数reducer也接收两个参数：第一个就是当前状态值state，第二个为动作action(由 dispatch 传入，即表示做什么操作，实际也就是一个自定义数据，函数内部根据相应的数据做对应处理)，最后返回新的状态值
  const [num, dispatch] = useReducer((state, action) => {
    // 这里的 action 即是调用 dispatch 时传入的值，react会确保该值传入后是稳定的，不会因为组件重渲染而丢失
    switch (action.type) {
      case '-': state--;break;
      case '+': state++;break;
      case 'reset': state = resetInitVal(action.payload);break; // 若 resetInitVal 有较复杂的计算，这里单独提取函数就能显示其价值
      default: throw new Error('Invalid action');
    }
    return state; // 返回新的状态值
  }, average, resetInitVal);  // 这里传入了可选的第3个参数，故其返回值才是 num 的实际初始值，前面的初始状态值 average 会作为参数自动传入 resetInitVal

  return (
    <div>
      <h3>useReducer</h3>
      <div>
        {/* 可在事件处理函数中直接调用 dispatch(action) 处理相关操作 */}
        <button onClick={() => dispatch({type: '-'})}>-</button>
        <input type="text" value={num} style={{width: '50px', margin: '0 10px', textAlign: 'center'}} disabled />
        <button onClick={() => dispatch({type: '+'})}>+</button>
        <button onClick={() => dispatch({type: 'reset', payload: average})} style={{marginLeft: 10}}>reset</button>
      </div>
    </div>
  )
}

//* useMemo
// 返回一个具备缓存能力的数据值（任何可被当做值的内容，包括react元素和函数）
// 该hook返回一个memoized值（函数式编程中的Memoization概念，可理解为记忆体、缓存体，即会缓存之前的值，若再次传入相同的入参将直接从缓存中取值而无需重新计算）
// 可用于类似这样的场景：父组件重渲染（默认也会导致子组件重渲染），但是若传给子组件的props并未发生变化此情况下子组件的渲染就是不必要的，若恰好此子组件重渲染又很耗性能，那么此时使用 useMemo 就可以避免这样的情况
function UseMemoHook({prop1, prop2}) {
  function SonComp({index}) { return <span>子组件 {index}</span>}
  // 参数1：一个函数，该函数会被 useMemo 立即调用执行，且其返回值会被缓存且由 useMemo 返回到外部
  // 参数2：依赖项数组
  const memoizedValue = useMemo(function() {
    // do sth
    //! 注意该函数会在渲染期间执行，故不应该在此处做副作用操作
    return <SonComp index={prop1} />; // 返回一个值
  }, [prop1]); // 依赖项发生变化时才再次执行参数1中的函数（这里相当于控制着其中的子组件是否重渲染，因为有缓存，只要 prop1 没变，父组件重渲染就不会导致这里面的子组件也重渲染）

  return (
    <div>
      <h3>useMemo {prop2}</h3>
      <p>useMemo(fn, depsArr)，缓存函数 fn 的返回值(fn 会被执行)，只有 depsArr 依赖数组中的值发生变化才会重新执行 fn</p>
      { memoizedValue }
    </div>
  )
}

//* useCallback
// 返回一个具备缓存能力的函数
//! 基本与 useMemo 相同，但作用对象不一样，useMemo 缓存作用在函数的返回值上，
//! 而 useCallback 缓存作用在传入的函数本身上，即使得依赖项不变的情况下也保持函数不变（将函数本身当做一个值理解即可）
//* useCallback(fn, deps) 相当于 useMemo(() => fn, deps) 的简写方式
function UseCallbackHook(prop1, prop2) {
  function SonComp({fn}) {
    fn();
    return <span>子组件</span>
  }
  // 参数1：一个函数，该函数不会被调用执行，其只是会被缓存（注意缓存的是该函数，而不是其返回值）后返回到外部
  // 参数2：依赖项数组
  const memoizedCallback = useCallback(function() {
    // do sth
    Math.max(prop1, prop2);
  }, [prop1, prop2]);  // 依赖项发生变化时才再次更新参数1中的函数

  return (
    <div>
      <h3>useCallback</h3>
      <p>useCallback(fn, depsArr)，缓存函数 fn (<b>注意不是其返回值</b>，fn 不会被执行)，只有 depsArr 依赖数组中的值发生变化才会重新 fn</p>
      <SonComp fn={memoizedCallback} />
    </div>
  )
}

//* useRef
function UseRefHook() {

  return (
    <div>
      <h3>useRef</h3>
    </div>
  )
}

export default function() {
  return (
    <div>
      <h2><a target="_blank" href="../src/notes/使用Hook.js">使用Hook</a></h2>
      <UseStateHook />
      <UseEffectHook />
      <UseCustomHook id={Math.ceil(Math.random()*10)} />
      <UseContextHook />
      <UseReducerHook average={7} />
      <UseMemoHook />
      <UseCallbackHook />
      <UseRefHook />
    </div>
  )
}