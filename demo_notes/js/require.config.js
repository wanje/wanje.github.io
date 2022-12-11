/**
 * 此文件用来定义requirejs模块与路径
 * 并自动加载data-main模块
 * 注意文件的路径与根路径配置项“baseUrl”有关
 * 对于异步加载的js要在Chrome中设置断点调试，需要在对应js文件或内嵌的script代码的头部或者尾部加上“//# sourceURL=xxx.js”，xxx为js文件名
 */
;!function (require) {

    // 获取require.config.js上的data-main及其所在的目录url
    var scripts = document.getElementsByTagName('script');
    var dataMain = '';
    for (var i = scripts.length-1; i > -1; i--) {
        dataMain = scripts[i].getAttribute('data-main');
        if(!dataMain) continue;
        var urlArr = scripts[i].src.split("/");
        urlArr.pop();
        require.path = urlArr.length ? urlArr.join("/") + '/' : './';   //存储配置文件所在路径
        break;
    }

    require.config({
        /*缓存模式，上线后请注释移除*/
        // urlArgs: "debug=" + (new Date()).getTime(),
        /*根路径配置，即所有文件查找的起始参考位置，包括data-main属性*/
        baseUrl: require.path,      /*此处将require.config.js所在文件夹设为根路径(未以require所在文件夹为准)，也可自行手动设置*/
        /*文件路径配置*/
        paths: {
            'jquery': 'jquery-1.11.3.min',
            'dialog': '../plugins/artDialog/dialog-plus-6.0.5',
            'mock': '../plugins/mock-min',
            'tree': 'Tree'
        },
        /*非AMD规范的文件shim配置*/
        shim: {
            'dialog': {      /*名字对应上面路径配置中的简写名字*/
                deps: ['jquery'],       /*依赖的库，可多个库*/
                exports: 'dialog'       /*导出的值，即外部调用时的名称*/
            }
        }
    });

    /*自动加载data-main中的js文件*/
    if (dataMain) {
        require([dataMain]);
    }

    /*将上面自动加载data-main中的js文件的方式改为下面这样，可以在data-main中使用','分隔多个文件路径来加载多个js文件，
    * 例如：data-main="app/project/dev,app/project/test"，可同时加载dev.js和test.js两个文件
    * */
    // if (dataMain) {
    //     var urls = dataMain.split(",");
    //     for(i=0;i<urls.length;i++){
    //         require([urls[i]])
    //     }
    // }

}(requirejs);