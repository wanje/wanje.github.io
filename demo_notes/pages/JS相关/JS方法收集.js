/**
 * Created by wanje on 2017/10/16.
 */

/**
 * 特殊正则表达式收集
 */
const commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg;    //匹配js中的注释符号及其文本，包括/**/形式，和//形式
const reg_tag = /(<\w[\w-]*)([\s>])/g;    //匹配HTML标签和自定义标签
const reg_class = /(\s+class=["'][^"']*)(["'][^<]*>)/g;    //匹配标签上的class及其值


/**
 * 数据类型检测
 * 使用对象的toString方法可以检测出数组、函数、正则等具体数据类型，还有错误对象error，甚至可以检测函数参数类数组Arguments
 * 用toString.call得到的结果是'[object Array]'形式的，通过分隔只取后面部分，并转为小写
 * @param value 需要检测类型的值
 * @returns {*} 返回数据类型，其结果已都转换为小写
 * IE6/7/8中Object.prototype.toString.apply(null或undefined);返回”[object Object]”，所以在判断是否是null或undefined时可直接将数据与他们进行比较
 */
function testDataType(value) {
  // var _toString = {}.toString,
  //     type = _toString.call(value).split(' ')[1].split(']')[0].toLowerCase();
  // return type;
  return Object.prototype.toString.call(value).split(' ')[1].split(']')[0].toLowerCase();
}
// console.log([[],{},/ab/,'a',7,undefined,null,true,function(){},new Date()].map(testDataType));
// 上面输入结果：["array", "object", "regexp", "string", "number", "undefined", "null", "boolean", "function", "date"]


/**
 * 对象合并
 * 将资源对象source的属性或方法合并到目标对象target上，
 * @param target  目标对象
 * @param source  资源对象
 * @param force   是否强制覆盖同名属性          --默认或force为false的时候，同名属性将不会覆盖，若将force置为true则资源属性将强制覆盖目标同名属性
 * @param deepStringMixin   是否进行深度拷贝   --默认或deepStringMixin为false的时候，不会进行深拷贝，若将其置为true，则属性值为对象的也将深度合并，但也需在force置为true时才有意义和有效
 * @returns {*}
 */
function mixin(target, source, force, deepStringMixin) {
  if (source) {
    eachProp(source, function (value, prop) {
      if (force || !hasProp(target, prop)) {  /*如果目标对象没有该属性，或者强制合并force为true*/

        /*深度合并为true，且属性值类型为对象object，且属性值不是空对象、不是数组、不是函数、不是正则表达式，即属性值是个纯对象时*/
        if (deepStringMixin && typeof value === 'object' && value &&
          !isArray(value) && !isFunction(value) &&
          !(value instanceof RegExp)) {

          /*若目标对象中没有该属性，则为其创建一个并赋值为空对象{}，这里不能直接将对象值赋给目标对象新创建的属性，只能通过深度拷贝赋值才不会指向同一个地址*/
          if (!target[prop]) {
            target[prop] = {};
          }
          /*递归调用，进行深度合并，注意若目标对象的该属性值不是对象则拷贝不会成功*/
          mixin(target[prop], value, force, deepStringMixin);

          /*不是深度合并时*/
        } else {
          target[prop] = value;
          /*这里若值是对象，这目标属性和资源属性的值将指向同一个地址，修改一个值另一个值也将改变*/
        }
      }
    });
  }
  return target;
}


/**
 * 虚拟链接点击跳转，自定义页面跳转
 * 若要设定在什么位置打开，则可以使用window.open(url,'_blank')方法，或者创建 a 标签来跳转
 */
$(document).on('click', '[data-href]', function (event) {
  event.preventDefault();
  var url = $(this).attr('data-href');
  if (url && url.length) {
    window.location.href = url;     //该方法是在当前标签打开
  }
});

/**
 * 数据深拷贝
 * @param obj  拷贝对象
 * 参考：https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript?answertab=votes#tab-top
 * 对于内部不包含函数、Date对象、RegExp对象及其他new实例化对象值的数组或对象可使用：JSON.stringify() 和 JSON.parse() 方法进行深拷贝
 * 浅拷贝：Object.assign()
 */
