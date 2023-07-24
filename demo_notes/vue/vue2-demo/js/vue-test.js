/**
 * Created by wanje on 2017/9/27.
 */
// require(['jquery'],function ($) {
    $('body *').map(function () {
        let $this = $(this);
        if ($this.attr('@click')){
            $this.addClass('pointer');
        }
    });

    /**===============================================================================================================*/
    /**====================== Vue.config 是一个对象，包含Vue的全局配置，可在实例化前根据需要修改一些属性 ======================*/
    /**===============================================================================================================*/
    /*
    * optionMergeStrategies 属性
    * 该属性用于自定义组件选项的合并策略(方式)，即采用怎样的方法合并两个配置对象；
    * 值为函数，其接收在父实例和子实例上定义的该选项的值作为第一个和第二个参数，Vue 实例上下文被作为第三个参数传入，返回合并处理后的结果
    * */
    Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
        return child + 1
    };
    const Profile = Vue.extend({
        _my_option: 1
    });
    console.log(Profile.options._my_option);  // 2
    // Vuex 1.x 中的混入策略示例
    const merge = Vue.config.optionMergeStrategies.computed;    //这里使用Vue自带的computed属性的合并策略来合并vuex选项
    Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
        if (!toVal) return fromVal;
        if (!fromVal) return toVal;
        return {
            getters: merge(toVal.getters, fromVal.getters),
            state: merge(toVal.state, fromVal.state),
            actions: merge(toVal.actions, fromVal.actions)
        }
    };

    /*
    * ignoredElements 属性
    * 该属性设置忽略哪些元素，主要是一些自定义的(HTML5中允许自定义元素)，但又未用vue注册的元素，否则vue将以未定义该组件抛出错误，该属性可设置忽略指定的元素
    * 值为数组，数组中值可为：字符串、正则
    * */
    Vue.config.ignoredElements = [
        'my-custom-web-component',
        'my-custom-tag',
        'my-component',
        /^ion-/     // 用一个 `RegExp` 忽略所有“ion-”开头的元素，仅在 2.5+ 支持
    ];

    /*
    * keyCodes 属性
    * 该属性设置键码别名，主要用于绑定键盘事件时的修饰符（当同一功能有多个键时很好用）
    * 值为对象，键名为别名，键值为键码(多个键码可用数组表示)
    * <input type="text" @keyup.media-play-pause="method">
    * */
    Vue.config.keyCodes = {
        v: 86,
        f1: 112,
        // mediaPlayPause: 179,    // 错误，此处要求不能使用驼峰命名法
        "media-play-pause": 179,   // 正确，取代驼峰命名的是字串命名法，且用双引号括起来
        up: [38, 87]
    };

    /*
    * productionTip 属性
    * 布尔值，该属性设置Vue在启动时是否生成生产提示，默认为true（平时开发中不需要生产提示，可设为false）
    * */
    Vue.config.productionTip = false;

    /**===============================================================================================================*/
    /**================================================== 创建Vue实例 ==================================================*/
    /**===============================================================================================================*/
    /**
     * 不要在选项属性方法或回调上使用箭头函数，因为箭头函数是和父级上下文绑定在一起的，其中的 this 不会指向如你所预期的 Vue 实例
     * */
    //因为这里是在require的回调函数内部，所以在外部访问不到这里的vue实例，故将其挂载到window下方便在浏览器控制台测试访问
    window.app = new Vue({
        /**========== el 属性指定vue实例挂载位置==========*/
        el:"#app",         //挂载，绑定到的dom元素,注意不能用于多个dome元素（可以是一个css选择器，也可以是一个DOM元素），若这里未配置`el`，也可以在后面调用vue实例的`$mount()`方法进行挂载【app.$mount('#app')】
        /**========== data 属性绑定数据信息==========*/
        //绑定的数据信息放在data属性中，注意data里面的数据不是通过app.data.msg1来访问的，而是直接通过app.msg1来访问，所以须注意属性命名要严格符合规范，且不能将其当做对象属性的方式命名(不能加不合法的特殊字符用引号形式作为属性(因为HTML中解析不是以[]形式访问，只有脚本中可以这样访问)
        //在该实例之外访问data对象时也可以通过app.$data的方式，如：app.$data.msg1
        //注意：以‘_’或‘$’开头的属性不会被vue实例代理，以免与Vue内置的属性或方法冲突，这种属性的值可通过上面说的 $data 对象访问，如：app.$data._my_option
        //另外，虽然`data`中数据的值受监听，变化就可引起视图也变化，这对于基本数据类型没什么问题，而对于引用数据类型内部变化而本身地址未变化就不能引起视图改变，所以在改变引用类型数据时因返回一个新的值而不是直接在原值上修改
        data:{
            msg1: "Hello VueJS!",
            msg2: "这里是title属性值",
            msg3: "这里的数据与输入框中的值是双向绑定的！",
            msg4: "<b>v-html解析成html代码，v-text解析成纯文本</b>，这两个指令将所在标签内容用指定的变量值填充",
            show: true,
            seen: true,
            add: '',
            items: [             //用于循环的相应数据放在一个数组中，且采用同样的属性名
                {text:"cell1"},
                {text:"cell2"}
            ],
            obj: {
                key1: "value1",
                key2: "value2"
            },
            firstName: '',
            lastName: '',
            nameCount: 0,
            fontSize: 16,
            isColorGreen: true,
            isFontBig: true,
            colorGreenClass: 'color-green',
            fontBigClass: 'font-big'

        },
        /**========== computed 绑定计算属性==========*/
        computed: {         //计算属性，下面的属性由其他属性计算而来(即存在依赖)，computed属性不支持异步，异步属性应放在侦听器watch中
            fullName: function () {
                return this.firstName + ' ' + this.lastName;
            },
            //计算属性默认只有getter(即只能获取值，不能手动赋值设置)，必要时也可提供setter(即允许手动设置)，像上面的fullName只能获取，不能设置，而下面的fullName2既可以获取也可以设置
            fullName2: {
                //getter
                get: function () {
                    return this.firstName + ' ' + this.lastName;
                },
                //setter
                set: function (newValue) {
                    var names = newValue.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[names.length - 1];
                }
            }
        },
        /**========== watch 绑定需要监听变化的属性==========*/
        watch: {            //侦听器，监听指定的属性数据变化，若属性变化则做相应处理，支持异步，且不应使用箭头函数定义处理函数
            fullName: function (newVal,oldValue) {  //接受两个参数，该方式属于浅层监听，默认只能监听一层数据结构的变化
                console.log('变化后的新值：'+newVal, '变化前的旧值：'+oldValue);
                this.nameCount++;
            },
            //该方式可开启深层监听，可监听多级数据结构的变化，handler置顶处理函数，deep属性表明开启深层监听与否
            fullName2: {
                handler: function (newValue,oldValue) {  //接受两个参数，该方式属于浅层监听，默认只能监听一层数据结构的变化
                    console.log('变化后的新值：'+newValue, '变化前的旧值：'+oldValue);
                    this.nameCount++;
                },
                deep: true //开启深层监听
                // immediate: true   //immediate 属性用于开启是否在侦听开始后就立即调用一次处理函数
            }

        },
        /**========== methods 属性绑定各事件处理函数(也可作为一般函数在表达式中被调用)==========*/
        methods: {           //绑定的事件处理方法放在methods属性中，这里面的this是指向这个vue实例的，即app
            toggleShow: function(){ this.show=!this.show; },
            reverseMsg: function(){ this.msg1=this.msg1.split("").reverse().join(""); },
            toggleValue: function(a){ this[a]=!this[a]; },
            consoleLog: function(a){ console.log(a); },
            returnSth: function(a){ return a; }

        },
        /**==========生命周期钩子，回调中的this同样是指向这个vue实例的==========*/
        beforeCreate() {
            //组件实例化创建之前回调
        },
        created() {
            //该vue实例实例化后各绑定关系都注册完成后执行的回调，此时 data 已经被 observed 了
        },
        beforeMount(){
            //各初始化数据插入DOM之前的回调（此时还是原始DOM，数据驱动的DOM部分都还没有）
        },
        mounted(){
            //各初始化数据都插入DOM并渲染完成，即实例挂载完成后执行的回调，该方法比较常用
        },
        beforeUpdate(){
            //数据更新前回调，此时DOM还未应用新数据
        },
        updated(){
            //数据更新后回调，此时DOM已应用新数据
        },
        beforeDestroy(){
            //该vue实例即将销毁前执行的回调
        },
        destroyed() {
            //该vue实例被销毁后执行的回调，`执行后`该vue绑定的所有内容都将失效
        },
        /**
         * vue内置<keep-alive></keep-alive>组件所包裹的自定义组件包含`activated`和`deactivated`两个钩子
         * `keep-alive`的主要作用是：
         * 1、缓存被包裹组件的状态，使得在离开后又回来时组件的状态不变，而不是默认重新渲染成初始状态；
         * 2、可以避免需要频繁销毁和创建的组件频繁触发上面的生命周期钩子，像tab切换这种频繁在渲染与移除之间切换的组件(会移除DOM的才会触发销毁与创建)，改为提供以下两个钩子进行监听
         * */
        activated() {
            //组件被激活后的回调（出现时回调）
        },
        deactivated() {
            //组件失活后的回调（消失时回调）
        }

    });

    /**===============================================================================================================*/
    /**================================================ Vue对象全局API ================================================*/
    /**===============================================================================================================*/
    /**
     * Vue.extend( options ) 方法
     * 作用：使用基础 Vue 构造器，创建一个“子类”，参数options是一个包含组件选项的对象
     * */
    let Profile2 = Vue.extend({
        template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
        data: function () {     //注意组件选项中data要使用函数返回数据对象
            return {
                firstName: 'Walter',
                lastName: 'White',
                alias: 'Heisenberg'
            }
        }
    });
    // 创建 Profile2 实例，并挂载到一个元素上
    new Profile2().$mount('#id1');   //将得到结果：<p>Walter White aka Heisenberg</p>

    /**
     * Vue.nextTick( [callback, context] ) 方法
     * 作用：在下次 DOM 更新循环结束之后执行延迟回调callback。在修改数据之后立即使用这个方法，获取更新后的 DOM。
     * 因为vue中数据变化时，DOM是异步更新的，若立即执行一些与DOM相关的操作，这时还获取不到更新后的DOM，所以才有此方法在DOM更新后再执行回调。context为上下文环境
     * vue实例中也有 $nextTick() 方法，作用一样，只是实例方法的回调中 this 自动绑定到了当前实例，也就是context为this
     * */
    // 修改数据
    app.msg = 'Hello';
    // 这时DOM还没有更新
    Vue.nextTick(function () {
        console.log('这时DOM更新了');
    });
    // 作为一个 Promise 使用 (不支持Promise的浏览器须自己引入polyfill)
    Vue.nextTick().then(function () {
        console.log('Promise：DOM更新了');
    });

    /**
     * Vue.set( target, key, value ) 方法
     * 作用：向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新，实例上的 $set() 方法也是相同的作用。参数：
     * target：目标对象，即要添加新的响应式属性的对象，也可以是数组
     * key：新添加的属性名，或者数字(即索引，target为数组时)
     * value：新属性对应的属性值
     *
     * 它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性，如：this.obj.key3 = 'value3'，这样直接增加的新属性是不能响应式监听到的变化的
     * 注意：目标对象不能是 Vue 实例，或者 Vue 实例的根数据对象(即实例的data属性)
     * */
    Vue.set(app.obj,'key3','value3'); //在上面vue实例下‘obj’数据上添加了新的响应式属性，此时将动态更新页面DOM，后续修改key3的值也是响应式的

    /**
     * Vue.delete( target, key ) 方法
     * 作用：与上面 Vue.set() 方法的作用刚好相反，删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但平时应该很少会使用它。
     * target：目标对象，也可以是数组
     * key：属性名，或者数字(即索引，target为数组时)
     * */
    Vue.delete(app.obj,'key3','value3'); //删除obj上的key3属性，此时将动态更新页面DOM，但后续修将不再存在key3

    /**
     * Vue.directive( name, [definition] ) 方法
     * 作用：注册(自定义指令)或获取全局指令，name 为指令名(字串命名)，可选参数 definition 为指令作用描述，可以为对象和函数，省略则表示获取所注册的对应指令(也就是注册时的第二个参数definition)
     * 局部指令可在组件声明中通过`directives`选项进行定义(此时配置项的key即作为指令名)，定义方式同全局指令一样
     * */
    // 注册（指令描述对象），当第二个参数不是以对象形式声明而是直接传入的一个function函数时表示的是`bind`和`update`调用钩子
    Vue.directive('my-directive', {
        //下面这些回调函数都包含四个参数：el、binding、vnode 和 oldVnode
        bind: function () {
            //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
        },
        inserted: function () {
            //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
        },
        update: function () {
            //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
        },
        componentUpdated: function () {
            //指令所在组件的 VNode 及其子 VNode 全部更新后调用
        },
        unbind: function () {
            //只调用一次，指令与元素解绑时调用
        }
    });
    // 注册 (指令函数)
    Vue.directive('my-directive', function () {
        // 这里将会被 `bind` 和 `update` 调用
    });
    // getter，返回已注册的指令（即注册时的第二个参数）
    let myDirective = Vue.directive('my-directive');

    /**
     * Vue.filter( name, [definition] ) 方法
     * 作用：注册或获取全局过滤器，name 为过滤器名，可选参数 definition 为该过滤器处理函数(返回处理后的新数据进行显示，但并不改变原数据变量)，省略则表示获取所注册的对应过滤器(也就是注册时的第二个参数definition)
     * 过滤器使用时通过在绑定的数据变量后添加竖线管道符“|”进行分隔的方式：{{ varName | filterName }}，:prop="varName | filterName"；可添加多个过滤器，一次将前面返回的数据传给后面处理：varName | filter1 | filter2
     * 组件中也包含 filter 选项用于定义局部过滤器
     * */
    // 注册
    Vue.filter('my-filter', function (value, [...args]) {
        // 参数 value 为前面要过滤的数据变量或上一个过滤器返回的数据，value是默认传入的，也可以传入额外的参数，在html中使用时只需要传入后面额外的参数即可
        // 返回处理后的值
    });
    // getter，返回已注册的过滤器（就是注册时的第二个参数）
    let myFilter = Vue.filter('my-filter');

    /**
     * Vue.component( name, [definition] ) 方法
     * 作用：注册或获取全局组件。name 为组件名，可选参数 definition 为组件描述对象或构造函数，省略则表示获取所注册的组件(返回组件构造器)
     * 组件中也包含 component 选项用于定义局部组件
     * */
    // 注册组件，传入一个扩展过的构造器
    Vue.component('my-component', Vue.extend({ /* ... */ }));
    // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
    Vue.component('my-component', { template:`<span>组件html模板</span>` });
    // 获取注册的组件 (始终返回构造器)
    let MyComponent = Vue.component('my-component');

    /**
     * Vue.use( plugin, [options] ) 方法
     * 作用：使用安装 Vue.js 插件plugin。如果插件plugin是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入，可选项options会作为第二个参数传给 install 方法
     * 注意：该方法需要在调用 new Vue() 之前被调用，当 install 方法被同一个插件多次调用，插件将只会被安装一次
     * */
    //插件开发与使用参考文档：https://cn.vuejs.org/v2/guide/plugins.html#开发插件

    /**
     * Vue.mixin( mixinObj ) 方法
     * 作用：全局注册一个混入(与组件选项所在对象进行合并)，当组件和混入对象含有同名选项时将按下面的方式合并（Vue.extend()也使用同样的策略进行合并）：
     * 1、数据对象(data)在内部会进行浅合并 (一层属性深度)，在和组件的数据发生冲突时以组件数据优先；
     * 2、同名钩子函数将混合为一个数组，因此都将被调用，且混入对象的钩子将在组件自身钩子之前调用；
     * 3、值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。
     * 须注意：全局混入将影响注册后所创建的每个 Vue 实例，所以要谨慎使用。插件作者可以使用混入，向组件注入自定义的行为，且一般使用自定义选项减少影响vue提供的选项。不推荐在应用代码中使用
     * 组件选项中也提供了 mixins 属性，用于定义局部混入，值为数组可包含多个混入对象
     * */
    //示例可参考文档：https://cn.vuejs.org/v2/guide/mixins.html

    /**
     * Vue.compile( template ) 方法
     * 作用：返回模板字符串的编译结果，因为vue本就会将template模板字符串都编译成render函数，这个方法可以让我们看到一段模板的编译结果，注意：其只在独立构建时有效
     * */
    let res = Vue.compile('<div><span>{{ msg }}</span></div>'); //返回的对象包含 render 和 staticRenderFns 属性，staticRenderFns为数组，保存的是静态内容部分的render函数
    //可参考示例：https://cn.vuejs.org/v2/guide/render-function.html#模板编译


// });