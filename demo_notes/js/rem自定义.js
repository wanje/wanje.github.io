/**
 * 根据设计稿设置options的宽，可使得设计稿尺寸下保持 1rem=100px，方便计算，而不使用scss之类的预编译器
 * 也可在html元素上手动设置宽度'data-width'和设配像素比'data-dpr'，将优先以该设置计算
 * 使用时需先手动设置meta：<meta name="viewport" content="initial-scale=0.5,user-scalable=no">，因为下面的代码中没有检测未设置viewport时自动创建，可优化改进
 * */
;!function(win, remLib) {
    'use strict';
    var options = { width: 750, dpr: 2 };
    var doc = win.document;
    var html = doc.documentElement,
        width = html.getAttribute('data-width') || options.width,
        dpr = html.getAttribute('data-dpr') || options.dpr,
        viewPort = doc.querySelector('meta[name="viewport"]'),
        rotate = win.onorientationchange ? 'orientationchange' : 'resize';

    win.addEventListener('load',function () {
        doc.getElementById('ad').innerText = win.devicePixelRatio;
    },false);

    var devicePixelRatio = win.devicePixelRatio;
    if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
    } else {
        dpr = 1;
    }

    remLib.dpr = dpr;

    var scale = 1 / dpr;

    var viewPortCont = "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no";

    if (!viewPort){
        viewPort = doc.createElement("meta");
        viewPort.setAttribute("name", "viewport");
        viewPort.setAttribute("content", viewPortCont);
        html.firstElementChild.appendChild(viewPort);
    }else {
        viewPort.setAttribute('content', viewPortCont);
    }

    function setSize() {
        var winWidth = html.getBoundingClientRect().width,
            rootFontSize = 100 * winWidth / width;
        html.style.fontSize = rootFontSize + 'px';
        remLib.rootFontSize = rootFontSize;

        if (doc.readyState === "complete") {
            doc.body.style.fontSize = "0.24rem";
        } else {
            doc.addEventListener("DOMContentLoaded", function() {
                doc.body.style.fontSize = "0.24rem";
            }, false);
        }
    }
    setSize();

    remLib.px2rem = function (px) {
        return parseFloat((px / this.rootFontSize).toFixed(7));
    };
    remLib.rem2px = function (rem){
        return this.rootFontSize * rem;
    };
    remLib.pxChange = function (px){
        return this.dpr * px;
    };

    win.addEventListener(rotate, function () {
        setTimeout(setSize,300);
    });

}(window,  window.remLib || (window.remLib = {}));
