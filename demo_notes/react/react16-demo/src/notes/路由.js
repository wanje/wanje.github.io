import React from 'react';
import {
  // 给路由器设置别名为`Router`，所有一级路由相关的内容都需要包裹在`Router`组件中(渲染最外层路由需要，子路由不用)，可以包裹在入口文件`index.js`中`App`根组件外，这样其他地方就都可以不用再次包裹
  // `BrowserRouter`组件的作用同`vue-router`中的`history`模式(也需要服务端配置一起使用)，`HashRouter`组件的作用同`vue-router`中的`hash`模式，`hash`模式不支持`location.key`和`location.state`
  HashRouter as Router, // 另`MemoryRouter`组件主要用于测试和无浏览器环境的情况中(如：React Native 中)
  Switch, // `Switch`组件通过查找所有的子`Route`或`Redirect`并渲染与当前URL匹配的第一个`Route`或`Redirect`的内容(所以应尽量将更加具体的包含较长路径的路由放在前面，以免先匹配到前面的短路由)，作用类比js中的s`witch...case...`，不放在`Switch`中的`Route`匹配到时将全部渲染
  Route, // `Route`组件类似Vue中的`router-view`组件，`path`属性指向要匹配的路由，需要特别注意的是<Route path>匹配URL的开头，而不是整个开头。所以，<Route path ="/">将始终与任意一个URL匹配。另外，不放在`Switch`中的`Route`将始终渲染(被匹配到时，未匹配到的并不会渲染，但使用`chuildren`属性指定的渲染函数不管匹配与否此时都会执行)
  Link, // `Link`组件类似Vue中的`router-link`组件，`to`属性指向要连接的路由，会渲染成一个实际的`a`标签
  NavLink, // 一种特殊的`Link`组件，相比`Link`组件，其多了一个激活状态：当与当前路由匹配时，其会有一个`active`的 class（可通过activeClassName属性自定义）
  Redirect, // `Redirect`组件表示重定向，会将匹配到的路由重定向到该组件指定的路由，`to`属性指向要跳转到的路由，默认会替代原路由历史记录
  Prompt, // `Prompt`组件用于提示用户离开当前导航页时进行二次确认(比如当前页包含半完成的表单时)，同一时刻只能存在一个Prompt提示，一般是最近的优先。其内部实际就是调用的原生`window.prompt()`方法
  useRouteMatch, // hook，获取`match`对象(不传参数时则返回当前路由`match`对象)，其亦可传入`Route`组件的参数(useRouteMatch(path,otherRoutePropsObj))，以不渲染实际`Route`而得到对应路由的`match`对象
  useLocation, // hook，获取代表当前`url`的`location`对象，其中包含当前导航url路径相关字段
  useHistory, // hook，获取`history`实例，可进行编程导航操作，如：history.push('/')跳转至某路由，history.replace('/')替换当前路由为某路由，更多可参考该实例上的方法
  useParams, // hook，获取路由参数（同`match.params`）
  matchPath, // 函数方法：matchPath(pathname,routeOptions)，用于在不使用`Route`组件的情况下按相同的匹配规则检测指定的`pathname`路径(即浏览器地址)与指定的`routeOptions`路由参数对象(可以是字符串或字符串数组作为{path:xxx}的简写)的匹配结果，若匹配则返回对应match对象，否则返回null
  withRouter // 函数方法：withRouter(Component)，将组件`Component`使用Route的形式进行包装处理，使得即使不是`<Route>`组件的渲染组件的`Component`组件内也可访问`Route`的几个特殊属性：match、location、history、staticContext。感觉可以使用`hook`访问？(class类组件内不能使用hook)，在嵌套组件中较有用。
} from 'react-router-dom';
import {
  matchRoutes, // 函数方法：matchRoutes(routerConfig,pathname)，返回一个数组(包含`routerConfig`中被`pathname`匹配到的所有路由，每个item包含两个属性：`route`为匹配的路由、`match`该路由的匹配对象)
  renderRoutes // 函数方法：renderRoutes(routerConfig,extraProps={},switchProps={})，渲染路由(不放在`Switch`中)，使用该方法渲染路由则其子路由中也要使用该方法(不能使用`Route`组件去渲染)，
               // 该方法会将匹配到的`route`(routerConfig中数据的引用)作为props参数之一传递给子组件，子组件通过`route.routes`访问子路由数据(根据自己设置子路由的属性，子路由使用`children`属性则通过`route.children`访问)
} from "react-router-config";

