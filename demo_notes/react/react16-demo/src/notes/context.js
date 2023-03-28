import React, { Component, createContext, useContext } from 'react';

// `Context`设计目的是为了共享那些对于一个组件树而言是“全局”的数据(比如跨组件共享的数据)，其能替代部分状态管理功能，但不能作为复杂状态管理的替代方案
// `Context`使我们无需明确地通过中间组件层层向下传递数据，就能将数据深入传递进组件树，使得组件数内的所有子孙组件都能访问到该数据
const themeConfig = {
  light: {
    background: '#fff',
    color: '#333'
  },
  dark: {
    background: '#20232a',
    color: '#fff'
  }
};
//* React.createContext(defaultValue)，创建一个`Context`，参数`defaultValue`为默认初始值
//! 默认值`defaultValue`只在内部消费组件在上层组件树中未匹配到对应Provider时才会生效
const ThemeContext = createContext({ // 可以将context相关声明和数据放在一个单独的文件中，以便要使用的地方都可以导入
  style: themeConfig.light,
  toggleTheme: () => {}
});
//* `displayName`属性用于自定义该`Context`在`React DevTools`中显示的名字，便于调试
// ThemeContext.displayName = 'CustomNameInDevTool' //* 其实所有组件都有该属性，可以看做设置的一个别名

// 上层组件
//* 作为Context的提供者，将对应数据向下传递
export default class Context extends Component {
  constructor() {
    super();
    this.state = {
      style: themeConfig.light,
      toggleTheme: () => {
        this.setState({
          style: this.state.style.background === '#fff' ? themeConfig.dark : themeConfig.light
        })
      }
    }
  }
  render() {
    return (
      //* 使用`Context.Provider`组件(发布者)将当前上下文数据传递给内部子孙组件，注意该组件不会产生一个实际的标签
      //* 通过`value`属性将当前的值传递下去，注意：将`undefined`传递给`value`时，`defaultValue`不会在内部消费组件中生效
      //* 一个`Provider`可以和多个消费组件有对应关系，多个`Provider`也可以嵌套使用，里层的会覆盖外层的数据。
      //! 多个`Context.Provider`可嵌套使用，以发布多个context，此时也需要多个`Context.Consumer`嵌套使最底层组件同时订阅多个context
      //* 当`Provider`的`value`值发生变化时，它内部的所有消费组件都会重新渲染。`Provider`及其内部`consumer`组件都不受制于`shouldComponentUpdate`函数，因此当`consumer`组件在其祖先组件退出更新的情况下也能更新
      //! 须注意，若`value`属性指定的值是一个对象，则应该将该对象提升到`Provider`标签外存储或组件的`state`中，这里只引用，而不是直接将对象声明在`value`属性中，
      //! 避免每次`Provider`重渲染时，即使`value`值未变化，也会使其内部订阅该context的子孙组件都重渲染(因每次`value`的对象值都相当于是新声明的，与原对象不是同一个地址，被认为数据已变化)
      <ThemeContext.Provider value={this.state}> {/* 将主题切换函数也作为context数据传递到组件树中，可达到在子孙组件中修改context数据的目的 */}
        <h2><a target="_blank" href="../src/notes/context.js">Context</a></h2>
        <div className="border">
          <p>顶层组件</p>
          <MiddleComp />
        </div>
      </ThemeContext.Provider>
    )
  }
}

// 中间层组件，无需再通过该组件props显式将上层组件的某数据继续传递给下层组件
function MiddleComp() {
  return (
    <div className="border">
      <p>中间层组件中嵌入下层主题切换组件</p>
      <InsideComp1 />
      <InsideComp2 />
      <InsideComp3 />
      <InsideComp4 />
    </div>
  )
}

// 底层组件1
class InsideComp1 extends Component {
  //* 底层组件上指定使用组件的静态属性`contextType`读取当前的context，该底层组件也就作为该context的消费组件(订阅者/消费者)
  //! 该`contextType`静态属性只有class类声明的组件可使用，函数组件不可用，函数组件可以使用`useContext(MyContext)`hook钩子进行绑定和获取先关context
  //* 注意当前的context就是上面`createContext`声明的context，可以理解为将声明的context上下文绑定到当前组件的`contextType`属性上，从而关联读取到上层最近一个使用该相同context的顶层组件所Provider提供的当前数据
  //! 若当前底层组件通过该context未匹配到上层使用该相同context的Provider提供者，无法读取其数据，此时就会使用该context声明时传入的defaultValue默认值
  
