/**===================================================================================================================*/
/**=============================================== 导出Store实例的js文件 ===============================================*/
/**===================================================================================================================*/
import Vue from 'vue';
import Vuex from 'Vuex';
import moduleC from './moduleC'
import Sync from "vuex-router-sync";
import {router} from '../plugin/router';

Vue.use(Vuex);      //在vue中安装vuex插件

const store = new Vuex.Store({  //将该store实例注册到vue根实例中，其就将应用到其下所有子组件中，且在子组件中可通过this.$store访问到
  /** 类似于组件中的data数据，可以通过store.state来获取这里的状态对象，state中的数据不能直接修改，只能显式提交(commit)mutation来改变(即触发mutations中的方法) */
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'sth1', done: true },
      { id: 2, text: 'sth2', done: false }
    ]
  },
  /** 类似于组件中的computed计算属性，其值依赖于state的变化，将state作某些处理后返回数据，有公有数据处理函数的作用，其函数接受state作为第一个参数，也可接受其他getter作为第二个参数(访问getter对象下的其他属性) */
  getters: {      //与state一样，也可通过store.getters访问这里面的属性
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)    //对state中的todos数据进行过滤
    },
    getTodoById: (state) => (id) => {   //通过让 getter 返回一个函数，来实现给 getter 传参，像在对 store 里的数组进行查询时非常有用(如传递一个id进行查询)
      return state.todos.find(todo => todo.id === id)
    }
  },
  /** 类似于组件中的methods事件方法，commit方式提交某个方法就类似trigger方式触发一个事件引起回调，须注意 mutation 必须是同步函数，不能存在异步操作(如setTimeout) */
  mutations: {
    increase(state){    //通过store.commit('increase')的方式触发state改变，其函数接受state作为第一个参数，该参数是默认参数，提交时并不传入
      state.count++
    },
    subtract(state,n){  //state之后的参数才是载荷，即额外参数，提交时传参是直接从第二个开始的，如：store.commit('subtract', 10)，一般都以对象的形式传入，而不分散，这样逻辑更加清晰
      typeof n === 'undefined' ? n = 1 : n;   //这里若不传则默认n为1
      state.count -= n
    },
    subtract2(state,obj){  //以包含type属性的对象风格提交mutation，如：store.commit({type: 'subtract', n: 10})，type属性为对应的方法，其他属性为要用到的数据，这种方式会直接将这个对象作为第二个参数，若处理函数第二个参数就是对象那就不需要修改
      state.count -= obj.n
    }
  },
  /** actions与上面的mutations类似，都相当于methods事件方法，但action主要是解决异步处理的问题，特意与mutations分开，一个同步处理，一个异步处理，action中去提交mutation，而不是直接变更状态state
   * action通过 store.dispatch('xxx') 方式触发，而不是commit，且其支持与mutation相同的传参和对象风格触发，store.dispatch({type: 'subtractAction2', n: 10}) */
  actions: {
    increaseAction(context){    //action接受一个与 store 实例具有相同方法和属性的 context 上下文对象作为第一个参数，虽然具有相同方法和属性，但是context对象并不是store实例本身
      context.commit('increase')     //因具有store的所有方法和属性，所以可以使用context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters等
    },
    subtractAction({commit}){    //使用ES6中的参数解构简化代码，因为默认第一个参数为context，这种方式解构后commit与context.commit作用一样
      commit('increase')
    },
    subtractAction2({commit},obj){
      setTimeout(()=>{commit('subtract',obj)},1000);
      commit({
        type: 'subtract2',
        n: obj.n
      })
    },
    actionA ({ commit }) {      //store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
      return new Promise((resolve, reject) => {       //这样就可以 store.dispatch('actionA').then(() => { ... }) 链式调用
        setTimeout(() => {
          commit('increase');
          resolve()
        }, 1000)
      })
    },
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => {     //还可以再另一个action中使用其他action返回的Promise
        commit('subtract')
      })
    }
  },
  /** 将一个store分割成多个模块，以免应用比较复杂时 store对象就变得相当臃肿，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块，模块一般像vue组件一样单独写在一个js中给其他文件引用 */
  modules:{
    moduleA: {
      state: {                /** store.state.moduleA */ //模块中的状态为局部状态，store.state.moduleA 表示模块中的局部状态，注意顺序，模块名放在后面，与结构不是一样的顺序
      count: 0,
        todos: [
          { id: 1, text: 'sth1', done: true },
          { id: 2, text: 'sth2', done: false }
        ]
      },
      getters: {              //模块中的getter，接收的第一个参数是模块上面的局部状态对象state，而根节点状态rootState会作为第三个参数暴露出来
        doneTodos: (state,getters,rootState) => {           /**（局部状态，局部getters，根节点状态）*/
        console.log(state,getters,rootState);
        },
      },
      mutations: {            //模块中的mutation，接收的第一个参数是模块上面的局部状态对象state
        increase(state){
          state.count += 2
        }
      },
      actions: {
        increaseAction(context){    //同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
          context.commit('increase')
        }
      }
    },
    /** 模块命名空间，详细见官方文档：https://vuex.vuejs.org/zh/guide/modules.html#命名空间 */
    moduleB: {                  //默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的，这样使得多个模块能够对同一 mutation 或 action 作出响应
      namespace: true,        //启用 namespaced: true 属性后将使该模块成为带命名空间的模块，此后它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名，如下：
      // 模块内容（module assets），模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      state(){    /** 若某个模块可能要被多个store实例使用，或是一个store实例多次注册同一模块，那么与vue组价中data一样，state要使用函数返回一个对象的形式来处理，否则state对象将是同一个对象被多次引用指示模块间错乱 */
        return {}
      },
      getters: {
        isAdmin(state,getters,rootState,rootGetters) {  } // -> getters['account/isAdmin']，全局state和getters将作为第三和第四个参数传入getter
      },
      mutations: {
        login() {  } // -> commit('account/login')
      },
      actions: {
        login({ dispatch, commit, getters, rootGetters }) {        // -> dispatch('account/login')，context中的rootGetters属性访问全局getters
          dispatch('someOtherAction', null, { root: true }); //若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可
          commit('someMutation', null, { root: true })
        },
        globalAction: {   //若需要在带命名空间的模块注册全局 action，可用对象形式添加 root: true，并将这个 action 的定义放在函数 handler 中
          root: true,
          handler (namespacedContext, payload) {  }
        }
      },
      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () {  } // -> getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () {  } // -> getters['account/posts/popular']
          }
        }
      }
    },
    moduleC
  }
});