/**==================================*/
/**========== `history`对象 ==========*/
/**==================================*/
// react-router中提到的`history`和`history对象`指的是`history包`(并不是window的原生history对象，而是一个封装)，其用于在各种环境中管理JS的会话历史记录
// 包文档：https://github.com/ReactTraining/history/tree/master/docs
const historyObj = { // history对象提供的属性和方法结构如下(history包`提供的更多属性和方法可参考上面的文档)
  length: 'number，历史记录堆栈中的条目数',
  action: 'string，当前操作类型（PUSH、REPLACE、POP）',
  location: { // 特别注意：由于`history`对象是可变的(也存在未跳转页面但添加了新的历史记录的情况)，所以建议从<Route>组件的渲染属性中直接访问提供的location参数，而不是通过`history.location`间接无访问
    pathname: 'string，url地址路径',
    search: 'string，url地址中的查询字符串',
    hash: 'string，url地址中的hash片段',
    state: 'object，用于`browser`或`memory`history中(HashRouter不适用)进行`push`或`replace`导航时使用，可看作是历史记录的额外参数(其不会出现在url中)'
  },
  push(path, [state]) {
    // 向历史记录堆栈中推入一条新的记录，基于原生方法`window.history.pushState(state,title,url)`封装
    // `path`为url地址，若是一个与当前url不同的新地址，就会进行导航跳转(编程导航)
    // `state`为这条历史记录的状态对象，可选参数，可以是任意的一个可序列化对象，当做当前历史记录的额外参数（如存入一些页面信息或用户信息）
  },
  replace(path, [state]) {
    // 替换当前所在这条历史记录，基于原生方法`window.history.replaceState(state,title,url)`封装
    // `path`为替换当前记录的url地址，若是一个与当前url不同的新地址，就会进行导航跳转(编程导航)，替换后原地址就不能通过浏览器的后退按钮进行返回
    // `state`为这条历史记录的状态对象，可选参数，可以是任意的一个可序列化对象，当做当前历史记录的额外参数（如存入一些页面信息或用户信息）
  },
  go(n) {
    // 跳转至历史记录中的第`n`条，同原生方法`window.history.go(n)`，`go(0)`则表示刷新当前页
  },
  goBack() {
    // 回到上一页，类似原生方法`window.history.back()`，相当于`go(-1)`
  },
  goForward(n) {
    // 进入下一页(若历史记录中存在相对当前记录的下一条记录)，类似原生方法`window.history.forward()`，相当于`go(1)`
  },
  block(prompt) {
    // 阻断导航跳转，该方法执行后返回一个`解除导航阻断`的方法unblock，执行该解除方法就可以继续跳转
    // 参数`prompt`是一个阻断跳转后的回调函数，一般是询问用户是否确认跳转，若是则解除阻断继续跳转，prompt回调接受一个历史记录对象上下文对象，包含三个属性或方法`action, location, retry`
    const unblock = historyObj.block(({action, location, retry}) => {
      // action：历史记录操作类型
      // location：历史记录位置信息
      // retry()：方法，重新尝试跳转页面
      console.log(action, location, retry);
      const url = location.pathname;
      if (window.confirm(`当前页包含为保存信息，确认跳转至：${url}?`)) {
        // 用户选择确认跳转则解除阻断并重新尝试跳转
        unblock();
        retry();
      }
    });
  }
};

