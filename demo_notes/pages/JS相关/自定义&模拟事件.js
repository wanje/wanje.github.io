let el = document.createElement('p');   //创建一个 p 元素

/**================================================ 已过时的创建事件方法 ================================================*/
/**
 * 创建事件方法，document.createEvent(参数)，IE9+支持，IE9以下使用 document.createEventObject() 没有参数
 * 参数为事件类型：UIEvents（一般UI事件）、MouseEvents（鼠标事件）、MutationEvents（一般DOM变动事件）、HTMLEvents（一般HTML事件）、Events（通用事件），DOM2级中使用复数，DOM3级中使用单数
 * DOM3级中还规定了：KeyboardEvent（键盘事件）、CustomEvent（自定义事件）
 * 创建的每个类型的事件对象上都有一个相应的初始化该类型事件的方法，该方法名格式为：init+上面的事件类型名(单数)，如：initUIEvent
 * */
let e = document.createEvent('MouseEvents');

//上面创建的鼠标事件对象上有个 initMouseEvent 方法用于指定该鼠标事件相关的信息，其接收15个参数，如事件名、是否冒泡、能否取消事件、鼠标坐标信息、是否按下了辅助键、按下了哪个鼠标键等等
/**
 * initMouseEvent初始化鼠标事件，参数依次为：
 * type：String，触发的事件类型，如‘click’
 * bubbles：Boolean，事件是否应冒泡，常设为true
 * cancelable：Boolean，能否取消该事件，常设为true
 * view：与事件关联的视图，几乎总设置为 document.defaultView
 * ...
 * */
e.initMouseEvent("click",true,true);     //initEvent()方法用于初始化通用事件，且接收前三个参数，其他信息通过直接给event对象添加属性的方式来描述具体事件信息，但该方法并不能精确模拟事件，可能不会触发某些操作


/**=============================================== 新规范中的创建事件方法 ===============================================*/

//事件初始化信息参数对象(可选)，其实就是把上面已过时方法中init初始化事件方法中第二个参数开始后面所有的参数都放在一个对象中(各属性也是可选的)，避免了以前不好记参数顺序的弊端
//不同事件类型的初始化信息包含的内容有所不同，如鼠标事件有鼠标位置信息，而键盘事件没有鼠标位置信息，但有键码信息等
/** Event 构造器init参数，Event类型为通用类型 */
const eventInit = {
    bubbles: true,      //事件是否应冒泡，默认false
    cancelable: true,   //能否取消该事件，默认false
    composed: false     //事件是否会在影子DOM根节点之外触发侦听器，默认false
};
/** UIEvent 构造器init参数，UIEvent派生自Event */
const UIEventInit = {
    ...eventInit,      //继承 Event 参数
    view: window,      //与事件关联的视图，默认null
    detail: null       //额外的事件详细信息，默认为null，可以是用于存储任意想存储的信息以便在事件处理程序的使用
};
/** MouseEvent 构造器init参数，MouseEvent派生自UIEvent */
const mouseEventInit = {
    ...eventInit,       //继承 Event 参数
    ...UIEventInit,     //继承 UIEvent 参数
    screenX: 0,         //鼠标事件发生时相对于用户屏幕的水平坐标位置；该操作并不会改变真实鼠标的位置，默认0
    screenY: 0,         //鼠标事件发生时相对于用户屏幕的垂直坐标位置；该操作并不会改变真实鼠标的位置，默认0
    clientX: 0,         //鼠标事件发生时相对于客户端可视窗口的水平坐标位置；该操作并不会改变真实鼠标的位置，默认0
    clientY: 0,         //鼠标事件发生时相对于客户端可视窗口的垂直坐标位置；该操作并不会改变真实鼠标的位置，默认0
    ctrlKey: false,     //标明 Ctrl 键是否同时按下，默认false
    shiftKey: false,    //标明 Shift 键是否同时按下，默认false
    altKey: false,      //标明 Alt 键是否同时按下(Mac上同option键)，默认false
    metaKey: false,     //标明 meta 键是否同时按下，默认false，该键一般键盘上没有，Mac上用command表示，Windows上一般用窗口键(印有Windows logo那个键)模拟
    button: 0,          //鼠标哪个键被按下，默认0，0为主键(一般是左键)，1为辅助键(中键)，2为次键(右键)
    buttons: 0,         //鼠标哪些键被按下，默认0，0为无键按下，1为主键(左)，2为次键(右)，4为辅助键(中)
    relatedTarget: null,//事件相关元素，默认null，标明刚离开的元素 (事件 mouseover 发生时) 或刚进入的元素 (事件 mouseout 发生时)，即当前元素触发鼠标进入或离开事件时，那么这时鼠标必然是相对前一个元素的离开或下一个元素的进入才触发这个元素的进入/离开事件，这前一个或下一个元素就是相关元素
    region: null        //事件影响范围，默认null，标明点击事件影响的区域DOM的id，不影响任何区域的话请传null值
};

