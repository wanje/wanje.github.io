import React, {  //? 这里的 React 对象导入不能省略，使用JSX语法时 React 必须局部引入(即使未直接到该对象)
  useState,
  useEffect,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
  useDebugValue
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
  //! 因初始化函数只会在组件初始渲染时执行一次，故若初始化需要依赖外部传入的 prop 时要么保证该组件初始渲染时相关 prop 已具备最新值，要么在 useEffect 中更新这里与 prop 有关的值
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
      <p className="color-gray">该hook用于在函数组件中添加状态数据</p>
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
      setCount(val => val + 1); // 在这不依赖于外部的 `count` 变量，而直接使用改变状态值时的函数参数形式来获取相关状态
      //! 若换成如下依赖外部`count`的形式，则首先需要在依赖列表中添加`count`(易遗忘导致bug，一直是初始值)，然后将使得每次`count`更新都会导致这里的effect函数执行
      // setCount(count + 1);   //? 虽然在外部用`useRef`hook创建一个对某状态的引用，在effect内部使用该引用的方式来避免直接添加进依赖表的方式也可达到目的，但不到万不得已不应这样做，因为这样导致依赖难以预测，不好维护和debug
    }, 10000);
    return () => clearInterval(id);
  }, []); // 我们的 effect 不使用组件作用域中的任何变量，也就不会在DOM每次渲染频繁执行effect

  return (
    <div>
      <h3>useEffect</h3>
      <p className="color-gray">该hook可以在函数组件中执行副作用操作(部分生命周期钩子操作)，数据获取、添加订阅、设置定时器以及手动更改React组件中的DOM都属于副作用</p>
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

  //? 该 useDebugValue hook用于在React开发者工具中debug时`hooks面板中`显示该自定义 hook 的标签名（例如这里可能是：FooHook: "有库存" 或 FooHook: "无库存"）
  // 参数1为要显示的原始值，可选的参数二为延迟格式化参数1的值在需要的时候再执行返回实际显示值，
  // 参数2的目的是若参数1的值需要格式化后显示时，若其格式化操作需要较大开销每次都直接在参数1位置处格式化就很浪费性能，而参数2只在检查该hook时才执行（其参数为原始显示值）
  useDebugValue(isInStock ? '有库存' : '无库存', debug => '格式化：' + debug);

  return isInStock
}
// 使用自定义hook（与内置hook无区别）
function UseCustomHook(props) {
  console.log('UseCustomHook', props.id)
  const isInStock = useFooHook(props.id);
  console.log(isInStock)

  useEffect(() => {
    console.warn('mounted or updated')
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
  const ThemeContext = React.createContext(themes.light); // 参数为默认初始值，其只在内部消费组件在上层组件树中未匹配到对应Provider时才会生效

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
      <p className="color-gray">该hook用于读取祖先组件中通过context注入的数据，注意只是读取，故仍然需要在祖先组件中使用`&lt;MyContext.Provider&gt;`为后代组件提供相关context</p>
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
// 该hook可以看做 useState 的替代方案，在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值(对象、数组等)，或者下一个 state 依赖于之前的 state 等
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
      <p className="color-gray">该hook可以看做 useState 的替代方案，在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值(对象、数组等)，或者下一个 state 依赖于之前的 state 等，其数据变化和触发流程有点类似 Vuex 中的状态管理</p>
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
  function SonComp({index}) { return <span hidden>子组件 {index}</span>}
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
      <p className="color-gray">useMemo(fn, depsArr)，用于缓存函数 fn 的返回值(fn 会被执行)，只有 depsArr 依赖数组中的值发生变化才会重新执行 fn</p>
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
    return <span hidden>子组件</span>
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
      <p className="color-gray">useCallback(fn, depsArr)，用于缓存函数 fn (<b>注意不是缓存其返回值</b>，fn 不会被执行)，只有 depsArr 依赖数组中的值发生变化才会更新 fn</p>
      <p className="color-orange">useCallback(fn, deps) 相当于 useMemo(() =&gt; fn, deps) 的简写方式</p>
      <SonComp fn={memoizedCallback} />
    </div>
  )
}

//* useRef
//! 该hook返回一个可变的ref对象，注意其是一个通用容器，可以保存任何可变值，而不仅是DOM或react元素，其类似于 class 组件实例属性，可以手动给current赋值，如用于保存/清除定时器
// 当其被传给元素或react组件时，其则是对DOM或react元素的引用包装对象，非直接引用，而是放在current属性中的，此时作用类似vue中的ref，但使用方式不一样
//? 对于函数组件，若没有使用`useImperativeHandle`包装主动暴露给父组件可访问内容，则使用`ref`引用该组件时似乎访问不到任何内容
//! useRef 会在每次渲染时返回同一个 ref 对象，不会像直接使用一个普通变量存值而导致每次渲染都被置为初始值
function UseRefHook() {
  // 参数(可选)为该hook返回的对象中`current`的初始值
  const son = useRef(null);  //! 通过返回对象的 refObj.current 属性访问保存的值
  const handleClick = () => {
    // `current`指向已挂载到 DOM 上的文本输入元素
    son.current.focus();
  };

  const timerId = useRef();
  useEffect(() => {
    // 手动更新保存的值
    //! 注意当ref对象内容发送变化时，useRef并不会发出通知，更新 current 属性不会引发组件重渲染
    timerId.current = setInterval(() => {
      // do sth
      son.current.value = Date.now();
    }, 10000);

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return (
    <div>
      <h3>useRef</h3>
      <p className="color-gray">该hook返回一个可变的ref对象，其是一个通用容器，可以保存任何可变值，作用类似class实例上的属性(因函数组件不是类，没有实例，内部普通变量每次重渲染都是初始值，而ref可使得不参与数据流的非状态类值在重渲染中也保持最新)</p>
      <div>
        {
          //! 由于useRef不会通知变化，若想要在react绑定或解绑DOM节点的ref时执行某些操作，则需要使用回调ref来实现，这样组件每次重渲染都会调用该回调执行
          // 回调ref即是给元素ref属性传入一个函数，该函数默认会接收当前节点对象为参数(此时不是用的useRef，故参数是直接节点对象)
        }
        <input ref={son} type="text" style={{marginRight: 10}} />
        <button onClick={handleClick}>focus</button>
      </div>
    </div>
  )
}

//* useImperativeHandle
// 该hook用于自定义当前组件暴露给父组件的`ref`对象的可用实例内容(即提供给父组件可以通过ref访问哪些属性或方法等)，因为函数组件不像class类组件的属性和方法都挂载在类实例上，不显式暴露给外部就访问不到内部任何内容
//! 该hook要与`forwardRef`一起使用
function UseImperativeHandleHook() {
  let SonComp = function(props, ref) {
    const [style, setStyle] = useState({
      display: 'inline-block',
      background: 'orange',
      transition: 'width 0.2s',
      height: 20,
      width: 20
    });

    useImperativeHandle(ref, () => ({
      toggleSize() {
        setStyle(preState => ({
          ...preState,
          width: preState.width === 20 ? 200 : 20
        }))
      }
    }));

    return <div style={style} onClick={() => setStyle({})}></div>
  }
  SonComp = forwardRef(SonComp);

  const son = useRef(null);
  const handleClick = () => {
    son.current.toggleSize();
  };

  return (
    <div>
      <h3>useImperativeHandle</h3>
      <p className="color-gray">该hook用于自定义当前组件暴露给父组件的`ref`对象的可用实例内容，需要与`forwardRef`方法一起使用</p>
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <button onClick={handleClick}>resize</button>
        <SonComp ref={son} />
      </div>
    </div>
  )
}

//* useLayoutEffect
// 该hook的作用与`useEffect`完全一样，一般使用`useEffect`就够了，除非使用`useEffect`有问题再使用`useLayoutEffect`
//! 区别：该hook会在所有DOM变更后同步调用effect(时机是DOM已更新后但浏览器绘制在屏幕上之前)，该hook会阻塞渲染(若hook中有同步任务执行很耗时则影响就较大，故慎用)，而 useEffect 是异步调用
//! 该hook与 componentDidMount、componentDidUpdate 的调用阶段是一样的（useEffect 的阶段只是近似一样）
function UseLayoutEffectHook() {
  //? 比较 useEffect 与 useLayoutEffect 的效果，除了这两个hook外，组件其他声明都一样
  // useEffect 效果
  function NormalEffect() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log(count, document.querySelector('#t1').outerHTML);
      if (count === 0) {
        // let i = 0;
        // while (i < 5000) {
        //   i++;
        //   console.log('t1');
        // }
        setCount(10 + Math.random()*200);
      }
    }, [count]);
    return (
      <div style={{userSelect: 'none'}} onClick={() => setCount(0)}>
        <span>useEffect（有闪烁跳跃感）：</span>
        <span id="t1">{count}</span>
      </div>
    );
  }
  // useLayoutEffect 效果
  function LayoutEffect() {
    const [count, setCount] = useState(0);
    useLayoutEffect(() => {
      console.log(count, document.querySelector('#t2').outerHTML);
      if (count === 0) {
        // let i = 0;
        // while (i < 5000) {
        //   i++;
        //   console.log('t2');
        // }
        setCount(10 + Math.random()*200);
      }
    }, [count]);
    return (
      <div style={{userSelect: 'none'}} onClick={() => setCount(0)}>
        <span>useLayoutEffect（无闪烁跳跃感）：</span>
        <span id="t2">{count}</span>
      </div>
    );
  }
  
  return (
    <div>
      <h3>useLayoutEffect</h3>
      <p>
        <span className="color-gray">该hook会在所有DOM变更后同步调用effect(时机是DOM已更新后但浏览器绘制在屏幕上之前)，该hook会阻塞渲染(若hook中有同步任务执行很耗时则影响就较大，故慎用)，
          而 useEffect 是异步调用，该hook与 componentDidMount、componentDidUpdate 的调用阶段是一样的（而 useEffect 的阶段只是近似一样）
        </span>
        <span>故在下面“<i>点击文字将数字重置为 0，然后effect副作用回调中又会重新生成一个随机数来切换数字</i>”的示例场景中会看到切换过程中useEffect会存在闪烁跳跃感，而useLayoutEffect就没有，
        原因就是在点击重置为0时，useEffect是异步调用effect，0渲染绘制出来后effect中更新又渲染绘制，就出现跳跃感，
        而useLayoutEffect的effect是同步调用，更新0的DOM后而还未绘制前又执行effect中的数据更新从而阻塞前面的绘制，故就不会再有绘制0这一步，而直接绘制新产生的随机数</span>
      </p>
      <div>
        <h5>点击数字切换：</h5>
        <NormalEffect />
        <LayoutEffect />
      </div>
    </div>
  )
}

