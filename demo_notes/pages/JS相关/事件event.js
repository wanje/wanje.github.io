let el = document.getElementById('btn');
function foo() {
    console.log(this);
}

/**===== HTML事件处理程序 =====*/
`<input type="text" onfocus="foo()" onblur="alert(event.type, this.value)" />`;
//直接在HTML元素上通过attribute属性的方式绑定事件时，其值实际是字符串形式的JS代码段，就像eval方法一样，
//该代码段执行时有权访问全局作用域下的任何js代码，也可直接访问事件对象event和指向该事件目标元素的this关键字，且不用自己定义，也不用从函数的参数列表中读取

/**===== DOM0级事件处理程序 =====*/
el.onclick = foo; //绑定事件处理程序，在事件冒泡阶段响应，foo中的this指向当前元素el
el.onclick = null; //移除事件处理程序

/**===== DOM2级事件处理程序（IE9+支持） =====*/
el.addEventListener('click', foo, false); //绑定事件处理程序(可绑定多个，同类型按绑定顺序响应)，接收三个参数，最后一个参数表示事件响应阶段，true为捕获阶段响应，false为冒泡阶段响应，默认false，foo中的this指向当前元素el
el.removeEventListener('click', foo, false); //移除事件处理程序，必须与addEventListener参数完全相同才能移除对应事件处理程序(函数要为同一引用，意味着不能移除绑定的匿名事件处理函数，即使再定义个相同的匿名函数也不行，因为不是同一引用)
//注意，若绑定多个程序就要分别多次移除，不存在省略函数名或者事件名就移除所有对应素有事件处理程序的功能

/**===== IE独有事件处理程序（IE10-支持） =====*/
el.attachEvent('onclick', foo); //绑定事件处理程序(可绑定多个，但同类型按绑定顺序逆序响应)，接收两个参数，注意该方法foo中的this指向的是window对象
el.detachEvent('onclick', foo); //移除事件处理程序，必须与attachEvent参数完全相同才能移除对应事件处理程序(同DOM2级事件处理程序一样不能移除绑定的匿名事件处理函数)
//注意，该IE独有方法中的事件名前面要加“on”，且foo中的this指向的是window对象


/** DOM2级事件规定事件流分为三个阶段：捕获阶段、处于目标阶段、冒泡阶段，在事件处理程序中处于目标阶段也被看作是冒泡阶段的一部分 */

/**===================================================================================================================*/
/**==================================================== Event对象 ====================================================*/
/**===================================================================================================================*/
/*
* 事件event对象中包含着所有与事件相关的信息，包括事件源、类型及其他特定事件相关信息，不同事件类型包含的可用属性和方法也不一样，但也有一些所有事件类型通用的属性和方法
* 将event对象作为参数传递给事件处理函数，在处理函数内部使用，但在IE8及以下需要通过全局变量event才能得到，所以兼容写法为：event = event || window.event
* event对象只有在事件处理程序执行期间才存在，一旦事件处理程序执行完成，event对象就会被销毁
* */
/** DOM规范中Event对象内通用属性和方法，注意它们都是只读的 */
let standardEventCommonPops = {
    bubbles: '布尔值，表明该事件是否冒泡',
    cancelable: '布尔值，表明是否可以取消该事件的默认行为',
    currentTarget: '元素，指向事件处理程序绑定到的那个元素，即JS中直接注册(绑定)事件的那个元素，事件处理函数中 this 关键字的值与该属性相同',
    defaultPrevented: '布尔值，为true则表示已调用了preventDefault()方法，否则没有，为DOM3级事件中新增属性',
    detail: '整数，与事件相关的细节信息',
    eventPhase: '整数，表示调用事件处理程序的阶段(也即触发阶段)：1为捕获阶段，2为处于目标，3为冒泡阶段',
    target: '元素，事件的目标元素，即实际触发该事件的元素(不一定是JS中注册事件的那个元素，因为可能是事件代理)',
    trusted: '实测浏览器中为“isTrusted”，布尔值，为true表示事件是浏览器生成或用户触发，为false表示事件是由开发人员通过JS创建而成，为DOM3级事件中新增属性',
    type: '字符串，被触发事件的类型，实际为事件名',
    view: 'AbstractView，与事件关联的抽象视图，等同于发生事件的window对象',
    preventDefault(){
        //preventDefault()方法用于取消事件的默认行为，若cancelable为true，该方法有效
    },
    stopPropagation(){
        //stopPropagation()方法用于阻止事件进一步捕获或冒泡，若bubbles为true，该方法有效
    },
    stopImmediatePropagation(){
        //stopImmediatePropagation()方法用于阻止事件进一步捕获或冒泡，同时阻止任何任何事件处理程序被调用，为DOM3级事件中新增方法
    }
};
/** IE中Event对象内通用属性和方法 */
let ieEventCommonPops = {
    cancelBubble: '布尔值，可读可写，默认false，设为true可取消事件冒泡，与DOM规范中stopPropagation()方法作用相同',
    returnValue: '布尔值，可读可写，默认true，设为false可取消事件的默认行为，与DOM规范中preventDefault()方法作用相同',
    target: '元素，只读，事件的目标元素，与DOM规范中的target属性相同',
    type: '字符串，只读，被触发事件的类型'
};

