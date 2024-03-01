import{u as _,b as m,s as h,r as P,o as $,c as R,a as s,d as t,e as p,t as d,f as x}from"./index-2a8237f8.js";const y={class:"pinia"},j=x('<h2><a target="_blank" href="../src/stores/index.js">全局状态管理：Pinia</a></h2><p>通过 Pinia 的 <code>createPinia</code> API创建一个 pinia 根实例：<code>const pinia = createPinia();</code></p><p>通过 <code>app.use(pinia)</code> 安装 Pinia 库(pinia根实例包含一个install安装函数)， <span class="color-orange">此过程中Pinia内部会在应用app中注入该pinia实例，后续组件中useStore时会自动获取pinia根实例来共享，而如果是在组件外(SSR服务端渲染时)useStore因无法自动获取应用app就需要useStore时手动传入</span></p><p><code>Pinia</code> 中有三个概念，<code>state</code>、<code>getters</code> 和 <code>actions</code>（不再有<span class="color-orange">mutation</span>，都合并到了 actions），这些概念类似于vue2组件中的 <code>data</code>、<code>computed</code> 和 <code>methods</code></p><p>pinia 提供<span class="color-orange">两种方式来定义全局状态</span>：<br> 一种是定义时传入配置对象通过选项式编写；<br> 一种是传入函数以类似setup(){}中的方式通过组合式编写； </p><p><code>defineStore()</code> 方法用于定义Store，其接受两个参数：<br> 参数1为一个全局唯一的字符串ID，可看作是一个模块名；<br> 参数2可接受两类值：Setup函数或Option对象；<br> 对接收其返回值的变量命名可以任意，但是一般约定按 <code>useXxxStore</code> 的格式，即以`use`开头，`Store`结尾，直观表达其是状态管理用途 </p><p class="color-red">在使用定义的store时与vuex不同，虽然在入口文件中应用实例安装绑定了pinia插件，但其与实际定义的store是分离的，不像vuex那样是直接全局挂载到应用app实例上的， 因此需要每个使用的地方都手动导入并实例化(同一store定义可以看做是单例模式，实际不会创建多个不同的实例)，这样可以使得没有使用的store不会打包进生产中（摇树优化） </p><p> store实例化后返回的是一个用reactive包装过的状态对象，定义时的相关state、getters、actions等将作为直接子属性放在该状态对象中，可直接访问（没有state、getters、actions这一层）， 因为是reactive包装的故<span class="color-orange">不能直接解构该状态对象</span>，否则原响应式状态（包括state和getters，及通过插件添加的其他响应式属性）会失去响应性， 但是<span class="color-orange">actions相关函数方法可以解构</span>，因其本身没有响应性，有响应性的是其内部使用到的响应式状态，<span class="color-orange">要使响应式状态解构够仍然保持响应性就需要用到Pinia的`storeToRefs()`或vue的`toRefs()`</span></p><p> Pinia的 <code>storeToRefs(store)</code> 会将传入的store实例中的响应式状态都转换为普通的独立的响应式 ref，这样就可以直接解构而不会破坏响应性，包括通过插件添加的响应式属性也会转换， 并且其会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性（返回的对象直接不会包含这些属性，而不是说保持原样返回，故解构是获取不到这部分内容的） </p><p> vue的 <code>toRefs(reactiveObj)</code> 会将传入的响应式对象reactiveObj转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref，也即是每个属性都是一个ref，因此解构后仍可以保持响应性， 该转换也作用于通过插件添加的响应式属性(注意是之前添加的，而不是转换后添加的)，且其不会跳过actions相关函数，所以可以一同解构，不用像 storeToRefs 下不包含actions，还需要单独从源对象中解构actions </p>',10),k=s("span",null,"直接通过实例对象使用：",-1),I=["value"],O=s("span",null,"解构使用：",-1),T=["value"],C=["src"];//! 注意不能直接对返回的对象进行解构其中的响应性状态，因其是由 reactive 包装的，直接解构将破坏其内容的响应性，可以通过提供的响应性转换API`storeToRefs()`或vue的`toRefs()`处理后再解构以仍然保持响应性
//! 但是可以直接解构其中的 action（即相关method，不包括getter），因为其是函数方法且内部用到的状态有绑定，因此不会涉及响应性破坏
const U={__name:"PiniaPage",setup(L){const a=_();console.log("一个pinia Store实例：",a);//! 通过`storeToRefs()`API将状态实例下的响应式状态都转换为普通的独立的响应式 ref，这样就可以直接解构而不会破坏响应性
const r=m(),{count:u,double:g}=h(r),{increment:l,getSth:f}=r;a.$subscribe((e,o)=>{console.log("store mutation.type：",e.type),console.log("store mutation.storeId：",e.storeId),console.log("store mutation.payload：",e.payload),console.log("组件内订阅全局状态的变化：",o)},{detached:!1}),a.$onAction(({name:e,store:o,args:c,after:S,onError:b})=>{console.log(`Start "${e}" action in "${o.$id}" store with params [${c.join(", ")}].`),S(i=>{console.log(`"${e}" action in "${o.$id}" store 运行完成并成功返回结果：`,i)}),b(i=>{console.log(`"${e}" action in "${o.$id}" store 抛出错误或reject：`,i)})},!1);const n=P();async function v(){if(n.value)n.value=URL.revokeObjectURL(n.value);else{const e=await f();n.value=URL.createObjectURL(e)}}return(e,o)=>($(),R("div",y,[j,s("div",null,[k,s("input",{type:"text",value:t(a).count,disabled:""},null,8,I),p(" * 2 = "+d(t(a).double)+" ",1),s("button",{onClick:o[0]||(o[0]=(...c)=>t(a).increment&&t(a).increment(...c)),class:"mgl-5"},"+1")]),s("div",null,[O,s("input",{type:"text",value:t(u),disabled:""},null,8,T),p(" * 2 = "+d(t(g))+" ",1),s("button",{onClick:o[1]||(o[1]=(...c)=>t(l)&&t(l)(...c)),class:"mgl-5"},"+1"),s("img",{src:t(n),alt:"点我加载与取消",onClick:v},null,8,C)])]))}};export{U as default};