/**
 * 其实就是将以前创建某类型事件与初始化具体事件两步方法合并到一步中，并将事件信息参数都放到一个对象参数中设置，不用记住参数顺序，更加方便
 * 第一个参数为事件名，第二个“可选”参数为事件信息参数对象
 * 这里的new后面的构造器代表了事件类型， Event 表示创建的是通用事件实例，除此之外还有：MouseEvent（鼠标事件）、CustomEvent（自定义事件）、UIEvent（一般UI事件）、KeyboardEvent（键盘事件）、MutationEvent（一般DOM变动事件）、HTMLEvent（一般HTML事件）
 * */
let event = new Event('eventName', eventInit);


/**===================================================================================================================*/
/**========================== 不管是新规范还是已过时规范，手动触发事件都是使用 dispatchEvent() 方法 ==========================*/
/**===================================================================================================================*/
//上面创建的事件都是可以像内置事件一样去监听的
//在el元素上触发 e 事件对象对应的事件
/**
 * 触发事件方法，DOM对象.dispatchEvent(event对象)，IE9+支持，IE9以下使用 document.fireEvent(事件名称[要加on], event对象)
 * */
el.dispatchEvent(e);


/**========= IE9下对新规范自定义事件的Polyfill处理 =========*/
!function(){
    try{
        new window.CustomEvent('T');

    }catch(e){
        let CustomEvent = function(event, params){
            params = params || { bubbles: true, cancelable: true, detail: null };

            let evt = document.createEvent('CustomEvent');

            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

            return evt;
        };

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    }
}();
//自执行后可直接使用 new CustomEvent('eventName') 方式创建事件

/**========= IE8及以下浏览器中自定义/模拟事件 =========*/
!function(){
    try{
        //新规范方式
        new window.CustomEvent('T');

    }catch(e){
        let CustomEvent;

        try {
            //就规范方式（IE9+支持）
            CustomEvent = function(event, params){
                params = params || { bubbles: true, cancelable: true, detail: null };

                let evt = document.createEvent('CustomEvent');

                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

                return evt;
            };

        }catch (err){
            //IE8及以下方式
            CustomEvent = function(event, params){
                //创建一个event对象，该方法不接收任何参数，必须后面手动为该event对象添加属性来增添事件信息(任何属性皆可，毕竟在事件处理程序中才会用到这些信息)
                let evt = document.createEventObject();   //对应IE8-触发事件的方法为：el.fireEvent('on'+eventName, eventObj)，此时注意事件名要加上‘on’

                if (params){
                    //将添加的事件信息设置到event对象上
                    for (let key in params){
                        evt[key] = params[key];
                    }
                }

                return evt;
            };

        }

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    }
}();
//自执行后可直接使用 new CustomEvent('eventName') 方式创建事件

/**
 * 兼容IE8的创建指定事件类型和事件名的方法
 * @param eventType  事件类型
 * @param eventName  具体事件名
 * @param eventParams   事件参数对象
 * @returns {*}     返回事件对象
 */
function createEvent(eventType, eventName, eventParams) {
    let eventObj = null;
    eventParams = eventParams || { bubbles: true, cancelable: true, detail: null };

    try {
        //新规范
        eventObj = new window[eventType](eventName, eventParams);

    }catch (err){
        try {
            //旧规范（IE9+支持）
            eventObj = document.createEvent(eventType);
            if(typeof eventParams.detail === 'undefined') eventParams.detail =  null;

            eventObj['init'+eventType](eventName, eventParams.bubbles, eventParams.cancelable, eventParams.detail);

        }catch (error){
            //IE8及以下方式
            eventObj = document.createEventObject();

            if (params){
                //将添加的事件信息设置到event对象上
                for (let key in params){
                    eventObj[key] = params[key];
                }
            }
        }
    }

    return eventObj;
}
/**
 * 兼容IE8的事件触发
 * @param el    触发事件的DOM元素
 * @param eventName     触发的具体事件名
 * @param eventObj      对应的自定义事件对象
 */
function dispatchEvent(el, eventName, eventObj) {
    if (el.dispatchEvent){
        el.dispatchEvent(eventName)

    }else {
        el.fireEvent('on'+eventName, eventObj);  //fireEvent为IE8-触发事件方法，注意事件名要加上‘on’
    }
}