/**===================================*/
/**========== `location`对象 ==========*/
/**===================================*/
// react-router中Route提供的props之一的`location`对象是封装过的，并非原生`window.location`对象，其结构大致如下
// `location`对象表示一个位置(类似浏览器url地址，只是表现形式不同，且可包含更多数据)，根据使用的地方不同，可表示当前网页所在位置、想要导航到的位置、以前的历史位置
// eslint-disable-next-line
const locationObj = {
  key: 'ac3df4，该位置的key，HashHistory中无该属性',
  pathname: '/somewhere，路径名',
  search: '?some=sch-str，查询字符串',
  hash: '#howdy，哈希',
  state: { // 自定义的`state`对象数据
    customProp: 'some-data',
    providePlace: {
      // react-router在好几个地方提供了`location`对象访问，在相同的位置`location`对象是不会变的
      // 前面也提到`history`中也包含`location`对象，但由于`history`是可变的，在相同的位置但不同的`history`可能其中`location`对象已改变，故不建议使用`history`中的`location`
      'Route component 组件中访问': 'this.props.location',
      'Route render 渲染函数中访问': '({location}) => ()',
      'Route children 函数中访问': '({location}) => ()',
      'withRouter 中访问': 'this.props.location',
      '使用`hook`访问': 'const location = useLocation()'
    },
    insteadOfUrlStr: '可以使用`location对象`形式替代`url字符串`形式进行导航，使用位置：<Link to={location}/>、<Redirect to={location}/>、history.push(location)、history.replace(location)'
  }
};

/**================================*/
/**========== `match`对象 ==========*/
/**================================*/
// react-router中Route提供的props之一的`match`对象，其包含了有关<Route path>如何与URL匹配的信息(若Route未设置path则将始终被匹配到，此时match对象将继承其最近的父级match，同`withRouter`方法中表现一样)
// eslint-disable-next-line
const matchObj = {
  params: 'object，类似vue中的$route.params，保存了地址中的所以参数数据(不是查询参数，而是url中的`:id`这样的参数占位符，但需注意是当前匹配到的`Route`中的参数，若链接地址最先匹配到的Route不是预期的`exact`匹配结果则不会获取到预期的参数)',
  isExact: 'boolean，表示当前的匹配是否符合`exact`模式(注意并不是表示Route上是否设置了`exact`属性)',
  path: 'string，匹配的路由模式(即匹配到的Route的path)',
  url: 'string，url的匹配部分(即浏览器URL地址被中匹配到的片段)',
  '可访问match对象的地方': {
    'Route component 组件中访问': 'this.props.match',
    'Route render 渲染函数中访问': '({match}) => ()',
    'Route children 函数中访问': '({match}) => ()',
    'withRouter 中访问': 'this.props.location',
    'matchPath返回值': 'const match = matchPath(...rest)',
    '使用`hook`访问': 'const match = useRouteMatch()'
  }
};
// matchPath(pathname,routeOptions)，用于在不使用`Route`组件的情况下按相同的匹配规则检测指定的`pathname`路径(即浏览器地址)与指定的`routeOptions`路由参数对象的匹配结果，若匹配则返回对应match对象，否则返回null。
// 第二个参数`routeOptions`也可以是对象数组，可以是字符串作为{path:xxx}的简写或字符串数组(表示与一组路由进行匹配，同Switch组件的作用，同样也只返回匹配到的第一个的匹配结果，若传对象数组返回的结果中url属性不完全正确)
console.log('matchPath匹配结果match：', matchPath("/users/7", {
  path: "/users/:id",
  exact: true,
  strict: true
}));

/**==================================*/
/**====== react-router-config ========*/
/**==================================*/
const routerConfig = [{
  routes: [
    {
      path: "/home",
      exact: true,
      strict: true,
      component: Home
    }
  ]
}];
console.log('matchRoutes匹配到的路由：', matchRoutes(routerConfig, '/home'));
console.log('renderRoutes渲染路由输出：', renderRoutes(routerConfig));

