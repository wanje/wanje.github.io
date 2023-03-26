import React from 'react';

//jsx语法是JS与HTML标签混合使用，HTML中的js语法部分要用花括号括起来：<tag>{ //there is js code }</tag>
//一个变量中保存jsx语法表达式时，带上换行和缩进格式好看且可读性高，虽然可以直接赋值给变量，但推荐使用小圆括号包裹起来，防止分号自动插入的bug
let a1 = [
  <h5 key="1">Hello world!</h5>,
  <p key="2">React is awesome</p>
];
/**
 * 须注意：一个HTML代码段只能有一个根元素，
 * 且JSX声明的内容表示的是对象(React元素)，并非HTML代码段，其与使用 React.createElement() 方法创建返回的内容是等价的
 * */
let a2 = (
    <div>
      <h5 key="1">Hello world!</h5>
      <p key="2">React is awesome</p>
    </div>
);
let names = ['Alice', 'Emily', 'Kate'];
let attr = {
  title: "测试",
  className: "main"
};
const compData = {
  tagOrCompName: 'p',
  content: 'jsx中的标签相当于一个变量，所以尖括号上的标签名可以使用任何符合组件定义的数据变量代替，如：<obj.tagOrCompName />、<obj.funComp />',
  style: {color:'red'},
  funComp() {
    return <p style={{color:'blue'}}>这是一个放在对象变量中的函数组件</p>;
  }
};

/** 因JSX语法上更接近JavaScript而不是HTML，所以`React DOM`使用小驼峰命名方式定义属性名 */

function JsxGrammar(props) {
  return (
      <div>
        <h2><a href="../src/notes/jsx.js">JSX语法</a></h2>
        { /*注释，注意若是穿插在render中html间的注释(文本区域)，要使用花括号包裹，且只能使用斜杠/加星号*的方式，否者都会当做是html中的文本*/ }
        <div>{a1}{a2}</div>
        <div className="aClass">由于HTML中的 class 和 for 属性在JS中为保留关键字，故在 JSX 中元素标签上使用 className 和 htmlFor 替代，以免与JS中的 class 和 for 弄混</div>
        <label htmlFor="firstName">在JSX中标签上只有属性名，但未设置值的，则默认表示其值为true；若是没有写属性名，则默认表示其值为false，如下面的disable属性</label>
        <input type="text" id="firstName" disabled placeholder="这里的disabled属性写了属性名但未设置值，JSX默认为其值为true，等同于 disabled={true}"/>
        <input type="text" placeholder="这里的disabled属性未设置，JSX默认为其值为false，等同于 disabled={false}"/>
        <input type="text" {...attr} placeholder="可以使用ES6中...扩展操作符将对象展开同时设置在标签属性上，注意若标签上已存在相同属性，那么后设置的将覆盖先前的值"/>
        <p data-attr="自定义属性">自定义属性可使用data-方式，方便区分</p>
        <compData.tagOrCompName style={compData.style}>{compData.content}</compData.tagOrCompName> {/* 也可以使用`children`属性填充内容 */}
        <compData.funComp />
        {/*<p>{{__html: '<span>显示原始HTML</span>'}}</p>*/}
        <ul>
          {
            names.map(function (name, index) {
              return <li key={index}>Hello, {name}!</li>  //这里不在html或组件标签间(这里是html标签外且存在花括号包裹，属于js语法范围)，所以还是可以用双斜杠方式注释
            })
          }
        </ul>
      </div>
  )
}

export default JsxGrammar;