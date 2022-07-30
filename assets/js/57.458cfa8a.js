(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{470:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"枚举类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#枚举类型"}},[t._v("#")]),t._v(" 枚举类型")]),t._v(" "),a("p",[t._v("通过以下语法可以"),a("strong",[t._v("定义")]),t._v("新的枚举类型：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("enum T { ... }\n")])])]),a("p",[t._v("其中 "),a("code",[t._v("T")]),t._v(" 是任意定义的名字，省略号 "),a("code",[t._v("...")]),t._v(" 表示可以定义一个或多个可以显式初始化的"),a("strong",[t._v("枚举值")]),t._v("。如：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" Direction "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Up"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 值默认为 0")]),t._v("\n  Down"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 值默认为 1")]),t._v("\n  Left"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 值默认为 2")]),t._v("\n  Right "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 值默认为 3")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("上述语句定义了新的枚举类型关键字 "),a("code",[t._v("Direction")]),t._v("，现在可以用这个关键字声明新的枚举类型：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明d为枚举类型Direction")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" d"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("定义枚举类型的时候就限制了枚举的取值范围，上述定义中枚举类型有4个值 "),a("code",[t._v("Direction.UP")]),t._v("、"),a("code",[t._v("Direction.Down")]),t._v("、"),a("code",[t._v("Direction.Left")]),t._v("、"),a("code",[t._v("Direction.Right")]),t._v("，枚举类型在任一时刻只能取这4个值其中之一")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明并初始化")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" d"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Direction "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Down"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 改变枚举类型的值")]),t._v("\nd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Up"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h1",{attrs:{id:"枚举值的默认值和自增性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#枚举值的默认值和自增性"}},[t._v("#")]),t._v(" 枚举值的默认值和自增性")]),t._v(" "),a("p",[t._v("如果没有对枚举值"),a("strong",[t._v("显式初始化")]),t._v("，那么"),a("strong",[t._v("枚举值默认为数字类型")]),t._v("，第一个出场的元素默认为数字 "),a("code",[t._v("0")]),t._v("，后续未显式初始化的枚举值会在前一个"),a("strong",[t._v("数字值")]),t._v("的基础上自动 "),a("code",[t._v("+1")]),t._v("。根据规则，可以得出前面的枚举定义中：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[t._v("Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Down "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Right "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("如果我们为枚举定义显式添加"),a("strong",[t._v("数字默认值")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" Direction "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Down"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Right\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("则得出：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[t._v("Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 显式初始化")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Down "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2 + 1 = 3")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 显式初始化")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Right "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4.3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3.3 + 1 = 4.3")]),t._v("\n")])])]),a("p",[t._v("在上述场景中，枚举值实际上就是数字类型 "),a("code",[t._v("number")]),t._v("，此时可以将枚举值直接赋值给数字：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Right"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 合法")]),t._v("\n")])])]),a("h1",{attrs:{id:"作为字符串的枚举值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#作为字符串的枚举值"}},[t._v("#")]),t._v(" 作为字符串的枚举值")]),t._v(" "),a("p",[t._v("除了初始化为数字，还可以将枚举值显式初始化为字符串：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" Direction "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'UP'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Down "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DOWN'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'LEFT'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Right "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'RIGHT'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正确")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'UP'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Down "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DOWN'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'LEFT'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Right "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'RIGHT'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 枚举值是字符串，直接赋值给字符串类型")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" s"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Direction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Up"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n")])])]),a("p",[t._v("在初始化为字符串的场景中，值的数字自增性依然起作用。如果一个没有显式初始化的枚举值前面是一个字符串，将会报错：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" Direction "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'UP'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Down"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error TS1061: Enum member must have initializer")]),t._v("\n  Left"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error TS1061: Enum member must have initializer")]),t._v("\n  Right "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error TS1061: Enum member must have initializer")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("虽然枚举值 "),a("code",[t._v("Direction.Down")]),t._v(" 没有显式初始化，但自增引擎仍然会起作用：编译器检测到前面一个出场的值 "),a("code",[t._v("Direction.Up")]),t._v(" 为字符串类型，无法自增 "),a("code",[t._v("+1")]),t._v("，此时编译器报错。改正这个错误很简单：")]),t._v(" "),a("div",{staticClass:"language-typescript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-typescript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" Direction "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'UP'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Down "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  Left"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不会报错，值为 3+1=4")]),t._v("\n  Right "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不会报错，值为 4+1=5")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正确")]),t._v("\nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Up "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'UP'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Down "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     \nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Left "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \nDirection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Right "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);