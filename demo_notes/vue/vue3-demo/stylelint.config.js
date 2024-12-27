// 以下配置基于 stylelint 16+ 版本

//!! 局部忽略/启用 stylelint 检查的注释语法，[xxx] 为可选的具体规则名(多个规则名用逗号隔开)，不指定则表示禁用所有规则（注意CSS中只有/**/注释语法）
/* stylelint-disable [xxx] */  //! 忽略当前行之后的所有内容 stylelint 检查，直到遇到 stylelint-enable 注释行
/* stylelint-enable [xxx] */  //! 重新启用当前行之后的所有内容 stylelint 检查
/* stylelint-disable-line [xxx] */  //! 忽略当前行 stylelint 检查
/* stylelint-disable-next-line [xxx] */  //! 忽略该注释下一行 stylelint 检查

export default {
  // extends: ['stylelint-config-standard'], // 继承别人分享的配置
  defaultSeverity: 'error', // 设置默认告警等级为 error，若仅需要提醒则可设为 warning，另每条rule下的severity默认都是error
  plugins: ['stylelint-scss', 'stylelint-order'], // 启用 scss 及 css 属性顺序检查，需分别安装 stylelint-scss 和 stylelint-order 包，这里放在外部而非 overrides 中相应文件下使得外部scss规则配置对vue/scss文件中的scss语法都有效
  rules: {
    //! 风格，风格相关的其他大多配置都以在 v15 中弃用，v16 中移除，风格相关的规则可用 prettier 替代
    'comment-whitespace-inside': ['always', { severity: 'warning' }], // 注释前后要留空格
    'declaration-block-single-line-max-declarations': [1, { severity: 'warning' }], // 声明块中单行最大声明数量（这里要求每个属性单独成行）
    'comment-empty-line-before': ['always', { except: ['first-nested'], ignore: ['after-comment', 'stylelint-commands'], severity: 'warning' }], // 注释前必须有空行，除了块首、连续注释和 stylelint 命令行
    
    'block-no-empty': [true, { severity: 'warning' }], // 禁止空块（有意为之则至少在块内加上注释）
    'comment-no-empty': [true,, { severity: 'warning' }], // 禁止空注释
    'no-empty-source': [true, { severity: 'warning' }], // 禁止空源码文件(即样式文件中没有内容，至少可以加一行注释)
    'max-nesting-depth': [3, { severity: 'warning' }], // 嵌套深度限制

    //! 特性
    'selector-max-id': 0, // id 选择器的最大个数，这里设置为 0 表示禁用 id 选择器
    'selector-attribute-quotes': 'always', // 强制属性选择器的属性要用引号包裹
    'color-hex-length': ['short', { severity: 'warning' }], // 强制颜色值使用短写，例如 #fff
    'color-no-invalid-hex': true, // 禁止无效的十六进制色值
    'length-zero-no-unit': [true, { ignore: ["custom-properties"] }], // 为 0 的尺寸度量值省略单位（除自定义属性，主要指自定义css变量的值），会忽略calc等尺寸计算函数中的情况
    'declaration-block-no-shorthand-property-overrides': true, // 禁止简写属性覆盖其他属性（即简写属性应该放在前，局部覆写子属性在后）
    'declaration-block-no-redundant-longhand-properties': true, // 禁止冗余的长属性（即可以使用短属性合并写的不能拆开每条单独写，此规则在每个子属性都拆开了时才会判定冗余）
    'selector-class-pattern': ['^[a-z][a-z0-9-_]*[a-z0-9]$', { resolveNestedSelectors: true }], // 类选择器命名格式（采用BEM格式且禁用大写），包括嵌套选择器（scss嵌套拼接）
    'declaration-block-no-duplicate-properties': [ // 禁止重复属性，除连续的但具有不同值的情况（主要针对浏览器特定值及回退的情况）
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'font-family-no-duplicate-names': [true, { severity: 'warning' }], // 禁止同一字体声明中字体名称重复
    'font-family-no-missing-generic-family-keyword': null, // 关闭字体声明要包含通用字体，避免字体图标等错误 //! 单个rule的值为 null 时表示关闭该规则
    'function-calc-no-unspaced-operator': true, // 要求计算表达式中的运算符前后要留空格，如 calc、min 等
    'function-linear-gradient-no-nonstandard-direction': true, // 禁止在线性渐变中使用非标准方向值（即方向值只能为 to bottom、to bottom right 和弧度等）
    'keyframe-declaration-no-important': true, // 禁止在 @keyframe 规则中使用 !important（因为css中会忽略keyframe中的!important））
    'media-feature-name-no-unknown': true, // 禁止在媒体查询中使用未知的条件特性（即只能使用浏览器支持的条件特性）
    'no-descending-specificity': null, // 关闭禁止使用降序的选择器优先级（即不必一定优先级高的选择器要写在优先级低的后面），因大多情况下开发者知道css优先级，高优先级的即使在前也只针对性覆盖
    'no-duplicate-at-import-rules': true, // 禁止在 @import 规则中重复导入相同的文件（即只保留一份）
    'no-duplicate-selectors': [true, { disallowInList: false }], // 禁止重复使用相同的选择器（即无其他条件时只保留一份），但不包含列表中声明的选择器（几个选择器部分css属性共用时常用到）
    'no-invalid-double-slash-comments': true, // 禁止css中无效的双斜杠注释 //! 但下面scss中允许
    'property-no-unknown': true, // 禁止未知的css属性，避免意外写错的情况（除变量和带浏览器前缀的属性），//! 若需要可以设置忽略某些属性，如带浏览器前缀的非标准属性 line-clamp 等
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'slotted', 'global'] }], // 禁止未知的伪类选择器，但允许使用 vue3 中 :deep/:slotted/:global 伪类选择器
    'selector-pseudo-element-no-unknown': true, // 禁止未知的伪元素选择器
    'selector-type-no-unknown': true, // 禁止未知的标签选择器类型，//! 若需要可以设置排除自定义标签或小程序下标签
    'string-no-newline': true, // 禁止字符串无效换行
    'unit-no-unknown': true, // 禁止未知的单位，//! 小程序下可添加忽略 rpx

    //! scss 规则，这里是与上面 stylelint-scss 插件位置配合使用的，否则默认仅css检查不认识该选项
    'scss/double-slash-comment-whitespace-inside': ['always', { severity: 'warning' }], // scss 双斜线注释后要留空格（css中没有双斜杠注释）

    //! 属性顺序，须安装 stylelint-order 插件使用
    'order/order': ['custom-properties', 'declarations'], // 自定义属性(变量)在前，常规属性声明在后
    'order/properties-order': [
      'content',
      'position',
      'inset',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'flex',
      'flex-basis',
      'flex-grow',
      'flex-shrink',
      'align-self',
      'float',
      'clear',
      'box-sizing',
      'display',
      'flex-direction',
      'flex-flow',
      'flex-wrap',
      'align-items',
      'justify-content',
      'gap',
      'row-gap',
      'column-gap',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-radius',
      'outline',
      'overflow',
      'overflow-x',
      'overflow-y',
      'vertical-align',
      'font',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'text-align',
      'text-decoration',
      'text-shadow',
      'white-space',
      'text-overflow',
      'color',
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-size',
      'background-repeat',
      'background-attachment',
      'background-clip',
      'opacity',
      'filter',
      'box-shadow',
      'marks',
      'user-select',
      'cursor',
      'pointer-events',
      'animation',
      'animation-delay',
      'animation-play-state',
      'transition',
      'transition-delay',
      'visibility',
    ],
  },
  overrides: [
    // vue 单文件解析以支持其中style标签内css检查，需安装 postcss-html 包
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    // scss 语法解析，需安装 postcss-scss 包，相应也有 less 语法解析包
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: { // 这里的规则仅对匹配的文件生效，可覆盖上面的全局规则
        'at-rule-no-unknown': null, // 忽略所有未知的 at-rule
      },
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', 'node_modules', 'dist', 'public'], // 忽略某些文件的 stylelint 检查
};