/**==================================*/
/**============ UI组件 ==============*/
/**==================================*/
function Home({ match, location, history }) {
  /**
   * `Route`组件会传给其对应渲染视图组件三个路由特有属性对象：match, location, history，注意是`Route`组件`component`属性直接指定的组件才有，children属性或是放在`Route`标签内的子组件没有这三个属性
   */
  console.log('Home：', { match, location, history });

  return (
    <div>
      <h3>这里是“首页”内容</h3>
      <span className="color-red">BrowserRouter</span>组件的作用同`vue-router`中的`history`模式(也需要服务端配置一起使用)，另有<span className="color-red">HashRouter</span>组件的作用同`vue-router`中的`hash`模式
      <p>一般将<span className="color-red">BrowserRouter</span>或<span className="color-red">HashRouter</span>组件包裹在入口文件`index.js`中<span className="color-red">App根组件</span>外，这样其他地方就都可以不用使用</p>
      <p>
        <span className="color-red">Switch</span>组件通过查找所有的子`Route`并渲染与当前URL<span className="color-red">匹配的第一个`Route`</span>的内容(所以应尽量将更加具体的包含较长路径的路由放在前面，以免先匹配到前面的短路由)，
        若同级只有一个路由也就不需要添加该组件了（作用类比js中的s`witch...case...`）。<span className="color-red">需要注意的是：</span>
        不放在`Switch`中的`Route`将始终渲染(被匹配到时，但使用`chuildren`属性指定的渲染函数不管匹配与否此时都会执行)。
      </p>
      <p>
        <span className="color-red">Route</span>组件类似Vue中的<span className="color-red">router-view</span>组件，
        需要注意的是<span className="color-orange">&lt;Route path&gt;</span>匹配URL的开头，而不是整个开头。
        所以，<span className="color-orange">&lt;Route path ="/"&gt;</span>将始终与任意一个URL匹配
      </p>
      <p><span className="color-red">Link</span>组件类似Vue中的<span className="color-red">router-link</span>组件，会渲染成一个实际的`a`标签</p>
      <p><span className="color-red">NavLink</span>是一种特殊的`Link`组件，相比`Link`组件，其多了一个激活状态：当与当前路由匹配时，其会有一个`active`的 class（可通过<span className="color-orange">activeClassName</span>属性自定义）</p>
    </div>
  )
}

class Error404 extends React.Component {
  render() {
    // 若该class类组件是`Route`的子组件，这里就获取不到`match, location, history`三个属性任何一个，又由于class类组件中不能使用hook，所以若要获取这些属性就只能显式地由父组件通过props传递下来
    console.log('Error404：', {
      match: this.props.match,
      location: this.props.location,
      history: this.props.history
    });
    return <p>404，走丢了！</p>
  }
}

function AboutIntro({ match, location, history }) {
  console.log("AboutIntro：", { match, location, history }); // 该组件不是`Route`直接指定渲染组件，直接访问不到这几个路由属性，可使用`withRouter`进行包装，其实也可以使用hook
  return <span className="color-red" title="点击回到首页" onClick={() => history.push('/')}>PaaS的前身叫AC</span>
}
/** 
 * 使用`withRouter`对组件进行包装得到一个使原组件能访问`Route`特殊属性的新组件(要使用该新组件，直接使用原组件是访问不到相关属性的)
 * 原组件`AboutIntro`可以通过包装后组件的静态属性`WrappedComponent`访问到：AboutIntroWithRouter.WrappedComponent === AboutIntro
 * 若原组件`AboutIntro`是用class类定义的，则原组件的引用将作为参数传递给包装组件上的`wrappedComponentRef`属性的函数，在函数内就可以通过该引用获取到原组件内的数据和方法：
 * <AboutIntroWithRouter wrappedComponentRef={inner => { console.log(inner)}} /> // 函数默认传入的参数`inner`是对原组件`AboutIntro`的引用
 * 须注意：原组件必须是class类定义的，包装组件上的`wrappedComponentRef`才有效，因为纯函数组件是无状态组件(不考虑使用hook)，不存在组件自身的状态数据和方法，也就没理由引用
 */
const AboutIntroWithRouter = withRouter(AboutIntro);

function AboutDefault({ match, location, history }) {
  console.log('AboutDefault：', { match, location, history });
  // 使用`withRouter`包装后的组件，此时，原组件中就可以访问到`match, location, history`三个属性，若原组件是class类定义的，则包装组件上还可以通过`wrappedComponentRef`属性函数访问原组件应用
  return <p>这里是“关于”的默认内容：<AboutIntroWithRouter /></p>
}

function UEDIntro(props) {
  /**
   * 该组件不属于`Route`组件`component`属性直接指定渲染的组件，属于其子组件，所以`props`上没有`match, location, history`三个属性对象
   * 要使用这三个属性就要通过路由提供的`hook`去分别获取（若子组件是由class类声明的，由于class类组件中不能使用hook，所以要获取这三个属性就只能显式地由父组件通过props传递下去）
   */
  console.log('UEDIntro:props.match：', props.match); // undefined
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  console.log('UEDIntro：', { match, location, history }); // 可获取到路由中的`match, location, history`属性对象

  return <span>UED表示用户体验部</span>
}

