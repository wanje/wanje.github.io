(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{467:function(t,s,a){"use strict";a.r(s);var e=a(18),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git使用"}},[t._v("#")]),t._v(" Git使用")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#基本操作"}},[t._v("基本操作")]),a("ul",[a("li",[a("a",{attrs:{href:"#配置用户信息"}},[t._v("配置用户信息")])]),a("li",[a("a",{attrs:{href:"#创建或克隆仓库"}},[t._v("创建或克隆仓库")])]),a("li",[a("a",{attrs:{href:"#提交与推送"}},[t._v("提交与推送")])]),a("li",[a("a",{attrs:{href:"#分支操作"}},[t._v("分支操作")])]),a("li",[a("a",{attrs:{href:"#远程操作"}},[t._v("远程操作")])]),a("li",[a("a",{attrs:{href:"#撤销操作"}},[t._v("撤销操作")])]),a("li",[a("a",{attrs:{href:"#临时存储"}},[t._v("临时存储")])]),a("li",[a("a",{attrs:{href:"#其他"}},[t._v("其他")])])])]),a("li",[a("a",{attrs:{href:"#提交日志格式"}},[t._v("提交日志格式")]),a("ul",[a("li",[a("a",{attrs:{href:"#基本的-message-格式"}},[t._v("基本的 message 格式")])]),a("li",[a("a",{attrs:{href:"#message-字段说明"}},[t._v("message 字段说明")])])])]),a("li",[a("a",{attrs:{href:"#命名"}},[t._v("命名")]),a("ul",[a("li",[a("a",{attrs:{href:"#分支命名"}},[t._v("分支命名")])]),a("li",[a("a",{attrs:{href:"#多版本分支命名"}},[t._v("多版本分支命名")])]),a("li",[a("a",{attrs:{href:"#tag-命名"}},[t._v("tag 命名")])])])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"基本操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本操作"}},[t._v("#")]),t._v(" 基本操作")]),t._v(" "),a("h3",{attrs:{id:"配置用户信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置用户信息"}},[t._v("#")]),t._v(" 配置用户信息")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 配置用户名和邮箱")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'your name'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#--global 或 -g 表示全局设置，不加该参数则只针对当前项目设置")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'your.email@example.com'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --list "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#查看所有配置项结果")]),t._v("\n")])])]),a("h3",{attrs:{id:"创建或克隆仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建或克隆仓库"}},[t._v("#")]),t._v(" 创建或克隆仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 初始化本地库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将本地仓库原远程仓库关联，<origin> 表示远程仓库别名，一般都默认使用 origin，后面就使用此字段表示远程仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("origin"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("远程地址"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 克隆现有远程仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("远程地址"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"提交与推送"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交与推送"}},[t._v("#")]),t._v(" 提交与推送")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 从远程拉取 main 分支的更改")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin main\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看仓库状态，结果显示clean干净表示无问题，dirty脏则表示有问题")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" status\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加文件到暂存区，可以使用`*`模糊匹配，`git add .`表示添加所有文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("文件名"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#提交暂存区的更改到本地仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'本次提交的描述信息'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将本地提交推送到远程仓库 master 分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("master"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看提交历史")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看简介的提交历史（不会把每次的提交内容都列出来，只显示每次的message这些）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --oneline --graph --decorate --all\n")])])]),a("h3",{attrs:{id:"分支操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分支操作"}},[t._v("#")]),t._v(" 分支操作")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 创建分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch new-branch\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 切换分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout new-branch\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 创建并切换到新分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b new-branch\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将指定分支合并到当前分支，这里 new-branch 为被合并的分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge new-branch\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d new-branch\n")])])]),a("h3",{attrs:{id:"远程操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#远程操作"}},[t._v("#")]),t._v(" 远程操作")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看远程仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote -v\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 前面提到的拉取和推送操作")]),t._v("\n")])])]),a("h3",{attrs:{id:"撤销操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#撤销操作"}},[t._v("#")]),t._v(" 撤销操作")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 撤销对文件 filenam 的修改（未暂存文件）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -- "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 或使用（Git 2.23.0+ 支持 restore 命令）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" restore "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 取消暂存的文件 filename")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset HEAD "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 或使用")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" restore --staged "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("filename"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 回退指定的 commit_hash 提交，为 HEAD 关键字时表示回退到上一次提交（快捷写法）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 其会生成一个新的提交来记录这次撤销操作，这样不会破坏已有的修改历史")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" revert "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("commit_hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 硬回退到指定的 commit_hash 提交（此操作会丢失后续的所有提交）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("commit_hash"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("revert")]),t._v(" 是撤销指定的这一次提交，不是舍弃在那之后的提交而回到指定的这次提交，是只移除某历史节点操作（实际记录仍在）；")]),t._v(" "),a("li",[a("code",[t._v("reset --hard")]),t._v(" 才是直接回退到指定的这次提交，其表示重置到指定历史节点，会丢弃对应节点之后的所有更改，是截断操作。")])])]),t._v(" "),a("h3",{attrs:{id:"临时存储"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#临时存储"}},[t._v("#")]),t._v(" 临时存储")]),t._v(" "),a("p",[t._v("将当前工作区的有用但暂时又不想提交的内容临时存储起来，后续在需要的时候再恢复这些内容（恢复到当前所在分支工作区）。")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 临时存储工作区更改内容（包括以暂存和未暂存的更改）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 可选自定义描述信息（save），可选是否包括未跟踪文件（-u，默认不包括，即新增且从未 add 暂存过的文件）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-u"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("save "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看所有已存储列表（非文件列表，而是存储记录列表）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash list\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 恢复存储的更改（同时会删除对应存储记录），默认为最近一次的存储，可选指定存储记录（<n>为对应记录索引值）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash pop "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 恢复存储的更改但不删除对应存储记录")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash apply "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除对应存储记录")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash drop "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("stash@"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除所有存储记录")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),t._v("\n")])])]),a("p",[t._v("存储记录列表"),a("code",[t._v("stash list")]),t._v("输出形式如下：")]),t._v(" "),a("div",{staticClass:"language-less extra-class"},[a("pre",{pre:!0,attrs:{class:"language-less"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v("stash@{0}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" message0\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("stash@{1}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" message1\n")])])]),a("h3",{attrs:{id:"其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看文件修改差异")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v("\n")])])]),a("h2",{attrs:{id:"提交日志格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交日志格式"}},[t._v("#")]),t._v(" 提交日志格式")]),t._v(" "),a("h3",{attrs:{id:"基本的-message-格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本的-message-格式"}},[t._v("#")]),t._v(" 基本的 message 格式")]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("[scope]: "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("subject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("其中 "),a("code",[t._v("type")]),t._v(" 表示当前改动类型，可选的 "),a("code",[t._v("scope")]),t._v(" 表示当前改动范围，"),a("code",[t._v("subject")]),t._v(" 表示当前改动内容的概括，"),a("strong",[t._v("message 整体内容不应超过 50 个字符")]),t._v("，例如：")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("fix query查询页：表格tooltip被遮挡\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("原则上每个可独立解决的改动都应该单独提交，除非是一次性新增的大量新内容，否则不应该将所有改动合并到一起提交，这会难以记录提交信息和追踪问题。")])]),t._v(" "),a("h3",{attrs:{id:"message-字段说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#message-字段说明"}},[t._v("#")]),t._v(" message 字段说明")]),t._v(" "),a("h4",{attrs:{id:"type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type"}},[t._v("#")]),t._v(" type")]),t._v(" "),a("p",[a("code",[t._v("type")]),t._v(" 用来描述本次提交的改动类型，可选值及对应含义如下：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("feat")]),t._v(" 新增功能")]),t._v(" "),a("li",[a("code",[t._v("fix")]),t._v(" 修复 bug")]),t._v(" "),a("li",[a("code",[t._v("docs")]),t._v(" 文档相关的改动")]),t._v(" "),a("li",[a("code",[t._v("style")]),t._v(" 对代码的格式化改动(注意不是指 CSS 样式)，代码逻辑并未产生任何变化\n"),a("ul",[a("li",[t._v("如：代码缩进、换行、分号的移除和添加")])])]),t._v(" "),a("li",[a("code",[t._v("refactor")]),t._v(" 重构代码或其他优化举措，注意不是新增功能或修复 bug")]),t._v(" "),a("li",[a("code",[t._v("test")]),t._v(" 新增或修改测试用例")]),t._v(" "),a("li",[a("code",[t._v("chore")]),t._v(" 项目工程方面的改动，代码逻辑并未产生任何变化\n"),a("ul",[a("li",[t._v("如：脚手架配置、辅助开发工具配置")])])]),t._v(" "),a("li",[a("code",[t._v("revert")]),t._v(" 回退到之前的提交")])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("css 样式文件的修改一般属于 feat 或者 fix，并不是 style")])]),t._v(" "),a("h4",{attrs:{id:"scope"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scope"}},[t._v("#")]),t._v(" scope")]),t._v(" "),a("p",[a("code",[t._v("scope")]),t._v(" 用来描述本次提交所涉及到的改动范围（例如模块、功能或其他任何限定的范围）。")]),t._v(" "),a("p",[a("code",[t._v("scope")]),t._v(" 的具体取值视项目而定，以管理系统框架视图为例，取值可以是：框架侧边菜单、框架顶部导航栏、框架标签栏等。")]),t._v(" "),a("h4",{attrs:{id:"subject"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#subject"}},[t._v("#")]),t._v(" subject")]),t._v(" "),a("p",[a("code",[t._v("subject")]),t._v(" 用来概括和描述本次提交的改动内容，需注意以下几点：")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("时态方面使用一般现在时，不要使用过去时。虽然查看 message 时，message 内容本身都发生在过去，然而对于主题来说，使用现在时的时态更简洁明确，并且更易达成一致性：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// ❌\ndocs: deleted redundant docs\n\n// ✅\ndocs: delete redundant docs\n")])])])]),t._v(" "),a("li",[a("p",[t._v("句式使用祈使句。即一般情况不要增加主语，因为在绝大情况下，主语都是作者「我」：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// ❌\ndocs: i delete redundant docs\n\n// ✅\ndocs: delete redundant docs\n")])])])]),t._v(" "),a("li",[a("p",[t._v("句首无需大写，句尾无需结束标点。因为主题（或标题）本身不用形成完整的句子：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// ❌\ndocs: Delete redundant docs.\n\n// ✅\ndocs: delete redundant docs\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"命名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命名"}},[t._v("#")]),t._v(" 命名")]),t._v(" "),a("p",[t._v("分支命名不能有中文和空格，可以包含英文字母、数字、下划线"),a("code",[t._v("_")]),t._v("、中划线"),a("code",[t._v("-")]),t._v("、句点"),a("code",[t._v(".")]),t._v("，但不要以下划线和中划线以及句点开头或结尾。")]),t._v(" "),a("h3",{attrs:{id:"分支命名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分支命名"}},[t._v("#")]),t._v(" 分支命名")]),t._v(" "),a("p",[t._v("新建分支（临时分支）的命名格式为："),a("code",[t._v("{type}-{id}-the-thing-you-do")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("type")]),t._v("：同上文 "),a("a",{attrs:{href:"#%E5%9F%BA%E6%9C%AC%E7%9A%84-message-%E6%A0%BC%E5%BC%8F"}},[t._v("基本的 message 格式")]),t._v(" 中的 "),a("code",[t._v("type")]),t._v(" 保持一致")]),t._v(" "),a("li",[a("code",[t._v("id")]),t._v("：与分支内容相关的 id，比如 issue id、模块 id，该 id 应是一个简短的字符，"),a("strong",[t._v("如果无关或没有，则可以忽略")]),t._v(" "),a("ul",[a("li",[t._v("该 id 可以是纯数字，也可以是字母数字的组合等，按项目实际情况来即可")])])]),t._v(" "),a("li",[a("code",[t._v("the-thing-you-do")]),t._v("：表示对应改动的简单描述，不应过长")])]),t._v(" "),a("p",[t._v("比如以下格式都满足规范：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("feat-ssr-prefetch")]),t._v("：表示新增 ssr prefetch 功能")]),t._v(" "),a("li",[a("code",[t._v("fix-6670-component-insert-order")]),t._v("：表示修复 6670 模块中组件插入顺序 bug")]),t._v(" "),a("li",[a("code",[t._v("revert-6600-error-report-dialog")]),t._v("：表示回退版本解决 6600 模块中错误上报弹窗异常问题")])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("该命名规约只针对项目迭代过程中新建的临时分支，不包括如 master、develop、release 等常驻分支。")])]),t._v(" "),a("h3",{attrs:{id:"多版本分支命名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多版本分支命名"}},[t._v("#")]),t._v(" 多版本分支命名")]),t._v(" "),a("p",[t._v("在需要同时维护多个版本的项目中，只使用 master 作为主干分支显然是无法满足需求的，但是又不想使用 Git Flow 这种复杂、繁琐的分支结构，那么就可以每发布一个新的版本就单独拉一个新的分支，例如：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("v1.0.0-stable")])]),t._v(" "),a("li",[a("code",[t._v("v2.0.0-stable")])])]),t._v(" "),a("h3",{attrs:{id:"tag-命名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tag-命名"}},[t._v("#")]),t._v(" tag 命名")]),t._v(" "),a("p",[t._v("Git tag 就是通过语义化的名称来给仓库标注一个个具体的节点。与此同时还可以根据标签名称来大致了解当前项目的兼容性和迭代情况。")]),t._v(" "),a("p",[t._v("命名格式为 "),a("code",[t._v("v{semver}")]),t._v("，"),a("code",[t._v("semver")]),t._v(" 是遵循 "),a("a",{attrs:{href:"https://semver.org/lang/zh-CN/",target:"_blank",rel:"noopener noreferrer"}},[t._v("semantic version"),a("OutboundLink")],1),t._v(" 的版本号，例如 "),a("code",[t._v("v1.2.3")]),t._v("。")]),t._v(" "),a("p",[t._v("相比于使用例如 "),a("code",[t._v("git tag v1.2.3")]),t._v(" 这种「轻量标签」，更推荐使用如下命令生成「附注标签」：")]),t._v(" "),a("p",[a("code",[t._v('git tag -a v1.2.3 -m "发布权限管理模块"')])])])}),[],!1,null,null,null);s.default=n.exports}}]);