export default store

/** 模块动态注册 */
//在store实例创建之后，可以使用 store.registerModule 方法动态注册模块，使用 store.unregisterModule('moduleName') 来卸载动态注册的模块
// 注册模块 `myModule`
store.registerModule('myModule', {      //之后将可以通过 store.state.myModule 访问该模块的状态
  // module code...
});
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {      //之后将可以通过 store.state.nested.myModule 访问该模块的状态
  // module code...
});
// 若在注册新模块时想保留过去的state，可在第三个参数中启用 preserveState 选项
store.registerModule('myModule', {...}, { preserveState: true });
/** 使用 store.unregisterModule('moduleName') 来动态卸载模块。注意，不能使用此方法卸载静态模块（即创建 store 时声明的模块）*/

//这里就是使用vuex-router-sync插件动态注册的路由模块(就是将当前route的信息注册到vuex的state中)
Sync.sync(store, router, {
  moduleName: 'routerModule'      //这里第三个参数为可选参数，该选项为自定义的路由模块名，默认为“route”
});


/**====================================================================================================================*/
/**=============================================== 使用Store的组件vue文件 ===============================================*/
/**====================================================================================================================*/

/*将store实例注册到vue根实例中，其所有子组件就也能通过 this.$store 使用，这里假设已在根实例中注册store*/

/*script部分*/
/** 使用辅助函数 mapState、mapGetters、mapMutations、mapActions
 * 当使用这些辅助函数来绑定带命名空间的模块时，写起来可能比较繁琐，需要将每个命名空间全称写出来，故给出了简化方法(方式1、将空间名称字符串作为参数传入辅助函数；方式2、使用 createNamespacedHelpers 创建基于某个命名空间辅助函数)，
 * 详细参考官方文档中“带命名空间的绑定函数”部分：https://vuex.vuejs.org/zh/guide/modules.html#带命名空间的绑定函数
 * */