/*
 * 事件源可通过 target 属性得到，但IE8及以下是通过 srcElement 属性，所以兼容写法为：target = event.target || event.srcElement
 * IE8及以下不支持事件捕获，只存在事件冒泡
 */
function handler(event) {
    event = event || window.event;
    let target = event.target || event.srcElement;

}

/**===================================================================================================================*/
/**===================================================== 事件类型 =====================================================*/
/**===================================================================================================================*/
//确定浏览器是否支持DOM2级事件规定的HTML事件，可使用如下方法，注意是遵循规范实现的才返回true，非标准实现的则会返回false
//除了HTML事件“HTMLEvents”，还有变动事件“MutationEvents”
let isDOM2HTMLEvents = document.implementation.hasFeature("HTMLEvents", "2.0");     //DOM2级事件类型为复数

//确定浏览器是否支持DOM3级事件规定的UI事件，可使用如下方法，注意是遵循规范实现的才返回true，非标准实现的则会返回false
//除了UI事件“UIEvent”，还有焦点事件“FocusEvent”、鼠标事件“MouseEvent”、复合事件“CompositionEvent”
let isDOM3UIEvent = document.implementation.hasFeature("UIEvent", "3.0");   //DOM3级事件类型为单数

/**====================================================== UI事件 ======================================================*/
/* load、unload、abort、error、select、resize、scroll 等 */

/* 在window对象上发生的事件都可以放在html中body标签上绑定 */
/**
 * load 事件
 * 1、页面完全加载后（包括所有图像、JS文件、CSS文件等外部资源）在window上触发（实际DOM2级规定应在document上触发，但所有浏览器都在window上实现了该事件），event.target将指向document
 * 2、所有框架都加载完毕时在框架集上触发，或者框架加载完成后在该框架上触发
 * 3、图像加载完毕时在<img>元素上触发（不管是DOM中的图像元素还是HTML中的图像元素都可以），JS中可以使用Image对象创建图像，就像直接使用img元素一样，只是其不能添加到DOM树中(不能像创建的img标签插入到文档中)
 * 4、嵌入内容加载完毕时在<object>元素上触发
 * 5、script标签也可以触发load事件，但其不像img图像只要设置了src属性就开始下载，script要设置了src属性并添加到文档后才开始下载（IE9+支持）
 * */

/**
 * DOMContentLoaded 事件（IE9+）
 * 页面形成完整的DOM树之后就会触发该事件（可在window和document上绑定该事件），event.target将指向document，该事件始终在 load 事件之前发生
 * */

/**
 * unload 事件
 * 页面文档完全卸载后在window上触发（实际DOM2级规定应在document上触发，但所有浏览器都在window上实现了该事件），event.target将指向document
 * */

