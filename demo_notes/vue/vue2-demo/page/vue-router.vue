<template>
    <div id="app">

        <!-- 使用 router-link 组件来导航. —>
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签，使用 tag 属性可以指定为其他标签(内部可加也可不加 a 标签)，不加 a 标签时其仍能监听标签点击触发导航 -->
        <router-link to="/foo">to Foo</router-link>     <!-- 等同 this.$router.push('/foo') -->
        <router-link to="/bar" replace>to Bar</router-link>     <!-- 等同 this.$router.replace('/bar') -->
        <router-link to="/home" tag="li">
            <a>to Home</a>      <!-- 里面的 a 标签会自动获得link上正确的 href，而激活时的css类名会设置到外层 li 上 -->
        </router-link>

        <!-- append 属性表示在当前路径后追加路径片段：以当前路径为基路径(即以当前路径的下一级为起始)，在其后追加 to 参数中的路径，而 push 方法就是以当前级为起始，两者相差一级 -->
        <!-- 如，假设当前路径为‘/home’，以下链接都将定位到‘/home/index’，以当前路径的子级为其实相对位置，注意若是以‘/’开头则直接是根路径下开始 -->
        <router-link to="index" append>to foo</router-link>
        <router-link to="./index" append>to foo</router-link>

        <!-- active-class 属性设置链接激活时(选中时，并不是点击时)使用的 CSS 类名，默认为"router-link-active"。默认值也可通过路由的构造选项 linkActiveClass 来全局配置 -->
        <router-link to="/foo" active-class="className">to foo</router-link>
        <!-- exact 属性设置是否为全匹配时(即该路径就是当前页面路径，而不只是当前路径匹配到的一条上级记录)才给该链接添加激活 CSS 类名，默认为false。因为一个路由可能匹配到多个记录 -->
        <router-link to="/foo" exact>to foo</router-link>   <!-- 只能当前路径为‘/foo’时才能被激活，而‘/foo/index’虽然也匹配到它了但不予添加激活类 -->
        <!-- exact-active-class 属性设置链接被精确匹配(可能匹配到多个路由记录，但最精确的只有一条)时应激活的 CSS 类名，默认为"router-link-exact-active"。默认值也可通过路由的构造选项 linkExactActiveClass 来全局配置 -->
        <router-link to="/foo" exact-active-class="className">to foo</router-link>

        <!-- event 属性设置可以触发该链接导航的事件，默认为‘click’，多个时可使用数组，如：event="['click','dblclick']" -->
        <router-link to="/foo" event="focus">to foo</router-link>



        <!-- 路由出口--视图组件 router-view  —>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
        <!-- 命名视图，若像上面这样没有设置名字则默认为 default -->
        <router-view name="personal"></router-view>
        <!-- 若一个组件中存在多个视图组件，则在配置路由视图组件设置中要使用 components 复数形式 -->

    </div>
</template>