import { mapState, mapGetters, mapMutations, mapActions} from 'Vuex'

export default {
  computed: {
    localComputed(){
      //组件局部计算属性
    },
    localCount(){
      return this.$store.state.count    //在组件中读取store中的值最简单的方法就是在计算属性中返回某个状态，通过该计算属性使用对应状态，this.$store.state可访问到state对象
    },
    /**当一个组件要获取多个状态时，像上面那样一个一个写计算属性很麻烦，所以提供了辅助函数mapState帮我们生成计算属性，该方法返回一个对象，
     * 若不和组件局部计算属性混用，可以直接作为computed的方法调用>>computed: mapState(optObj)，
     * 当映射的计算属性的名称与 state 的属性名称相同时，我们也可以给 mapState 传一个字符串数组>>computed: mapState(['count'])  //// 映射 this.count 为 store.state.count
     * 但大多情况下都要和组件自身的局部计算属性混用，这时就要使用es6中的对象展开运算符“...”，其会将对象中的键值对展开到外部与其他键值对同级（相当于直接去掉最外面的花括号{}）
     * */
    ...mapState('moduleA',{     /** 第一个字符串参数为可选参数，表示指定的命名空间(即模块名，表示映射该模块下的内容，否则是全局下的内容) */
    // 箭头函数可使代码更简练(这里不使用this关键字的情况)，函数的参数为state状态对象(就是store实例中的state对象)
    count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数，因为箭头函数的this指向的是父级，我们想要的是该this指向该组件实例，所以只能使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    todoLength(){
      return this.$store.getters.doneTodos;     //通过 this.$store.getters 可访问到getter对象

    },
    getTodoById(){
      this.$store.getters.getTodoById(2)     //通过方法访问getter对象，还能传参筛选
    },
    /**与mapState一样，只是该辅助函数用于getters，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
     * 如果想将一个 getter 属性另取一个名字，可以使用对象形式传参：{ doneCount: 'doneTodos' }  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodos`
     * */
    ...mapGetters([
      'doneTodos',
      'getTodoById'
    ])
  },
  methods: {
    commitMutation(obj){
      this.$store.commit('increase',obj)  //在组件中通过 this.$store.commit('xxx') 的方式提交mutation，有参数时就传入参数
    },
    /**与mapState和mapGetters一样，只是该辅助函数用于mutations，mapMutations 辅助函数仅仅是将 store 中的 mutations 映射到局部事件方法中*/
    ...mapMutations([
      'increase', // 将 `this.increase()` 映射为 `this.$store.commit('increase')`

      // `mapMutations` 也支持载荷(传参)：
      'subtract' // 将 `this.subtract(n)` 映射为 `this.$store.commit('subtract', n)`
    ]),
    /*与mapGetters一样，如果想将一个 mutation 属性另取一个名字，可以使用对象形式传参*/
    ...mapMutations({
      add: 'increase' // 将 `this.add()` 映射为 `this.$store.commit('increase')`
    }),
    dispatchAction(obj){
      this.$store.dispatch('increaseAction',obj)  //在组件中通过 this.$store.dispatch('xxx') 的方式提交mutation，有参数时就传入参数
    },
    /**与mapMutations一样，只是该辅助函数用于actions，mapActions 辅助函数仅仅是将 store 中的 actions 映射到局部事件方法中*/
    ...mapActions([
      'increase', // 将 `this.increase()` 映射为 `this.$store.dispatch('increase')`

      // `mapActions` 也支持载荷：
      'subtract' // 将 `this.subtract(n)` 映射为 `this.$store.dispatch('subtract', n)`
    ]),
    /*与mapMutations一样，如果想将一个 action 属性另取一个名字，可以使用对象形式传参*/
    ...mapActions({
      add: 'increase' // 将 `this.add()` 映射为 `this.$store.dispatch('increase')`
    })
  }
}
