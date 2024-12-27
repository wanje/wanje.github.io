// 以下配置基于 prettier 3+ 版本

export default {
  printWidth: 100, // 单行字符推荐长度（非ESLint中max-len最大长度限制）
  tabWidth: 2,  // 缩进空格数
  useTabs: false, // 使用tab缩进（这里我们使用空格来缩进）
  semi: true, // 所有句尾添加分号
  singleQuote: true,  // 使用单引号
  quoteProps: 'as-needed',  // 对象属性名称不加引号（仅在需要加时才加），若要想vue中class的对象属性又都加上引号，目前在 prettier 下该配置项就只能使用 preserve 值，即保留用户输入，所有地方由用户自己决定，而不统一
  jsxSingleQuote: false,  // jsx中不强制使用单引号，因为部分类HTML的内容属性上是要双引号的，而其他JS部分的内容还是推荐单引号
  trailingComma: 'es5',  // 尾逗号（仅在多行对象、数组等场景下，TS下包括函数参数列表，方便尾部追加选项）
  bracketSpacing: true,  // 在对象内部两端保留空格
  bracketSameLine: false,  // 多行HTML属性时标签的尾部尖括号不与最后一个属性放在同一行（默认true，即放在同一行，不适用于自闭和标签）
  // jsxBracketSameLine: false,  // 同 bracketSameLine，只是针对 jsx //!! v2.4.0 中已废弃，由 bracketSameLine 代替
  arrowParens: 'avoid',  // 箭头函数参数只有一个时是否添加括号（avoid，尽可能省略）
  // requirePragma: true,  // 是否文件开头有 @prettier 或 @format 的注释该文件才被格式化 //! 在历史大项目中可以开启，以便逐步或针对性格式化，避免一次格式化影响大量文件
  // insertPragma: false,  // 是否向已格式化的文件顶部插入 @format 注释标记，默认 false
  htmlWhitespaceSensitivity: 'css',  // 标签内两端空格敏感度，css：根据CSS的默认display属性来决定是否保留空格，行内元素不保留，块级元素保留，而其他类HTML则保留用户输入的空格
  vueIndentScriptAndStyle: false,  // vue中的style和script标签是否缩进
  endOfLine: 'lf',  // 换行风格（lf（仅换行符\n，即Linux/Unix风格）、crlf（回车符+换行符\r\n，即Windows风格）
  embeddedLanguageFormatting: 'off',  // 是否格式化嵌入的代码块，比如JS中的html模板、md中的代码块（默认auto，即自动根据内容识别来格式化，off为关闭） //!! 实测关闭后会影响.vue文件正常内容的格式化
  singleAttributePerLine: false,  // 是否强制 HTML 及 vue、jsx 等类 html 标签的每个属性都单独一行（我们更倾向属性较多需要换行时才单独成行）
}