<script>
  /**导航解析完整流程
   * 1、导航被触发
   * 2、在失活的组件里调用离开守卫 beforeRouteLeave
   * 3、调用全局的 beforeEach 前置守卫，即开始进入各导航处理流程前
   * 4、在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)
   * 5、在路由配置里调用 beforeEnter
   * 6、解析异步路由组件
   * 7、在被激活的组件里调用 beforeRouteEnter
   * 8、调用全局的 beforeResolve 解析守卫 (2.5+)
   * 9、导航被确认
   * 10、调用全局的 afterEach 钩子
   * 11、触发 DOM 更新
   * 12、调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为该回调函数的参数传入
   * */

  /**===============================================================================================================*/
  /**============================================== 路由定义等相关操作 ===============================================*/
  /**===============================================================================================================*/

  import Vue from "vue";
  import Router from "vue-router";
  import Home from "../view/home.vue";

  Vue.use(Router);     //在vue中安装该VueRouter插件，多次use同一插件其也只会被安装一次

  //传入构造选项创建router实例定义一个路由器，Router对象就是上面import进来时定义的名字，也可以自定义为其他名字，如VueRouter等
  //最后要 export 出该router
  const router = new Router({
    mode: 'history',    //可选，路由模式，默认为 hash 模式。history 模式使url更好看(没有#号)，但其需要后端配置支持，具体配置参看官网
    fallback: true,     //可选，浏览器不支持history模式时是否自动回退到hash模式，默认为true。可在服务端渲染应用中设为false，因为一个 hash 模式的URL并不支持服务端渲染
    base: '/',          //可选，应用的基路径(看作根路径)，默认为'/'。例如，如果整个单页应用服务在 /app/ 下，base 就应该设为 "/app/"
    /**routes属性配置所有路由匹配放在该数组中
     * 该数组中的每个配置对象的副本后面也将作为匹配到该路径的路径记录保存在路由对象下matched数组中，包括children中的配置对象，
     * 也就是说进入某个路由时匹配到的每条路由记录数据都是对这里的某个配置对象的拷贝
     * */
    routes: [
      {
        name: 'currentPathName',    //可选，该路径的名字，定义后可在路由方法中使用该name来表示下面的path
        path: '/foo',       //路径匹配
        component: Home,    //路径视图组件，可以是一个组件配置对象、组件构造器，也可以是在文件顶部从外部import进来的一个组件，还可以使用函数的形式返回import进的组件
        /**路由元信息
         * 主要存储该路由需要的特定信息，比如要求已登录、要求用户是会员等等，如果不是就给导向登录或者购买会员等页面
         * meta字 段的访问可以直接在组件中通过 this.$route.meta 访问当前路由的元信息，
         * 也可以遍历路由记录获取，而一个路由匹配到的所有路由记录都放在路由对象的 matched 属性数组中，所以这时需要遍历该数组的每条记录，检查记录中的meta字段
         * */
        meta: {
          ad: 'sth'
        }
      },
      /** 动态路由匹配 */
      {
          /*动态路径参数以冒号开头，像下面这样的匹配模式/user/foo 和 /user/bar 都将映射到相同的路由，foo和bar都将作为参数中的id属性传给当前路由，
           * 一个“路径参数”用冒号 : 标记，当匹配到一个路由时，参数值会被设置到 this.$route.params 中，可在每个组件中使用，
           * 如这里的id就可以通过 this.$route.params.id 在该路径下的组件中使用,
           * 一个路由中可设置多段路径参数，对应的值都会放到 $route.params 中，如：/user/:username/post/:post_id 匹配 /user/evan/post/123，
           * 这时对应上面路径的参数关系将是：$route.params --> { username: 'evan', post_id: 123 }
           * */
        path: '/user/:id',
//                path: '/user/:id*',  //这里占位符`:id`后的星号`*`表示匹配所有，否则若后面是`/`符号分隔的内容就会被拆开(并不想被拆开的情况下很有用)，如：/user/evan/list/detail --> $route.params.id==='evan/list/detail'
        component: () => import ('../view/esview/home/home.vue')
            /*当使用像上面这样的路由参数时，在两个导航路径间只是参数发生变化时，组件实例会被复用，而不是销毁重新创建一个，
             * 例如使用上面的路由定义从 /user/foo 导航到 /user/bar，使用的都是home.vue这个组件，两个导航地址切换只是参数变化了，
             * 页面视图组件是复用的，这意味着home.vue这个组件在这个两个地址中是同一个实例，从而导航切换后该组件之前已被调用过的生命周期钩子不会再被调用，
             * 因为同一个实例一个周期内的生命周期钩子只会被调用一次，实例未被销毁和重新实例化就不会进入下一个周期，
             * 但是参数变化了，我们肯定有需求要根据参数作相应的界面元素逻辑处理，这时我们就可以使用：
             * 1、watch侦听 $route 对象来作相应
             * 2、使用 beforeRouteUpdate 路由更新前的钩子进行导航守卫*/
      },
      /**路由及视图嵌套，使用 children 属性
       * 多个同级路由视图，使用 components 属性 */
      {
        path: '/user/:id',
        component: User,
        //children配置与最外层routes属性的配置数组一样，所以还可以进行更深的嵌套
        children: [
          {
            // 当 /user/:id 匹配成功，
            // UserHome 会被渲染在 User 的 <router-view> 中
            /**这里加一个空路由的目的是：
             * 不定义这个空路由时默认像访问 /user/foo 这样的路径时，User的出口是不会渲染任何东西的，因为该路径没有匹配到合适的子路由，没有一个完整的视图映射就不会显示，
             * 定义了空路由就能在没有子路径的情况下也能访问到一个视图，当然这是在有这个需求下才这么做，若没有字路径本就没什么视图要显示当然就不需要定义这个空路由
             * */
            path: '',
            component: UserHome
          },
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'profile',     //children中的路由path是相对其父级路由下的
            component: UserProfile,
            meta: {
              requiresAuth: true    //这里用一个属性表示要求进入该页面时用户已登录
            }
          },
          {
            // 当 /user/:id/setting 匹配成功
            path: 'setting',
            components: {                   // 这里 User 组件中嵌着两个视图组件 router-view，使用复数
              default: UserSetting,       // UserSetting 会被渲染在 User 的 <router-view> 中
              personal: PersonalSetting   // PersonalSetting 会被渲染在 User 的 <router-view name="personal"> 中
            }
          }
        ]
      },
      /** 重定向，注意：导航守卫拦截总是应用在跳转的最终目标路由上，并非一定是path属性指定的路由，像设置了redirect时就不再是path，这时path中指向的组件中的守卫不会有任何效果 */
      {
        path: '/a',         //目标路由
        redirect: '/b'     //重定向目标，将“/a”重定向到“/b”
      },
      {
        path: '/a',
        redirect: { name: 'foo' }    //重定向目标也可以是一个命名路由
      },
      {
        path: '/a',
        redirect: to => {   //也可以是返回一个路径字符串或路径对象的方法
          //方法接受“目标路由作为参数”，即前面的path指向的路由对象(不是path属性的字符串值，而是一个route对象)
          //return一个表示路径的字符串或对象
        }},
      /** 别名 alias，匹配到别名路径时也都指向定义的实际path */
      {
        path: '/home', component: Home,
        children: [
          // absolute alias 绝对路径别名
          { path: 'foo', component: Foo, alias: '/foo' },
          // relative alias (alias to /home/bar-alias) 相对路径别名
          { path: 'bar', component: Bar, alias: 'bar-alias' },
          // multiple aliases 多个别名
          { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] }
        ]
      },
      /** 路由组件传参
       * 在组件中使用 $route 对象会使该组件与其对应的路由形成高度耦合，使得该组件只能在某些特定URL下使用，失去了灵活性，
       * 为将 $route 与组件解耦，可使用组件的 props 属性来接受路由传参，就不用通过$route去获得路由传递的参数，
       * 使用 props 接受路由参数也可使得该组件在任何位置都可以使用，不一定非要作为某个路由视图使用(直接在组件上传参时就可以像普通组件一样使用)，
       * 路由配置中，props 属性的值有三种不同用处的模式：布尔值、对象、函数
       * */
      {
        path: '/home', component: Home,
        children: [
          { path: '/user/:id', component: User, props: true },
          { path: '/user/:id*', component: User, props: true },   //这里占位符`:id`后面的星号`*`表示匹配所有，否则若后面是`/`符号分隔的内容就会被拆开(并不想被拆开的情况下很有用)
          {   // 对于包含命名视图的路由，必须分别为每个命名视图添加 `props` 选项：
            path: '/user/:id',
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: false }
          },
          {   /**布尔模式*/
          path: '/user/:id', components:  Sidebar,
            props: true     //若 props 设置为true，那么 route.params 中的数据都会被合并到组件的传入属性中(即合并到组件的props中去)
          },
          {   /**对象模式*/
          path: '/promotion/newsletter', component: Promotion,
            props: { newsletterPopup: false }     //若 props 是一个对象，那么它会被原样合并到组件的props中去，当props是静态的时候有用
          },
          {   /**函数模式*/
          path: '/search', components:  SearchUser,
            props: (route) => ({ query: route.query.q })     //若 props 是一个函数，那么可以自定义逻辑及返回数据的形式，便于将静态值与基于路由的值结合等
            //接受参数route为当前页面路由对象，这里 URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件
          }
        ]
      },
      /**导航守卫
       * 这里为路由独享的守卫，放在对应路由配置下
       * */
      {
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
          // 参数同全局前置守卫
        }
      }
    ]
  });

  /**导航守卫
   * 包括：全局守卫、单个路由独享的守卫、组件级守卫
   * 注意：1、参数或查询的改变并不会触发进入/离开的导航守卫，可以通过侦听 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫
   *      2、下面的全局守卫和钩子不像路由独享守卫直接放在路由实例化时的配置项中，而是通过路由实例进行调用配置，所以可以在入口文件main.js中导入的router实例上绑定全局守卫
   * */
  /*全局守卫与路由实例放在一个位置，组件级守卫放在组件中
   * 这里是全局守卫
   * */
  /** 全局前置守卫 router.beforeEach */
  router.beforeEach((to, from, next) => {
      //! 在 VueRouter4+ 版本中第三个参数 next 是可选的，若要使用则用法不变，若不使用 next，则该导航守卫是通过钩子返回值确定是否重定向（实际就是将原来传给next()的参数直接用于钩子return了），
      //! 返回false则取消当前导航，若不返回或返回undefined或true则表示继续导航，若返回一个新的路径字符串或路径对象，则表示是重定向到对应路由
      /*参数
       * to：   导航即将进入的路由对象
       * from： 导航正要离开的路由对象
       * next： 函数，一定要在最后调用 next() 表示逻辑处理完成可以进行下一步，否则将不会响应后续守卫钩子(包括后面的逻辑跳转等一系列处理)，
       *        该方法执行效果依赖调用的传去的参数：
       *        1、next()：进行管道中下一个守卫钩子，若全部钩子执行完了，则导航状态就是confirmed (确认的)
       *        2、next(false): 中断当前的导航。若浏览器的 URL 改变 (可能是用户手动或浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
       *        3、next('/') 或 next({ path: '/' }): 跳转到一个不同的地址。当前导航被中断，然后进行一个新的导航。可以向 next 传递任意位置对象(router-link 的 to prop 或 router.push 中的选项都可以)
       *        4、next(error): 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
       * */
    // 检测路由元信息，对要求登录的页面必须先登录，否则重新导航到登录页面
    // 若只是访问当前路由的元信息，可以通过路由对象(currentRoute或$route等)直接获取meta属性
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!auth.loggedIn()) {     //这里 auth.loggedIn() 方法假设是一个检测用户登录与否的方法
        next({
          path: '/login',
          query: { redirect: to.fullPath }    //这里传入查询参数 redirect 的目的是方便后面用户登陆后我们再直接将其导航到原本想打开的页面
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  });
  /** 全局解析守卫 router.beforeResolve */
  router.beforeResolve((to, from, next) => {
    //作用与beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
  });
  /** 全局后置钩子 router.afterEach */
  router.afterEach((to, from) => {
    //这里钩子和守卫不同的，这个钩子不会接受 next 函数也不会改变导航本身，只是在每个导航确认后调用
  });

  /** 除上面的全局导航守卫外，还有一些其他的路由实例上的属性和方法，实例上的方法和属性在组件中通过 this.$router 都能访问到，例如： */
  router.addRoutes(routesArr);    //动态添加更多的路由规则。参数routesArr必须是一个符合上面 routes 选项要求的数组


  export {router};    //导出路由模块


  /**===============================================================================================================*/
  /**======================================= 路由注册及使用等操作 ====================================================*/
  /**===============================================================================================================*/

  /**路由器注册
   * 上面的Router实例最后要注入到Vue根实例配置项router属性下(一般router配置会单独存在一个js文件中)
   * 注入路由器后，可以在每个子组件中通过 this.$router 访问路由器，也可通过 this.$route 访问当前路由，注意是每个子组件都可以访问
   * */
  new Vue({
    el: '#app',
    router: router,  //这里的router值是从上面的router所在文件import进来的
  });

  /**===========================组件中使用路由===========================
   * 这里以一个组件配置对象来表示某个组件
   * */
  const User = {
    template: '<div>User组件，嵌套视图：<router-view></router-view></div>',
    watch: {
      //在侦听 $route 对象来响应路由参数的变化，这里是ES6写法
      '$route' (to, from) {
          /*参数
           * to：   导航到的当前路由对象
           * from： 跳转过来的上一个路由对象
           * */
      }
    },
    methods: {
      sthFn(){
        /**编程式导航
         * 注意：push、replace的路径参数是相对当前路由的，除非指定的路径是一个以“/”开头的绝对路径，
         * 该导航路径只能是当前域下的位置，不能是第三方网络绝对路径(因为不受管辖)，那样应使用 window.location 去跳转
         * */
        /** $router.push(...) */
          /*点击<router-link>时该push方法会在内部调用，所以点击 <router-link :to="..."> 等同于调用 router.push(...)，
           * 该方法会向 history 栈添加一个新的历史记录
           * push(locationPath, onComplete, onAbort)
           * locationPath：定位路径，可以是一个字符串路径，也可以是个描述地址的对象
           * onComplete：  可选，导航成功完成回调
           * onAbort：     可选，中断回调
           *
           * locationPath为对象形式时：
           * push({path, name, params, query})
           * path:     路径
           * name:     名字
           * params:   路径参数，不可与path共用
           * query:    查询参数
           * */
        this.$router.push('home');    //将路由定位到‘/home’
        this.$router.push({ path: 'register'});    //将路由定位到‘/register’
        this.$router.push({ path: 'register', query: { plan: 'private' }});    //带查询参数，定位到‘/register?plan=private’
        this.$router.push({ name: 'user', params: { userId: 123 }});    //命名路由，带参数，该参数不会像查询参数放在地址栏，等同于“<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>”，定位到‘/user/123’
        //错误用法：this.$router.push({ path: 'user', params: { userId: 123 }});    //path与params两个属性不能共用，params将不会生效
        this.$router.push({ path: `/user/${userId}`});    //使用path又带有参数的写法，因为要使用变量这里使用量字符串模板语法，路由将可以定位到‘/user/123’
        //以上push的参数规则也适用于 router-link 组件的 to 属性

        /** $router.replace(...) */
          /*replace()方法与push()方法参数和作用都一样，
           * 唯一的区别是：replace()方法不会向 history 添加新记录，而是替换掉当前的 history 记录，
           * 等同作用的组件使用方式：<router-link :to="..." replace>
           * */
        this.$router.replace('user');

        /** $router.go(n) */
          /*该 $router.go(n) 方法类似 window.history.go(n)，在历史记录中前进后退，
           * 参数 n 是一个整数，正值表示前进数，负值表示后退数
           * */
        this.$router.go(-1);        //返回上一页
        this.$router.back();        //返回上一页，同 go(-1)
        this.$router.forward();     //进入下一页，同 go(1)

        /**路由对象
         * 路由对象出现在多个地方：
         * 1、组件中 this.$route
         * 2、侦听'$route'回调、导航守卫回调、滚动行为回调，这些回调中的 to 和 from 参数
         * 3、router.match(location) 的返回值
         * 路由对象根据路由变化自行生成，不可手动修改，只能访问，这里以组件中为例说明路由对象包含的属性：
         * */
        console.log(
            this.$route.path,       //字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
            this.$route.params,     //对象，包含路由参数键值对(就是编程式导航中传入的params参数对象)，如果没有参数，就是一个空对象
            this.$route.query,      //对象，表示 URL 查询参数，如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象
            this.$route.hash,       //字符串，当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串
            this.$route.fullPath,   //字符串，完成解析后的 URL，包含查询参数和 hash 的完整路径
            this.$route.matched,    //数组，包含当前路由匹配到的所有嵌套路径片段的路由记录 ，路由记录就是 routes 配置数组中的配置对象副本 (包括 children 数组的)，
            //须注意使用该数组时不能有改变该数组的操作(若涉及数组改变可拷贝一个该数组的副本进行操作)，否则路由匹配记录改变将影响视图的正常显示
            this.$route.name,       //字符串，当前路由的名称，如果有的话
            this.$route.redirectedFrom,    //字符串，如果存在重定向，即为重定向来源的路由的名字
            this.$route.meta        //对象，返回当前路由的元信息
        );

        /** 一些其他的路由实例上的属性和方法 */
          /*实例属性*/
        console.log(
            this.$router.app,             //配置了该 router 的Vue根实例
            this.$router.mode,            //返回该路由实例使用的模式
            this.$router.currentRoute     //当前路由信息对象，也就是组件中的 this.$route
        );
          /*实例方法*/
        this.$router.getMatchedComponents([location_]);    //返回目标位置或是当前路由匹配的组件数组 (是组件的定义/构造类，非实例)，通常在服务端渲染的数据预加载时使用
        this.$router.resolve(location_, [current, [append]]);    //解析目标位置,location_同push和replace的第一个参数(路径字符串或路径对象)，current 是当前默认的路由 (通常你不需要改变它)，append 允许你在 current 路由上附加路径 (如同 router-link)

      }
    },
    /**导航守卫
     * 包括：全局守卫、单个路由独享的守卫、组件级守卫
     * 注意：参数或查询的改变并不会触发进入/离开的导航守卫，可以通过侦听 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫
     * */
      /*组件级守卫放在组件中，全局守卫与路由实例放在一个位置
       * 这里是组件级守卫*/
    /** 在渲染该组件的对应路由被 confirm 前调用 */
    beforeRouteEnter (to, from, next) {
        /*参数
         * to：   导航即将进入的路由对象
         * from： 导航正要离开的路由对象
         * next： 函数，一定要在最后调用 next() 表示逻辑处理完成可以进行下一步，否则将不会响应后续守卫钩子(包括后面的逻辑跳转等一系列处理)，
         *        该方法执行效果依赖调用的传去的参数：
         *        1、next()：进行管道中下一个守卫钩子，若全部钩子执行完了，则导航状态就是confirmed (确认的)
         *        2、next(false): 中断当前的导航。若浏览器的 URL 改变 (可能是用户手动或浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
         *        3、next('/') 或 next({ path: '/' }): 跳转到一个不同的地址。当前导航被中断，然后进行一个新的导航。可以向 next 传递任意位置对象，且允许设置诸如`replace:true`、`name: 'home'`之类的选项以及任何用在`router-link`上的`to`属性或`router.push`方法中的选项
         *        4、next(error): 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
         * */
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      // 不过，可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
      next(vm => {
        // 通过 `vm` 访问组件实例
        // 注意：beforeRouteEnter 是支持给 next 传递回调的唯一守卫，其他支持next参数的守卫传参规范只能是上面4种
      });
      /**对于路由导航过程中页面数据的获取时间可选择在两种情况下获取：
       * 1、导航完成后获取：即在组件的 created 钩子中获取数据
       * 2、导航完成前获取：即在该 beforeRouteEnter 守卫中获取数据
       *
       * 这两种方式结果都一样，只是用户体验方面不一样：
       * 1先跳转页面再加载数据，数据加载过程中数据渲染的部分肯定是空白的，可以加一个loading效果
       * 2先加载数据再跳转页面，数据加载过程中还在当前页面，所以可即加一个进度条指示
       * */
    },
    /** 路由更新前的守卫，在当前路由改变，但是该组件被复用时调用 */
    beforeRouteUpdate (to, from, next) {
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      // 参数同上
    },
    /** 导航离开该组件的对应路由时调用 */
    beforeRouteLeave (to, from, next) {
      // 可以访问组件实例 `this`
      // 参数同上
    }
  };









</script>