//* useDebugValue
// 该hook用于在React开发者工具中debug时“hooks面板中”显示对应自定义 hook 的标签名（可在上面自定义hook useFooHook 中查看使用示例）
function UseDebugValueHook() {
  return (
    <div>
      <h3>useDebugValue</h3>
      <p className="color-gray">该hook用于在React开发者工具中debug时“hooks面板中”显示对应自定义 hook 的标签名（较少使用到）</p>
    </div>
  )
}

//* useDeferredValue（v18+）
// 该 hook 接收一个参数值，并返回该值的新副本，将该副本推迟到其他更紧急的更新之后再更新，注意其只是延时更新值，并不能阻止紧急更新期间导致的子组件重渲染(此问题仍需用memo/useMemo)
function UseDeferredValueHook() {
  //? 伪代码示例
  /* const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);
  //! Memoizing 告诉 React 仅当 deferredQuery 改变，而不是 query 改变的时候才重新渲染
  const suggestions = useMemo(() => <SearchSuggestions query={deferredQuery} />, [deferredQuery]);
  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">
        {suggestions}
      </Suspense>
    </>
  ); */

  return (
    <div>
      <h3>useDeferredValue（v18+）</h3>
      <p className="color-gray">该 hook 接收一个参数值，并返回该值的新副本，将该副本推迟到其他更紧急的更新之后再更新，
      比如响应用户输入中输入内容是实时显示渲染的，而在我们打完拼音显示完整的字词前实际是不需要每敲击一下键盘就实时更新文本内容的，这个间隙完全可以让给其他更紧急需要渲染的任务，
      而 useDeferredValue 的目的就是为此，但需注意其延迟更新并不是等待任意固定时间，而是将其他认为更紧急的任务完成后就立即更新，且其延迟的是值的更新而非阻止子组件重渲染，
      若要防止其他紧急更新期间子组件重渲染，则还是必须使用 memo/useMemo 记忆(缓存)该子组件。
      其与使用防抖和节流去延迟更新用户空间hooks类似</p>
    </div>
  )
}