/**
 * beforeunload 事件
 * 该事件在浏览器卸载页面前触发（关闭标签和重新加载页面时都可以触发），可用于取消卸载操作（由用户选择）
 * 要触发弹出让用户选择是否离开当前页面的弹框必须要将 event.returnValue 设置为要显示给用户的字符串(IE)，或者返回这些字符串(Chrome等)，但实测发现可以触发弹框但显示的文本是浏览器自带的
 * */

/**
 * resize 事件
 * 当浏览器窗口尺寸发生改变时(包括最大/小化时)在window上触发（实际DOM2级规定应在document上触发，但所有浏览器都在window上实现了该事件），event.target将指向document
 * */

/**
 * scroll 事件
 * 1、虽然scroll滚动事件发生在window对象上触发，但实际表示的则是页面中元素的变化而不是窗口的变化，
 * 可通过window.pageYOffset和window.pageXOffset来获取窗口垂直或水平滚动距离(IE9+)，另外也可标准模式下可通过<html>元素(document.documentElement)的scrollTop或scrollLeft反映滚动距离，混杂模式下则是<body>元素(document.body)上
 * 2、其他内部可滚动的元素上也可以出发scroll事件，只要绑定对象有滚动就会触发
 * */

/**===================================================== 焦点事件 =====================================================*/
/* 包括：focus、blur、focusin、focusout 等 */

/*
* focus 和 blur 事件都不会冒泡
* */

/**
 * focusin 事件
 * 元素获得焦点时触发，与focus事件等价，但该事件要冒泡
 * */

/**
 * focusout 事件
 * 元素失去焦点时触发，该事件是blur事件的通用版本
 * */

/*
 * document.hasFocus()
 * document.activeElement
 * */

/**===================================================== 鼠标事件 =====================================================*/
/* 包括：click、dbclick、mousedown、mouseup、mouseenter、mouseleave、mouseover、mouseout、mousemove、wheel/mousewheel/DOMMouseScroll、contextmenu 等 */

/*
* 除了 mouseenter 和 mouseleave，其他所有鼠标事件都会冒泡，也可被取消
* 只有相继触发 mousedown 和 mouseup 事件，才会触发 click 事件，若前面两个事件任何一个被取消都不会触发 click 事件，同样要触发两次click才会触发dbclick
* 鼠标点击触发顺序：mousedown > mouseup > click > mousedown > mouseup > click > dbclick，
* */

/*
* 关于鼠标位置信息(event对象上)
* clientX 和 clientY 表示鼠标相对浏览器客户可视区的坐标（即内容窗口）
* pageX 和 pageY 表示鼠标相对页面文档（整个页面本身）的坐标，在页面没有滚动的情况下其值与clientX/clientY相同，IE8-不支持页面坐标，不过可用客户区坐标和页面滚动距离计算出来
* screenX 和 screenY 表示鼠标相对整个设备屏幕的坐标
* */

/*
* 关于鼠标按键信息(event对象上)，鼠标点击、按下、弹起事件中具备该属性
* button 属性返回鼠标按键对应键值，DOM规范中：0为主键(左)、1为中键(滚轮)、2为次键(右)
* IE8下的键值与DOM规范中的差异较大，为兼容可将其规范化为DOM方式（参考‘事件JS兼容.js’文件中getButton()方法）
* */

/*
* detail 属性在鼠标事件中的作用
* 该属性是DOM2级事件中提供事件更多信息的属性，在鼠标事件中表示在同一目标上连续发生了多少次单击(click)，
* 注意是连续点击时次数才会递增记录，有所停顿就会又从1开始，且该属性在鼠标点击、按下、弹起过程中都能检测，并不只是click点击时才能检测，因此可通过该属性判断单击、双击、三击等等
* */

