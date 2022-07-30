(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{437:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"第8章-创建-加载高级网格和几何体"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第8章-创建-加载高级网格和几何体"}},[t._v("#")]),t._v(" 第8章 创建/加载高级网格和几何体")]),t._v(" "),a("p",[t._v("目录\n")]),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#_8-1-几何体的组合与合并"}},[t._v("8.1 几何体的组合与合并")]),a("ul",[a("li",[a("a",{attrs:{href:"#_8-1-1-对象组合"}},[t._v("8.1.1 对象组合")])]),a("li",[a("a",{attrs:{href:"#_8-1-2-将多个网格合并成一个网格"}},[t._v("8.1.2 将多个网格合并成一个网格")])])])]),a("li",[a("a",{attrs:{href:"#_8-2-从外部资源加载几何体"}},[t._v("8.2 从外部资源加载几何体")]),a("ul",[a("li",[a("a",{attrs:{href:"#_8-2-1-以three-js的json格式保存和加载"}},[t._v("8.2.1 以three.js的JSON格式保存和加载")])])])]),a("li",[a("a",{attrs:{href:"#_8-3-导入三维格式文件"}},[t._v("8.3 导入三维格式文件")])])])]),a("p"),t._v(" "),a("p",[t._v("通过three.js的组合函数(成组)和"),a("code",[t._v("THREE.Geometry.merge()")]),t._v("合并函数来组建/合并多个几何体，或从外部加载复杂几何体和网格。")]),t._v(" "),a("h2",{attrs:{id:"_8-1-几何体的组合与合并"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-1-几何体的组合与合并"}},[t._v("#")]),t._v(" 8.1 几何体的组合与合并")]),t._v(" "),a("h3",{attrs:{id:"_8-1-1-对象组合"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-1-1-对象组合"}},[t._v("#")]),t._v(" 8.1.1 对象组合")]),t._v(" "),a("p",[t._v("使用"),a("code",[t._v("THREE.Group")]),t._v("创建组对象，其与"),a("code",[t._v("THREE.Object3D")]),t._v("非常接近，唯一不同的是它本身不含有任何可渲染的数据(几何体/材质等)。使用"),a("code",[t._v("add()")]),t._v("方法往组中添加组成员，组内的每个对象的位置、缩放和旋转参数将都是相对于所在组对象对应参数的，组内的每个对象仍然可以单独进行平移、缩放和旋转等操作，但对组进行相关操作时就是整个组相对该组的中心进行整体的平移、缩放和旋转等操作，而不是每个组成员独立进行(组成员间的状态不会相对改变)。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" group "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Group")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngroup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geomMesh1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngroup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geomMesh2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nscene"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("group"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"_8-1-2-将多个网格合并成一个网格"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-1-2-将多个网格合并成一个网格"}},[t._v("#")]),t._v(" 8.1.2 将多个网格合并成一个网格")]),t._v(" "),a("p",[t._v("使用组时，每个对象仍是独立的，仍需要对他们分别进行处理和渲染，当对象数量非常多时仍会出现性能瓶颈。通过"),a("code",[t._v("THREE.Geometry.merge()")]),t._v("方法，可以将多个几何体合并成一个联合体，此时就变成了一个对象，当然也就不能对原先的各几何体分别进行操作了，也不能像原来为每个几何体添加材质，因为现在就是整体一个几何体。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" geom "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Geometry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" geomMtl "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MeshNormalMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  transparent"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  opacity"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设geomMesh1、geomMesh2...是已知的几何体网格")]),t._v("\ngeomMesh1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateMatrix")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 更新对象的变换矩阵，以确保能正确合并各子对象")]),t._v("\ngeom"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("merge")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geomMesh1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("geometry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" geomMesh1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("matrix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngeomMesh2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateMatrix")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngeom"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("merge")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geomMesh2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("geometry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" geomMesh2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("matrix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nscene"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mesh")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geom"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" geomMtl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"_8-2-从外部资源加载几何体"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-2-从外部资源加载几何体"}},[t._v("#")]),t._v(" 8.2 从外部资源加载几何体")]),t._v(" "),a("h3",{attrs:{id:"_8-2-1-以three-js的json格式保存和加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-2-1-以three-js的json格式保存和加载"}},[t._v("#")]),t._v(" 8.2.1 以three.js的JSON格式保存和加载")]),t._v(" "),a("p",[a("strong",[t._v("1、保存和加载"),a("code",[t._v("THREE.Mesh")]),t._v("网格对象(即单个物体)")])]),t._v(" "),a("p",[t._v("直接调用网格对象的"),a("code",[t._v("toJSON()")]),t._v("方法即可返回该网格对象的json格式数据，使用"),a("code",[t._v("THREE.ObjectLoader.parse()")]),t._v("可将一个json格式的网格数据加载解析为网格对象，也可以使用"),a("code",[t._v("THREE.ObjectLoader.load(url)")]),t._v("直接加载解析一个独立的json文件得到网格对象。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" geom "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("BoxGeometry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mtl "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MeshNormalMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mesh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mesh")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geom"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mtl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导出网格对象的JSON数据")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mesh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toJSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导出的json数据是对象形式，需要转为字符串形式才能便于存储")]),t._v("\nlocalStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'meshJson'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 加载JSON格式的网格数据")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" loader "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ObjectLoader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mesh2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" loader"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("jsonResult"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 若json数据是字符串形式则需要先用`JSON.parse()`转换为对象格式使用")]),t._v("\n")])])]),a("p",[a("strong",[t._v("2、保存和加载场景(即整个场景内容)")])]),t._v(" "),a("p",[t._v("此处场景数据指的除了场景内所有网格对象物体外，还包括光源和摄像机。保存和加载场景数据的方法同上面单个物体一样，只是是在场景对象"),a("code",[t._v("scene")]),t._v("上调用"),a("code",[t._v("toJSON()")]),t._v("方法而已。")]),t._v(" "),a("h2",{attrs:{id:"_8-3-导入三维格式文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-3-导入三维格式文件"}},[t._v("#")]),t._v(" 8.3 导入三维格式文件")]),t._v(" "),a("p",[t._v("对象中若使用了"),a("code",[t._v("THREE.MeshLambertMaterial")]),t._v("等材质，还需要调用"),a("code",[t._v("geom.computeVertexNormals")]),t._v("和"),a("code",[t._v("geom.computeFaceNormals")]),t._v("方法以确保正确渲染材质。")])])}),[],!1,null,null,null);s.default=e.exports}}]);