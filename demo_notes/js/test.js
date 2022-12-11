/**
 * Created by wanje on 2017/9/20.
 */
require(['jquery', 'mock'],function ($, Mock) {
    var obj = {
        xyzAxis: $('#zyx-axis'),
        ipt: $('#ipt'),
    };

    $(document).on('contextmenu',function (event) {
        // event.preventDefault();
        // alert('阻止了默认菜单弹出!');

    }).on('compositionstart','#ipt',function (event) {
        console.log('返回：'+event.originalEvent.data);

    }).on('touchstart',function (event) {
        obj.ipt.val('touchstart：'+event.originalEvent.targetTouches);

    }).on('touchmove',function (event) {
        obj.ipt.val('touchmove');

    }).on('touchend',function (event) {
        obj.ipt.val('touchend');

    }).on('touchcancel',function (event) {
        obj.ipt.val('touchcancel');

    });

    $(window).on('beforeunload',function (event) {
        // console.log(event.originalEvent.returnValue);
        // var msg = '确定要离开么?';
        // event.returnValue = msg;
        // return msg;

    }).on('orientationchange',function (event) {
        obj.ipt.val('屏幕旋转：'+window.orientation);

    }).on('deviceorientation',function (event) {
        var axis = obj.xyzAxis.find('li'),
            x = Math.round(event.originalEvent.beta),
            y = Math.round(event.originalEvent.gamma),
            z = Math.round(event.originalEvent.alpha);

        obj.xyzAxis.css('transform', 'rotate('+(z-90)+'deg)');
        axis.eq(0).text('X轴旋转：'+x);
        axis.eq(1).text('Y轴旋转：'+y);
        axis.eq(2).text('Z轴旋转：'+z);

    }).on('devicemotion',function (event) {
        // obj.ipt.val('加速度：'+Math.round(event.originalEvent.acceleration.x));
        // obj.ipt.val('加速度：'+Math.round(event.originalEvent.accelerationIncludingGravity.x));
        // obj.ipt.val('方向：('+Math.round(event.originalEvent.rotationRate.beta)+','+Math.round(event.originalEvent.rotationRate.gamma)+','+Math.round(event.originalEvent.rotationRate.alpha)+')');

    });

    /*原生方法给一个集合循环添加事件，并保证事件处理函数中的索引都正确(非闭包方法)*/
    var btnArr = document.getElementById('btn-list').getElementsByTagName('button');
    for(var i=0;i<5;i++){
        btnArr[i].index = i;    /*给每个对象定义一个index属性保存期索引*/
        btnArr[i].onclick = function () {
            var index = this.index;
            console.log('当前索引：'+index);
        };
    }

    /*使用对象的toString方法可以检测出数组、函数、正则等具体数据类型，IE6/7/8中Object.prototype.toString.apply(null或undefined);返回”[object Object]”，所以在判断是否是null或undefined时可直接将数据与他们进行比较*/
    function testDataType(value) {
        var _toString = {}.toString,
            type = _toString.call(value).split(' ')[1].split(']')[0].toLowerCase();
        return type;
    }
    // console.log([[],{},/ab/,'a',7,undefined,null,true,function(){},new Date()].map(testDataType));

    //数组去重
    function removeArrRepeat(arr) {
        var result = [], hash = {};
        for (var i = 0; i<arr.length; i++) {
            if (!hash[arr[i]]) {
                result.push(arr[i]);
                hash[arr[i]] = true;
            }
        }
        return result;
    }
    // console.log(removeArrRepeat([1,2,3,4,2,1]));

    /*字符串倒序*/
    String.prototype.reverse=function(){
        var args=this.split('');
        var result=[];
        var n=args.length;
        for(var i=n-1;i>=0;i--){
            result.push(args[i]);
        }
        return result.join('');
    };
    // console.log("abcdefg".reverse());

    $('.radius-mark').on('click','li',function () {
        $(this).addClass('checked').siblings().removeClass('checked');
    });

    //postMessage跨域通信
    var parentWin = window.parent;

    $('#btn-send').on('click',function () {
        var msg = '消息' + Math.random()*10000;

        $('#input-box').html(msg);
        parentWin.postMessage(msg,'http://172.22.11.199:8080');
    });

    $(window).on('message',function (event) {
        event = event.originalEvent;

        $('#reply-box').html(event.data);
    });



    /** 绘制场馆*/
    !function () {
        var $canvas = $('#myCanvas');
        var canvas = $canvas[0];
        var ctx = canvas.getContext('2d');

        canvas.width = $canvas.parent().width();
        canvas.height = $canvas.parent().height();

        var option = {
            gridStartX: 0,
            gridStartY: 0,
            scaleDif: 2,    //缩放差值(非倍数)
            gridLineColor: '#fff',
            gridLineWidth: 2,
            gridCellSize: 20,
            rectFillColor: '#f00'
        };
        var checkedArr = [];

        ctx.strokeStyle = option.gridLineColor;
        ctx.lineWidth = option.gridLineWidth;
        ctx.fillStyle = option.rectFillColor;

        //绘制线段
        function drawLine(x1,y1,x2,y2){
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
        }

        //绘制单元格填充矩形，参数clear传入数字代表清除对应单元格
        function drawRect(x,y,index){
            var cell = {
                x: x,
                y: y,
                size: option.gridCellSize-option.gridLineWidth
            };

            ctx.beginPath();
            if(typeof index === 'number'){
                ctx.clearRect(x,y,cell.size,cell.size);
                checkedArr.splice(index,1);

            }else {
                checkedArr.push(cell);
                ctx.fillRect(x,y,cell.size,cell.size);
            }
        }

        //绘制网格线
        function drawGrid(x,y,gridCellSize) {
            ctx.clearRect(0,0,canvas.width,canvas.height);

            for(var i=x;i<canvas.width;i+=gridCellSize){
                drawLine(i,0,i,canvas.height);
            }

            for(var j=y;j<canvas.height;j+=gridCellSize){
                drawLine(0,j,canvas.width,j);
            }
        }
        drawGrid(option.gridCellSize, option.gridCellSize, option.gridCellSize);

        //滚动放缩
        $canvas.on('mousewheel DOMMouseScroll',function (e) {
            e.stopPropagation();
            e.preventDefault();

            var originalEvent = e.originalEvent;
            var offsetX = originalEvent.clientX - Math.round(canvas.getBoundingClientRect().left);
            var offsetY = originalEvent.clientY - Math.round(canvas.getBoundingClientRect().top);
            var dir = originalEvent.wheelDelta || -originalEvent.detail;

            dir>0 ? option.gridCellSize+=option.scaleDif : option.gridCellSize-=option.scaleDif;    //不用 *= 的原因是size不够大时乘以小数取整后可能一直是一个数，而不出现变化
            option.gridCellSize = (option.gridCellSize>10 ? option.gridCellSize : 10);  //单元格为最小缩放到10
            var cellOffsetX = (offsetX-option.gridStartX) % option.gridCellSize + option.scaleDif/2*Math.pow(-1,dir);
            var cellOffsetY = (offsetY-option.gridStartY) % option.gridCellSize + option.scaleDif/2*Math.pow(-1,dir);
            option.gridStartX = (offsetX-cellOffsetX) % option.gridCellSize;
            option.gridStartY = (offsetY-cellOffsetY) % option.gridCellSize;
            drawGrid(option.gridStartX, option.gridStartY, option.gridCellSize);

            // for(var i=0;i<checkedArr.length;i++){
            //     ctx.beginPath();
            //     ctx.rect(checkedArr[i].x, checkedArr[i].y, checkedArr[i].size, checkedArr[i].size);
            // }

        });

        //点击单元格
        $canvas.on('click',function (e) {
            e.stopPropagation();

            var decX = (e.offsetX-option.gridStartX-option.gridLineWidth/2) % option.gridCellSize;
            var decY = (e.offsetY-option.gridStartY-option.gridLineWidth/2) % option.gridCellSize;

            for(var i=0;i<checkedArr.length;i++){
                ctx.beginPath();
                ctx.rect(checkedArr[i].x, checkedArr[i].y, checkedArr[i].size, checkedArr[i].size);

                if(ctx.isPointInPath(e.offsetX, e.offsetY)){
                    drawRect(e.offsetX-decX, e.offsetY-decY, i);
                    return;
                }

            }

            drawRect(e.offsetX-decX, e.offsetY-decY);

        });



    }();

    /*================================================== mock.js测试 ==================================================*/
    Mock.mock('user/getInfo','get',{
        'list|1-10': [{
            'id|+1': 1
        }]
    });

    $.get('user/getInfo',function (data) {
        console.log(JSON.parse(data));
    });

});