/**
 * wheel 鼠标滚轮滚动事件，IE9+支持，主流浏览器也都支持，另外Chrome下有非标准 mousewheel ，Firefox有非标准 DOMMouseScroll，
 * 该事件可在任何元素上触发，最终会冒泡到 window 对象或 document 对象上(IE8)
 * UI事件中scroll滚动事件只要绑定对象有滚动就会触发，而鼠标滚动事件只有通过鼠标相关设备触发滚动时才触发(例如拖动滚动条就只会触发滚动事件，而不会触发鼠标滚动事件)
 * */

/*
* wheelDeltaX/wheelDeltaY 属性判断对应方向鼠标滚动方向（具体正负对应的方向可打印对比来判断）
* 当鼠标滚轮向上滚动时，该属性是‘+120’的倍数，向下滚动时则是‘-120’的倍数，因此可以根据 wheelDelta 属性的正负来判断滚轮滚动方向（多数情况下我们只需要知道滚动方向，因为该数值没特殊含义）
* 对于Firefox的DOMMouseScroll事件，该信息保存在 detail 属性中，且其值是‘3’的倍数，正负号也刚好相反，即向上滚为‘-3’倍数，线下滚为‘+3’倍数（兼容处理参考‘事件JS兼容.js’文件中getWheelDelta()方法）
*
* wheel 标准事件中可以通过`deltaX/deltaY`属性的正负判断对应方向上的滚动方向（具体正负对应的方向可打印对比来判断）
* */

/**
 * mouseover 与 mouseenter 的区别：over是鼠标从其他元素上面移到事件元素身上就触发(是直接身上，所以鼠标在其子元素上面时表明已out)，而enter是鼠标进入事件元素的边界时触发(内部子元素也在边界内，所以不会多次触发)
 * mouseout 与 mouseleave 的区别：mouseout为鼠标移出事件元素身上，对应mouseover，而mouseleave为鼠标离开事件元素边界，对应mouseenter
 * mouseenter 和 mouseleave 类似于css中的 hover 效果
 * */

/**
 * contextmenu 上下文菜单事件
 * 该事件一般右键调出当前窗口菜单项时触发（在Mac上 Ctrl+左键点击也可调出菜单项），可用于阻止默认菜单而显示自定义的菜单，该事件可冒泡，所以可以放在document上统一处理该事件
 * */

/**================================================= 键盘与文本输入事件 =================================================*/
/* 键盘事件包括：keydown、keypress、keyup；文本输入事件只有：textInput */

/**
 * keydown 事件
 * 用户按下键盘上“任意键”时可触发，若按住不放则会重复触发该事件
 * 相对的就是 keyup 事件，当用户释放按键时触发
 * */

/**
 * keypress 事件
 * 该事件是用户按下键盘上“字符键”时可触发，若按住不放则会重复触发该事件，按下“Esc”退出键时也会触发该事件
 * 注意，这三个键盘事件发生顺序是：keydown > keypress > keyup，且前两个事件都是在文本框放生变化前被触发的，而 keyup 是文本框发生变化后被触发的
 * */

/**
 * textInput 文本事件
 * 该事件是对keypress事件的补充，在文本插入文本框之前会触发该事件，虽是keypress事件的补充，但也所区别：
 * 1、任何可获得焦点的元素都可触发 keypress 事件，但只有可编辑区域才能触发 textInput 事件；
 * 2、textInput 事件只会在用户按下能够输入实际字符的键时才会触发，而 keypress 事件则在按下那些能够影响文本显示的键时也会触发（例如删除键）
 * 3、实测发现：在打完拼音按空格键确认键入汉字时不会触发keypress事件，但能触发 textInput 事件
 *
 * 该事件event对象上还包含以下属性：
 * data：返回用户输入的字符（注意是实际显示的字符，不是字符编码）；
 * inputMethod：数字，返回把文本输入到文本框的方式，但该属性目前只有IE支持
 * */

/*
* keyCode 属性返回按键的键码，每个按键都对应一个键码，通过键码可以知道按下的是哪个键
* keydown 和 keyup 事件中可检测该属性
* */

