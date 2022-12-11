/**
 * Created by wanje on 2019/1/6.
 */

let EventUtil = {
    /**===绑定事件处理器===
     * 三个参数：绑定对象元素ele、事件类型type、处理函数handler
     * */
    addHandler: function (ele, type, handler) {
        if(ele.addEventListener){
            /*现代浏览器*/
            ele.addEventListener(type, handler, false);
        }else if(ele.attachEvent){
            /*IE*/
            ele.attachEvent('on'+type, handler);
        }else {
            /*以上都无效则默认DOM0级*/
            ele['on'+type] = handler;
        }
    },
    /**===移除事件处理器===
     * 三个参数：移除对象元素ele、事件类型type、处理函数handler
     * */
    removeHandler: function (ele, type, handler) {
        if(ele.removeEventListener){
            /*现代浏览器*/
            ele.removeEventListener(type, handler, false);
        }else if(ele.detachEvent){
            /*IE*/
            ele.detachEvent('on'+type, handler);
        }else {
            /*以上都无效则默认DOM0级*/
            ele['on'+type] = null;
        }
    },
    /**===获取事件event对象===*/
    getEvent: function (event) {   //在要用到event对象时，一般都先调用此方法再将返回的event对象传递给其他方法
        return event ? event : window.event;   //window.event是针对IE8
    },
    /**===阻止默认事件===*/
    preventDefault: function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else {
            event.returnValue = false;  //IE8，效果同 return false;
        }
    },
    /**===阻止事件冒泡===*/
    stopPropagation: function (event) {
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    },
    /**===获取事件源===*/
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    /**===获取相关事件源===*/
    getRelatedTarget: function (event) {
        if (event.relatedTarget){
            return event.relatedTarget;     //IE8不支持relatedTarget属性，但支持以下保存同样信息的自有属性
        }else if (event.toElement){
            return event.toElement;
        }else if (event.fromElement){
            return event.fromElement;
        }else {
            return null;
        }
    },
    /**===获取鼠标点击按钮===*/
    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")){  //如果支持DOM版鼠标事件
            return event.button;     //返回DOM规范中鼠标点击的键值，0为主键(左)、1为中键(滚轮)、2为次键(右)
        }else {
            switch (event.button){   //针对IE8，将IE8下的键值规范化为DOM方式
                case 0:
                case 1:
                case 3:
                case 5:
                case 7: return 0;
                case 2:
                case 6: return 2;
                case 4: return 1;
            }
        }
    },
    /**===获取鼠标滚轮滚动方向===*/
    getWheelDelta: function (event) {
        if (event.wheelDelta){
            return event.wheelDelta;    //mousewheel
        }else {
            return -event.detail * 40;  //Firefox的DOMMouseScroll
        }
    },
    /**===获取键盘按键字符(ASCII)编码===*/
    getCharCode: function (event) {     //而后通过 String.fromCharCode() 方法就可得到实际的字符
        if (typeof event.charCode === 'number'){
            return event.charCode;
        }else {
            return event.keyCode;  //IE8
        }
    }
};