function deepCopy(item) {
  if (!item) {
    return item;
  } // null, undefined values check

  var types = [Number, String, Boolean],
      result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result === "undefined") {
    if (Object.prototype.toString.call(item).split(' ')[1].split(']')[0] === "Array") {
      result = [];
      item.forEach(function (child, index, array) {     //注意数组的forEach()方法IE9+才支持
        result[index] = deepCopy(child);
      });
    } else if (typeof item === "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode === "function") {
        result = item.cloneNode(true);    //拷贝DOM节点(原生方法)
      } else if (!item.prototype) { // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        }
        if (item instanceof RegExp) {
          result = new RegExp(item);
        } else {
          // it is an object literal
          result = {};
          for (var i in item) {
            result[i] = deepCopy(item[i]);
          }
        }
      } else {
        // depending what you would like here, just keep the reference, or create new object
        if (false && item.constructor) {
          //stackoverflow上作者此处的意图是若拷贝通过自定义构造器实例化得到的对象(new方式，包括函数，甚至该对象实例化时可能还存在传参)时可能导致更复杂的问题，
          //所以才说这里如何处理就看个人想要什么样的拷贝，并建议不这样去拷贝上面说的实例化得到的对象，要完善还是需要自己去封装所有规范并提供合适的API来专注做这事
          // would not advice to do that, reason? Read below
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else if (typeof item === "function") {  //字面量函数（非new的方式），对于一般的对象拷贝应该没必要对function进行特殊处理，对于使用JSON方法拷贝的话可以这样处理函数
      result = eval(item.toString());

    } else {
      result = item;
    }
  }

  return result;
}

/**
 * 防抖函数，用于操作结束执行一次
 * 主要用于限制事件处理程序响应太过频繁，如监听窗口滚动事件中一个轻微的滚动就会导致处理函数执行很多次，
 * 而我们有时希望做的事只需要其在滚动有所停顿时执行一次就行了，这时如果还是连续执行处理函数就会浪费性能，而要停顿多久才有效就是我们指定的延迟时间
 * @param fn    需要进行防抖处理的函数
 * @param delay 延迟毫秒数
 */
function debounce(fn, delay) {
  var timer = null;   //使用闭包记录定时器
  return function () {
    if (timer) clearTimeout(timer);  //若还未达到延迟时间就又要执行fn函数，则清除定时器重新计时(即不执行，重新计时判断)
    timer = setTimeout(fn.apply(null, arguments), delay);   //始终有delay时间的延迟，且只有达到该延迟了才会执行一次fn，因为没达到就在前面清除计时器而这一步又重新计时了
  }
}

/**
 * 节流函数，用于操作过程中间歇性执行几次
 * 主要用于间歇性响应事件处理程序，继续拿上面防抖函数中监听窗口滚动事件来举例，假设一个极端点的情况：用户用鼠标拖着窗口滚动条一直不放，
 * 这时有的效果可能就不能等到他停下来才去执行了，否则一直看不到效果，像这种类似情况就需要隔一定时间就执行一次处理函数，不至于太频繁，也不会明明有操作却又一直不执行没效果等情况
 * @param fn    需要进行节流处理的函数
 * @param delay 间隔毫秒数
 */
function throttle(fn, delay) {
  var active = true;   //状态位，表示处理函数fn的激活状态，激活则可执行，未激活则不执行，默认设为true用于最初要执行一次
  return function () {
    if (!active) return;  //若未激活处理函数则返回，不执行任何操作
    active = false;     //是激活状态则执行前设为失活，等待下次激活
    var args = arguments;
    //隔断时间执行处理函数，并重新激活
    setTimeout(function () {
      fn.apply(null, args);
      active = true;
    }, delay);
  }
  /*
   * 实现节流不止这一种方案，原理都一样，实现可以多样，如：
   * 1、将setTimeout定时器返回的标记当做active的值作为判断条件，判断当前定时器是否存在，存在则表示还在冷却等待执行fn，并在执行fn后清除定时器表示激活
   * 2、不使用setTimeout也行，把状态位换成时间戳，然后利用时间戳差值是否大于指定的间隔时间来做判断
   * */
}

/**
 * 计算元素到页面左上角的距离（即当前元素到body顶部和左侧的距离）
 * */
//计算元素左上角到body左上角的x横坐标
function getElementPointX(el) {
  var x = el.offsetLeft;
  if (el.offsetParent !== null) x += getElementPointX(el.offsetParent);
  return x;
}
//计算元素左上角到body左上角的y纵坐标
function getElementPointY(el) {
  var y = el.offsetTop;
  if (el.offsetParent !== null) y += getElementPointY(el.offsetParent);
  return y;
}

/**
 * 获取元素当前应用到的样式
 * @param el    要获取样式的元素
 * @param styleProp  可选，某个具体样式属性
 * @returns {*} 若不传入styleProp则返回包含所有样式的对象，否则只返回指定属性的样式值
 */
function getCurrentStyle(el,styleProp){
  if(window.getComputedStyle){
    return !name ? window.getComputedStyle(el,null) : window.getComputedStyle(el,null)[styleProp];
  }else{
    return !name ? el.currentStyle : el.currentStyle[styleProp];	//IE8-
  }
}

/**
 * 获取当前窗口可访问到的最高层级top窗口
 * 解决存在跨域iframe嵌套时内部窗口使用到 top 对象报错的问题
 * 精准改造方案：通过比较 location.origin（由于IE下同源策略不包含端口不同，所以可以直接比较源）
 * 
 */
// 标准
 function getTopWinStandard() {
  var _top = window;
  try {
    if (top.location) _top = top;
  } catch (error) {
    while (true) {
      try {
        if (_top.parent.location !== _top.location) _top = _top.parent;
      } catch (err) {
        break;
      }
    }
  } 
  return _top;
}
 // 兼容 IE 下同源策略不包含端口不同的情况(IE下location似乎不支持`origin`属性，否则可以直接`origin`属性，其包含了`protocol`和`host`)
 // 通过比较每个窗口和父窗口的location对象的`host`和`protocol`两个属性（不非常严格的话可以直接比较`host`）
function getTopWin() {
  var _top = window;
  try {
    if (top.location.host === self.location.host && top.location.protocol === self.location.protocol) {
      _top = top;
    } else {
      while (true) {
        if (_top.parent.location.host === _top.location.host && _top.parent.location.protocol === _top.location.protocol) {
          _top = _top.parent;
        } else {
          break;
        }
      }
    }
  } catch (error) {
    while (true) {
      try {
        if (_top.parent.location.host === _top.location.host && _top.parent.location.protocol === _top.location.protocol) _top = _top.parent;
      } catch (err) {
        break;
      }
    }
  }
  return _top;
}
// 向上查找指定窗口名的window（需对应窗口也设置了name属性），
function getTopWinByName(name) {
  var _top = window;
  try {
    if (top.name === name) {
      _top = top;
    } else {
      while (true) {
        if (_top.parent.location !== _top.location) {
          _top = _top.parent;
        } else {
          if (_top.name !== name) _top = null;
          break;
        }
        if (_top.name === name) break;
      }
    }
  } catch (error) {
    while (true) {
      try {
        if (_top.parent.location !== _top.location) _top = _top.parent;
        if (_top.name === name) break;
      } catch (err) {
        if (_top.name !== name) _top = null;
        break;
      }
    }
  }
  return _top;
}

/** ============检测设备是否为PC💻移动设备📱或Android或iOS🍎============ */
const isMobile = (function (){
  var userAgent = window.navigator.userAgent;
  if(userAgent.match(/Mobile/gi)){
    //可去掉移动设备判断，而直接进行下面的Android和iOS设备判断
    if (userAgent.match(/android/gi)){
      console.log('Android设备');
    }else if (userAgent.match(/iphone/gi)){
      console.log('iOS设备');
    }
    return true;
  }else{
    console.log('PC设备');
    return false;
  }
})();

/** ===============获取设备DPI(每英寸点的个数)================ */
function getDPI() {
  var arrDPI = [];
  if (window.screen.deviceXDPI) {
    arrDPI[0] = window.screen.deviceXDPI;
    arrDPI[1] = window.screen.deviceYDPI;
  } else {
    var tmpNode = document.createElement("div");
    tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
    document.body.appendChild(tmpNode);
    arrDPI[0] = parseInt(tmpNode.offsetWidth);
    arrDPI[1] = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
  }
  return arrDPI;
}