/*
* charCode 属性返回按键的字符编码(ASCII编码)，字符编码意味着应在 keypress 事件中检测该属性（能插入或删除字符的键都会触发keypress事件）
* IE8下是在keyCode属性中保存字符的ASCII编码编码，所以要考虑IE8下兼容写法（参考‘事件JS兼容.js’文件中getCharCode()方法）
* 取得字符编码后，就可以使用 String.fromCharCode() 方法将其转换为实际的字符
* */

/*
* DOM3级中键盘事件变化
* 1、去掉了 CharCode 属性；
* 2、新增了 key 和 char 属性，key为取代keyCode，返回按键字符或键名；char在按下字符键时与key相同，非字符键时返回null；
* 3、新增了 location 属性，表示按下了什么位置上的键；
* 4、新增了 getModifierState() 方法，接受一个参数，传入Shift、Control、AltGraph、Meta关键字之一，检测对应修改键是否被激活，实际已有像shiftKey这样的属性能检测这些辅助按键；
* 由于各浏览器兼容问题，这些属性或方法有的有实现，有的没实现，各浏览器兼容性不一，所以不建议使用它们
* */

/**================================================= 复合事件（DOM3级） =================================================*/
/*
* 复合事件包括：compositionstart、compositionupdate、compositionend，IE9+支持
* 复合事件用于处理输入法编辑器(IME)的输入序列，输入法编辑器(我们常说的输入法)可让用户输入在物理键盘上找不到的字符，例如我们的键盘为英文键盘，但我们通过IME(如搜狗输入法)可以输入汉字，
* IME通常需要按多个建，但最终只输入一个字符(就像我们输入一个汉字要按多个键打出拼音，但最后实际在文本框中输入的只是一个汉字)，复合事件就是用于处理这样的输入而设计的。
* 注意：很多输入法可以在多种输入状态中切换，只有在复合输入中能触发复合事件，像在英文状态下这样一个键就能输入一个字符的情况时是不能触发复合事件的。
* */

/**
 * compositionstart 事件
 * 该事件在复合输入开始时触发，表示要开始输入了
 * event.data 属性返回正在编辑的文本，如已经选中的正要被当前键入内容替换的文本
 * */

/**
 * compositionupdate 事件
 * 该事件在向输入字段中插入新字符时触发，表示正在输入，Chrome实测输入拼音过程中没按下一个字母就会触发一次，最后键入汉字时也会触发；
 * event.data 属性返回正在插入的新字符（实测发现键入拼音过程中也会返回拼音）
 * */

/**
 * compositionend 事件
 * 该事件在向输入字段中插入新字符完毕时触发，表示该阶段复合输入完毕，Chrome实测最后键入汉字时才触发该事件，输入拼音过程中不会触发；
 * event.data 属性返回当前键入的文本（不包含拼音键入过程）
 * */

/**================================================= (DOM节点)变动事件 =================================================*/
/*
* DOM2级中的变动事件包括：DOMSubtreeModified、DOMNodeInserted、DOMNodeRemoved、DOMNodeInsertedIntoDocument、DOMNodeRemovedFromDocument、DOMAttrModified、DOMCharacterDataModified
* IE9+支持，由于DOM3级事件废除了很多变动事件（由 MutationObserver 替代），下面主要介绍仍得到支持或可能用到的变动事件
* 由于DOMSubtreeModified、DOMNodeInserted、DOMNodeRemoved可冒泡，所以可以绑定到祖先元素或者document上来监听DOM节点内部变动
* */

/**
 * 删除节点
 * 使用removeChild()或replaceChild()等方法从DOM中删除节点时，首先会触发：
 * 1、DOMNodeRemoved 事件，该事件可冒泡，其目标target指向被删除的节点，相关节点relatedNode指向目标节点的父节点；该事件触发时，节点还未从其父节点删除，所以其parentNode这时还与relatedNode一样指向父节点。
 * 若被移除节点包含子节点，则该节点及其所有子节点还会相继触发：
 * 2、DOMNodeRemovedFromDocument 事件，该事件不冒泡，所以只有直接注册了该事件的节点会响应，其目标target指向被删除的节点或子节点。
 * 最后触发：
 * 3、DOMSubtreeModified 事件，该事件可冒泡，其目标target指向被移除节点的父节点
 * */

