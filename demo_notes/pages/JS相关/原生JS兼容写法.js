/**
 * Created by wanje on 2017/8/11.
 */

/*=============================================== requestAnimationFrame ===============================================*/
/** requestAnimationFrame的兼容处理 */
(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz', 'ms', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||        //webkit内核中取消方法名字变了
        window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());

var rafId = requestAnimationFrame(callback);
/*动画执行调用语法，且callback函数内部也要递归递归调用自己*/
cancelAnimationFrame(rafId);
/*动画取消调用语法*/

/**
 * 获取元素当前应用到的样式
 * @param el    要获取样式的元素
 * @param styleProp  可选，某个具体样式属性
 * @returns {*} 若不传入styleProp则返回包含所有样式的对象，否则只返回指定属性的样式值
 */
function getCurrentStyle(el, styleProp) {
  if (window.getComputedStyle) {
    return !name ? window.getComputedStyle(el, null) : window.getComputedStyle(el, null)[styleProp];
  } else {
    return !name ? el.currentStyle : el.currentStyle[styleProp];	//IE8-
  }
}