function AboutUED({ match, location, history }) {
  console.log('AboutUED：', { match, location, history });
  return <p>这里是“关于UED”内容：<UEDIntro /></p>
}

function AboutWaaS({ match, location, history }) {
  console.log('AboutWaaS：', { match, location, history });
  const { notesId } = useParams();
  return <p>这里是“关于WaaS”内容之：{ notesId }</p>
}

/**==================================*/
/**============= 子路由 =============*/
/**==================================*/
function About({ match, location, history }) {
  console.log('About：', { match, location, history });
  return (
    <div>
      <h2>下面是“关于”内容的子路由</h2>
      <nav>
        About子路由：
        <Link className="mgl-10" to={`${match.url}/ued`}>AboutUED</Link> {/* `to`属性为字符串，可由`location`的`pathname`、`search`和`hash`属性连接起来而创建：to="/courses?sort=name */}
        <Link className="mgl-10" to={`${match.url}/waas/notesId`}>AboutWaaS</Link>
        <Link
          className="mgl-10"
          replace={false} /* 是否替换当前这条`history`历史记录 */
          to={{ /* `to`属性为location对象 */
            pathname: "/courses", /* 要链接到的路径 */
            search: "?sort=name", /* query查询参数的字符串表示形式 */
            hash: "#the-hash",  /* url中的hash值 */
            state: { fromDashboard: true }  /* 将状态保留到该属性中，这个属性设置的内容会被传递到`location.state`中 */
          }}
        >Other</Link>
        {/* `to`属性为函数，将当前位置作为参数传递给函数，该函数应该以字符串或对象的形式返回位置信息 */}
        <Link to={location => `${location.pathname}?sort=name`} /> {/* `to`函数返回字符串 */}
        <Link to={location => ({ ...location, pathname: "/courses" })} /> {/* `to`函数返回对象 */}
      </nav>
      
      <Switch>
        <Route exact path={`${match.url}`} component={AboutDefault} /> {/* `exact`属性表示要准确匹配，否则子路由也会匹配到父级路由 */}
        <Route path={`${match.url}/ued`} component={AboutUED} />
        <Route path={`${match.url}/waas/:notesId`} component={AboutWaaS} /> {/* 同vue路由一样可用`:prams`表示路由参数占位符 */}
      </Switch>
      {/* 放在`Switch`之外的`Route`匹配到了就都将渲染，但若是使用`chuildren`属性指定的渲染函数，则不管匹配到与否此时都会执行 */}
      <Route path={`${match.url}/ac`} children={({match}) => ( /* 这里的路由视图将始终渲染，不匹配的路由的`match`属性将返回`null` */
        <p>
          <span>放在`&lt;Switch&gt;`标签之外的`&lt;Route&gt;`匹配到了就都将渲染，此处子路由并未匹配到但仍被渲染(因Route放在Switch之外且使用了`children`渲染函数)：</span>
          <span style={{color: match ? 'green': 'red'}}>{ match ? '此处路由匹配': '此处路由不匹配但仍会渲染' }</span>
        </p>
      )} />
    </div>
  )
}

function userConfirm(msg, callback) {
  console.log(msg);
  // const allowJump = window.confirm(msg);
  // callback && callback(allowJump);
}