  static contextType = ThemeContext; //!若在使用babel转换class语法，这可以使用`static`这个类属性初始化contextType，否则就只能在类声明完后使用`MyComponent.contextType = ThemeContext`的方式初始化contextType

  render() {
    console.log('底层class类组件：', this.context) //* 通过组件中的`context`属性访问订阅的上下文数据
    return (
      <div className="border" style={this.context.style}>
        <p>底层组件1</p>
        <button onClick={this.context.toggleTheme}>切换主题</button>
      </div>
    )
  }
}
// 底层组件2
class InsideComp2 extends Component {
  render() {
    return (
      <div className="border" style={this.context.style}>
        <p>底层组件2</p>
        <p>当前主题为：{this.context.style.background === '#fff' ? 'light' : 'dark'}</p>
      </div>
    )
  }
}
InsideComp2.contextType = ThemeContext; //* 初始化/订阅context

// 底层组件3
function InsideComp3() {
  //* 函数组件中可使用`useContext`hook钩子订阅context上下文，可获取组件树上离其最近的上层Provider发布者的value数据
  const ctx = useContext(ThemeContext);
  console.log('底层函数组件：', ctx);
  return (
    <div className="border" style={ctx.style}>
      <p>底层组件3</p>
      <p>函数组件用`useContext`钩子绑定获取上下文：{ctx.style.background === '#fff' ? 'light' : 'dark'}</p>
    </div>
  )
}

// 底层组件4
function InsideComp4() {
  return (
    //* `Context.Consumer`可用于声明一个订阅该context上下文的组件(消费者/订阅者)
    //* 订阅`Context.Consumer`的组件必须是一个函数式组件，该函数式组件接受当前`context`为参数，，可获取组件树上离其最近的上层Provider发布者的value数据
    //* 可采用以下方式定义
    // <ThemeContext.Consumer children={func} />，`children`属性内定义函数组件(或一个函数引用)，注意是一个函数，不是一个组件标签(react元素)
    // <ThemeContext.Consumer>{func}</ThemeContext.Consumer>，直接将函数式组件放在标签之间，与上面的方式等价
    //! 须注意上面两种方式绑定的组件func都是函数式组件，且其都是一个函数声明或是函数引用，而不是一个函数组件标签(react元素)，不同于`react-router-dom`中`Route`组件上函数和元素都可
    <ThemeContext.Consumer>
      {ctx => {
        console.log(ctx);
        return (
          <div className="border" style={ctx.style}>
            <p>底层组件4</p>
            <p>使用`Context.Consumer`让一个函数式组件订阅对应的context：{ctx.style.background === '#fff' ? 'light' : 'dark'}</p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

//TODO 发布/订阅(消费)多个context举例
// class App extends React.Component {
//   render() {
//     const {signedInUser, theme} = this.props;
//     // 提供初始 context 值的 App 组件
//     return (
//       <ThemeContext.Provider value={theme}> {/* 多个`Provider`嵌套 */}
//         <UserContext.Provider value={signedInUser}>
//           <Layout />
//         </UserContext.Provider>
//       </ThemeContext.Provider>
//     );
//   }
// }
// function Layout() {
//   return (
//     <div>
//       <Sidebar />
//       <Content />
//     </div>
//   );
// }
// // 一个组件可能会消费多个context
// function Content() {
//   return (
//     //* 多个`Consumer`嵌套声明函数式组件，使得最底层的组件可同时访问到多个context
//     //* 应该也可以使用`useContext`hook来订阅多个context
//     //! 除上面两种方式(都是函数式组件)可以同时订阅多个context外，前面提到的class类组件应该无法同时订阅多个context(因为其获取绑定context只能赋值给`contextType`属性)
//     <ThemeContext.Consumer>
//       {theme => (
//         <UserContext.Consumer>
//           {user => (
//             <ProfilePage user={user} theme={theme} />
//           )}
//         </UserContext.Consumer>
//       )}
//     </ThemeContext.Consumer>
//   );
// }