/**
 * 插入节点
 * 使用appendChild()、replaceChild()或insertBefore()等方法向DOM中插入节点时，首先会触发：
 * 1、DOMNodeInserted 事件，该事件可冒泡，其目标target指向被插入的节点，相关节点relatedNode指向目标节点的新父节点；该事件触发时，节点已被插入到新的父节点中，所以其parentNode这时还与relatedNode一样指向新父节点。
 * 紧接着触发：
 * 2、DOMNodeInsertedIntoDocument 事件，该事件不冒泡，所以要在插入节点前就为其注册该事件，其目标target指向被插入的节点。
 * 最后触发：
 * 3、DOMSubtreeModified 事件，该事件可冒泡，其目标target指向被插入节点的父节点
 * */

/*
* <body>
*     <ul>
*         <li>item1</li>
*         <li>item2</li>
*     </ul>
* </body>
*
* 假设在上面这个简单HTML页面中，我们要移除 ul 元素，就会依次触发以下事件：
* 1、ul 元素上触发 DOMNodeRemoved 事件，relatedNode 指向 document.body；
* 2、ul 元素上触发 DOMNodeRemovedFromDocument 事件；
* 3、在身为ul子元素的每个li元素及文本节点上触发 DOMNodeRemovedFromDocument 事件；
* 4、在 document.body 上触发 DOMSubtreeModified 事件，因为 ul 是 document.body 的直接子元素。
*
* 仍以上面的HTML结构为例，若我们动态增加了一列item3，就会依次触发以下事件：
* 1、在新增的item3项 li 元素上触发 DOMNodeInserted 事件，relatedNode 指向 ul；
* 2、在新增的item3项 li 元素上触发 DOMNodeInsertedIntoDocument 事件；
* 3、在 ul 元素上触发 DOMSubtreeModified 事件。
* */

/**===================================================== HTML5事件 =====================================================*/
/* 其包含较多事件，因为在HTML5中新规范的事件都可以叫HTML5事件，这些事件可能属于其他事件分类，下面只介绍部分 */

/**
 * hashchange 哈希改变事件（IE8+）
 * 只要URL的参数列表hash值改变（URL中“#”后面的所有字符串）就会触发该事件，且必须在 window 对象上注册该事件
 * event对象上额外包含两个属性：oldURL、newURL，即参数列表变化前后的完整URL，因IE不支持这两个新属性，所以最好使用 location 对象来确定当前参数列表
 * */

/**============================================= 设备事件（主要针对移动设备） =============================================*/
/* 以下介绍的几个事件已在Android上实测可用 */

/**
 * orientationchange 设备屏幕显示方向改变事件（横竖屏）
 * 设备在竖屏与横屏间切换时会在window上触发该事件，window.orientation 属性返回一个数值反映了屏幕方向，竖屏时为‘0’，左旋转横屏时为‘90’，右旋转横屏时为‘-90’，头部朝下本应为‘180’(但似乎没设备实现屏幕颠倒)
 * 注意：此处说的是屏幕显示方向，当使用手机方向锁定后旋转手机时屏幕不会跟着旋转也就不会触发该事件了，且 window.orientation 的值也不会改变
 * */

/**
 * deviceorientation 设备方向改变事件（设备各角度旋转）
 * 设备方向改变时在window上触发该事件（指x、y、z各方向旋转时，即设备朝向改变），此时设备的三维直角坐标系为(竖屏)：向右为X轴正方向、向上为Y轴正方向、从屏幕内向外为Z轴正方向，当设备静止放在水平面上时，这三个值都为‘0’
 * 注意：此处说的是设备方向，而不是屏幕显示方向，设备稍微有点旋转就会触发该事件，而且不受手机方向锁定的影响
 * 该事件的事件对象event中包含以下5个属性：
 * 1、alpha：绕 Z 轴旋转时(即左右摇动)的旋转角度，为 0 ~ 360 间的浮点数；
 * 2、beta：绕 X 轴旋转时(即上下翻转)的旋转角度，为 -180 ~ 180 间的浮点数；
 * 3、gamma：绕 Y 轴旋转时(即前后侧边翻转)的旋转角度，为 -90 ~ 90 间的浮点数；
 * 4、absolute：布尔值，表示设备是否返回一个绝对值；
 * 5、compassCalibrated：布尔值，表示设备的指南针是否校准过。
 *
 * 由三个方向的角度可以映射出方向向量
 * */