//* useTransition（v18+）
// 该hook用于创建一个过渡任务并反馈其完成状态，例如常见的loading就属于过渡任务，因完成前后有肉眼可及的中间等待过程，触发加载任务时就开始等待结果，收到结果后就结束等待状态
//? 由于 useTransition 是 react18+ 才有的新API，这里为演示使用方法，自定义了其内容，但无实际对应功能
function useTransition() {
  const [isPending, setIsPending] = useState(false);
  return [isPending, async function(callback){
    setIsPending(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    }).then(callback);
    setIsPending(false)
  }]
};
function UseTransitionHook() {
  // 该hook无初始参数，但返回两个值：一个表示是否等待状态的布尔值 isPending、一个表示开始执行过渡任务的函数 startTransition
  // startTransition 函数接收实际的我们自定义的过渡任务函数
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(state => state + 1);
    });
  }

  return (
    <div>
      <h3>useTransition（v18+）</h3>
      <p className="color-gray">该hook用于创建一个过渡任务并反馈其完成状态，例如常见的loading就属于过渡任务，因完成前后有肉眼可及的中间等待过程，触发加载任务时就开始等待结果，收到结果后就结束等待状态</p>
      <p>
        <span>是否过渡等待状态：{isPending ? '是' : '否'}，{count}</span>
        <button className="mgl-10" onClick={handleClick}>+1</button>
      </p>
    </div>
  )
}