/**==================================*/
/**============== 路由 ==============*/
/**==================================*/
function RouterView() {
  return (
    // 一般将该`Router`组件放在入口文件`index.js`中`App`根组件外，这样其他地方就都可以不用再次包裹
    <Router
      // basename="/baseUrl" /* `basename`属性表示所有`location`的基础路径，默认为空，当我们的应用部署在服务器对应根目录下某个子目录时，此处就要设置为该子目录，其以斜杠`/`开头，但不能以斜杠结尾 */
      getUserConfirmation={userConfirm('jump')} /* 一个让用户确认是否使用当前方式导航的函数，实测只会在页面初始加载渲染时执行一次（但实际该函数可以完全自定义做什么事） */
      // forceRefresh={false} /* 跳转页面时是否强制整页刷新？默认false。`HashRouter`组件无此属性 */
      // keyLength={7} /* 指定`location.key`的长度，默认为6。`HashRouter`组件无此属性 */
      // children={<RouterCont />} /* 要渲染的子元素，其与将子元素写在标签直接的方式`<Router><RouterCont /></Router>`是一样的，须注意其值是元素标签，不只是一个元素名 */
      // hashType="slash" /* `HashRouter`组件专有属性，用于设置`window.location.hash`的编码类型(即`#`后挨着的符号)，默认`slash`(#/about/ued)，另有`noslash`(#about/ued)、`hashbang`(#!/about/ued) */
    >
      <nav>
        路由：
        <NavLink exact className="mgl-10" to="/">Home</NavLink>
        <NavLink className="mgl-10" activeClassName="color-orange" to="/about">About</NavLink> {/* 若上面`Router`设置了`basename`，所以这里渲染的`a`标签上的实际链接会是`/baseUrl/about` */}
        <NavLink
          className="mgl-10"
          to="/noway" /* `NavLink`是特殊的`Link`，除了`Link`包含的属性外还有以下属性 */
          activeClassName="color-orange" /* 当前导航路由被激活时，该元素上的激活样式class名，默认为`active` */
          activeStyle={{color: 'orange'}} /* 当前导航路由被激活时，该元素上的激活样式style对象，默认为`{}` */
          exact={false} /* 为true时locatiuon要完全匹配时才应用active状态的class或style */
          strict={false} /* 严格模式，若为true，则`to`要与<Route>的`path`一模一样才能算匹配上（要和<Route>的`strict`配合使用） */
          isActive={(match, location) => {/* `isActive`提供一种添加额外逻辑以确定链接是否处于active状态的功能。如果您要做的事情不仅仅是验证链接的路径名是否与当前URL的路径名匹配，则可以使用此选项 */
            // 注意：实测发现每次导航该回调都会执行，不管是同级路由导航，还是子路由导航，不管是DOM组件导航，还是编程导航
            console.log('NavLink_isActive：', {match, location});  
            if (!match) return false;
            // 设置为仅当事件id为奇数时元素才为active状态
            const eventId = parseInt(match.params.eventId);
            return !isNaN(eventId) && eventId % 2 === 1;
          }}
          location={{pathname: '/noway'}} /* `isActive`中要比较的`location`位置(通常是浏览器当前地址)，若要与其他地址比较则在这里设置一个要比较的`location`值 */
        >Other</NavLink>
        <Prompt
          // when={true} /* 布尔值，代替条件渲染，默认`true`始终渲染，false则表示始终不渲染 */
          // message="当前页有未完成表单，确定离开？" /* `message`设置提示信息，可为字符串string，也可为一个函数function */
          message={(location, action) => { /* `message`为一个函数function，返回`true`则跳过确认提示，返回字符串则表示要显示的提示文本 */
            // 接受`location, action`两个参数，可进行条件渲染
            if (action === 'POP') console.log("message function！");
            return location.pathname.startsWith("/noway") ? `该'${location.pathname}'路由不存在，确认跳转？` : true;
          }}
        />
      </nav>

      <main className="router__main">
        <p>路由对应内容：</p>
        <Switch
          // location={locationObj} /* 用于匹配子元素的位置对像，若设置的话将覆盖匹配到的子元素中的`location`，一般不设置，默认是前历史记录位置（通常是当前浏览器URL） */
        >
          {/** `Route`组件提供了四种渲染其对应路由内容的方法：
           * 其一就是将内容作为`Route`的子组件/元素直接放在其标签内：
           * 1、<Route path="/">这里放置该路由对应渲染内容</Route>
           * 另外3种都是通过`Route`组件提供的props属性设置内容，三个属性分别是：component、render、children
           * 这三个属性设置渲染内容的方式，其组件内都接受三个特殊的路由props：match、location、history
           * 2、component：<Route path="/path" component={Comp} />，注意其值是一个引用的组件函数名(或类名)，此方式`Route`会使用`React.createElement`给Comp组件创建一个新的react元素，
           *              所以这里不能直接在行内给`component`一个内联函数：component={function(){return <div/>}}，这种方式每次渲染都将创建一个新的函数，而不是更新的同一个组件。
           *              要使用内联函数的方式可以使用`render、children`两个props。
           * 3、render：<Route path="/path" render={(props) => <div>Content</div>} />，其值可以是一个内联函数。注意：component优先级大于render
           * 4、children：<Route path="/path" children={(props) => <div>Content</div>} />，其值是一个内联函数(也可以是一个react元素，注意是标签形式{<Comp/>}，不是直接像component属性那样一个标签名{Comp}，且其内不能直接访问到Route的三个特殊prop)。
           *             注意：当`Route`放在`Switch`组件外时，其`children`指定的渲染函数将始终执行(不管是否匹配到了该路由)。另，children优先级大于component
           */}
          <Route path="/404" children={props => {
            console.log('Route_children_match：', props.match);
            return <Error404 {...props} /> /* 显式传递路由props到组件内 */
          }} />
          <Route path="/about" component={About} /> {/* `component`属性指定该路由对应渲染的组件，注意其是一个组件名，而不是像`children`属性那样的元素标签 */}
          {/**
            需要特别注意的是<Route path>匹配URL的`开头`，而`不是整个开头`。因为所有URL均以`/`开头，故<Route path ="/">将始终与任意一个URL匹配，这也为什么要把这个<Route>放在最后的原因
            另一种方案就是添加`exact`属性，其表示要精确匹配，这样就不用放在最后
          */}
          <Route
            path="/" /* 该路由的路径，可使用数组[]设置多个路径，不设置`path`的Route将始终被匹配，可用的路径格式可参考：https://github.com/pillarjs/path-to-regexp/tree/v1.7.0 */
            component={Home}
            exact /* 精确匹配，除了末尾的`/`斜杠外，要与当前`location.pathname`(即浏览器中路径)完全一样才算匹配 */
            strict /* 严格匹配，指的是严格匹配末尾的`/`斜杠(即要么都有，要么都没有)，当pathname后还包含额外的路径片段时，该属性无效(即与strict为false表现一样) */
            sensitive /* 大小写敏感匹配，即匹配时区分路径中的大小写 */
            // location={} /* 默认情况下<Route>元素将其路径与当前历史记录(通常是当前浏览器URL)匹配。但，也可以在这里传递不同的位置进行匹配，这在页面转场动画中很有用。 */
                        /* 如果<Route>元素包裹在<Switch>中并且与传递给<Switch>的location(或当前历史记录位置)匹配，则传递给<Route>location的prop将被<Switch>使用的location覆盖 */
          />
          {/* 若前面的路由都没匹配到，则重定向到404界面，注意`Redirect`要放到最后，以免在前面就被匹配了 */}
          <Redirect
            // from="/noway" /* 要重定向的路径(作用同`Route`中的`path`属性，用于匹配)，不设置的话就表示任何路径都可以重定向(所以对于404页面将其放在Route最后，不设置from，前面没有匹配的就重定向到404)，from中必须包含to中使用到的所有参数，to不使用的其他参数就自动忽略 */
            to="/404" /* 与`Link`组件的`to`属性一样，可以为一个字符串值，也可以为一个location对象值，`to`中的所有参数必须由`from`中而来 */
            push={false} /* 是否采用push的方式跳转重定向地址，默认false，采用replace的方式替换历史记录 */
            exact={false} /* 精准匹配，同<Route>的`exact`属性，注意：只有当`Redirect`在 `Switch`组件内渲染时该属性才能结合`from`属性使用 */
            strict={false} /* 严格匹配，同<Route>的`strict`属性，注意：该属性只有当`Redirect`在 `Switch`组件内渲染且结合`from`属性一起使用是才有效 */
            sensitive={false} /* 大小写是否敏感匹配，同<Route>的`sensitive`属性 */
          />
          <Redirect from="/test/:id" to="/404/:id" /> {/* 使用匹配到的参数重定向 */}
        </Switch>
        {/** 上面的路由视图可用采用`React.lazy()`进行代码分割懒加载(需注意组件必须是采用`export default`默认导出的)，然后让在<Suspense>组件中渲染 */}
        {/* 
        const Home = React.lazy(() => import('./Home')); 需要注意的是使用`React.lazy`加载的组件必须要是用`export default`默认导出的才行
        const About = React.lazy(() => import('./About'));
        <Suspense fallback={<div>页面加载中...</div>}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Suspense>
        */}
      </main>
    </Router>
  )
}

export default RouterView;