/**
 * devicemotion 设备移动事件
 * 设备移动时在window上触发该事件，可用于检测设备是否在往下掉或者移动快慢
 * 该事件的事件对象event中包含以下几个属性：
 * 1、acceleration：一个包含x、y、z属性的对象，表示不考虑重力情况下各方向上的加速度；
 * 2、accelerationIncludingGravity：也是一个包含x、y、z属性的对象，但表示在考虑Z轴重力加速度情况下各方向上的加速度；
 * 3、rotationRate：一个包含alpha、beta、gamma属性的对象，表示方向（由三个方向的角度可以映射出方向向量？）；
 * 4、interval：以毫秒表示的时间值（刷新一帧的时间，帧率一般为60，所以其值一般为16.666），必须在另一个devicemotion事件触发前传入，该值在每个事件中应该是个常量；
 * */

/**=================================================== 触摸与手势事件 ===================================================*/
/* 触摸事件包含：touchstart、touchmove、touchend、touchcancel；手势事件包含(实测Android还不支持)：gesturestart、gesturechange、gestureend */

/**
 * touchstart，手指触摸屏幕时触发，每次触摸都会触发；
 * touchmove，手指在屏幕上滑动时会连续触发，可阻止默认滚动；
 * touchend，手指从屏幕上抬起时触发；
 * touchcancel，当系统停止跟踪触摸操作时触发，实测为触摸后长时间停留却又未作任何移动操作就抬起手指时会触发，类似于长按操作。
 *
 * 这几个事件都会冒泡，也都可以取消，event 对象除包含鼠标事件一些常见属性外，还包含三个用于跟踪触摸的属性：
 * 1、touches：表示当前跟踪的触摸操作的 Touch 对象的数组；
 * 2、targetTouches：特定于事件目标的 Touch 对象的数组；
 * 2、changeTouches：表示自上次触摸以来发生了一些改变的 Touch 对象的数组；
 *
 * 每个 Touch 对象包含以下属性：
 * clientX、clientY、pageX、pageY、screenX、screenY、target、identifier(标识触摸的唯一ID)
 * */



/* ========= 表单事件 ========= */
/**
* 当提交表单和重置表单时，<form>元素会分别触发 submit 和 reset 事件
* 当用户通过输入文字、选择选项或选择复选框来改变相应表单元素的状态时，这些通常维护某种状态的表单元素会触发 change 事件，对于文本输入域(包括单行和多行)只有失去焦点时才会触发 change 事件
* 通过键盘可改变焦点(即通过tab键可得到焦点)的元素在得到和失去焦点时会分别触发 focus 和 blur 事件， focus 和 blur 事件不会冒泡，其他所有表单事件都可以，另外IE定义了focusin和focusout事件可冒泡，但其他浏览器还未形成统一标准
* 无论用户输入还是粘贴文字到文本输入表单元素中，除IE外的浏览器都会触发 input 事件，且每次插入文字都会触发，另外 textinput 事件也可成为input的事件的替代方案
* */

/**=================================================== 其他事件 ===================================================*/
/** 
 * visibilitychange 事件（IE10+）
 * 该事件表示当其选项卡的内容变得可见或被隐藏时(即浏览器切换标签时)，会在文档上触发 visibilitychange (能见度更改)事件
 * 该事件只能在document上触发，且只能用addEventListener进行事件绑定，可通过 document.visibilityState 属性判断当前文档的可见性，其值为`visible`或`hidden`
 */