//* useId（v18+）
// 该hook用于生成一个唯一ID（客户端和服务端均适用）
//! 该 hook 生成的是一个包含`:`的字符串token，这在CSS选择器及与选择器相关的JS API中是不支持的，且其目的不是用于生成循环中的key或其他数据关联的id
//? 由于 useId 是 react18+ 才有的新API，这里为演示使用方法，自定义了其内容
function useId() { return ':' + Date.now() + ':' }
function UseIdHook() {
  const id = useId();

  return (
    <div>
      <h3>useId（v18+）</h3>
      <p className="color-gray">该 hook 无参数，其返回一个唯一ID（客户端和服务端均适用），
      同一组件中用到多个id可使用一个useId然后添加不同后缀（主要是感觉上的关联性，也可每个都重新生成一个），
      <span className="color-orange">注意：useId 生成的是一个包含`:`的字符串token（类似:xxx:），这在CSS选择器及与选择器相关的JS API中是不支持的。</span></p>
      <label htmlFor={id}>通过id将label与input进行关联</label><input type="text" id={id} />
    </div>
  )
}

function LibraryHooks() {
  return (
    <div>
      <h3>v18+ 下另两个主要提供给工具/UI库中使用的hook</h3>
      <p>
        <span className="fwb">useSyncExternalStor：</span>
        <span className="color-gray">一个推荐用于读取和订阅外部数据源的hook</span>
      </p>
      <p>
        <span className="fwb">useInsertionEffect：</span>
        <span className="color-gray">与 useEffect 相同，但它在所有 DOM 突变之前同步触发。使用它在读取 useLayoutEffect 中的布局之前将样式注入 DOM。
        该 hook 不能访问 refs，也不能安排更新，其应仅限于 css-in-js 库作者使用。</span>
      </p>
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
      <UseImperativeHandleHook />
      <UseLayoutEffectHook />
      <UseDebugValueHook />
      <UseDeferredValueHook />
      <UseTransitionHook />
      <UseIdHook />
      <LibraryHooks />
    </div>
  )
}